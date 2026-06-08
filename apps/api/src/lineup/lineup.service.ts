// NPM Modules
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

// Shared Modules
import { ArtistStatus } from '@redclayradio/utils/enums';

// Custom Modules
import Artist from '@/database/artist.entity';
import Lineup from '@/database/lineup.entity';
import LoggerService from '@/logger/logger.service';

/**
 * Time zone the broadcast day is anchored to. The daily reshuffle and the hourly
 * drops fire on this zone's clock, and "today" is resolved against it, so the
 * running order turns over at local midnight regardless of where the server runs.
 */
const STATION_TIMEZONE = 'America/New_York';

/**
 * Number of artists captured into a day's running order at reshuffle.
 */
const DAILY_CAPACITY = 50;

/**
 * Number of artists on the stages — and therefore the number dropped each hour
 * as they rotate off.
 */
const STAGE_COUNT = 2;

/**
 * Owns the daily running order: captures it at local midnight, advances it every
 * hour, and resolves the current state for the public home page. The schedule is
 * the only writer; reads resolve the stored artist ids to Artist records.
 */
@Injectable()
export default class LineupService implements OnModuleInit {
  constructor(
    @InjectRepository(Lineup)
    private readonly lineupRepository: Repository<Lineup>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    private readonly logger: LoggerService
  ) {}

  /**
   * Guarantees the current broadcast day has a running order on boot, capturing
   * one if the day began (or the table was empty) while the service was down.
   * The scheduled reshuffle takes over from there.
   */
  async onModuleInit(): Promise<void> {
    const date = this.today();

    const existing = await this.lineupRepository.findOneBy({ date });

    if (!existing) {
      await this.capture();
    }
  }

  /**
   * Reshuffles the eligible artist pool and captures the first {@link DAILY_CAPACITY}
   * as the running order for the current broadcast day. Runs at local midnight
   * and replaces any order already stored for the day.
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: 'lineup-capture', timeZone: STATION_TIMEZONE })
  async capture(): Promise<Lineup> {
    const date = this.today();

    const eligible = await this.artistRepository.findBy({
      isActive: true,
      status: ArtistStatus.Approved
    });

    const artistIDs = this.shuffle(eligible)
      .slice(0, DAILY_CAPACITY)
      .map((artist) => artist.id);

    const existing = await this.lineupRepository.findOneBy({ date });
    const lineup = this.lineupRepository.create({ ...existing, artistIDs, date });

    this.logger.log(`Captured ${artistIDs.length} artists for ${date}.`, 'Lineup');

    return this.lineupRepository.save(lineup);
  }

  /**
   * Drops the two acts on the stages from the front of the day's running order so
   * the next two rotate on and the on-deck list shifts down. Runs at the top of
   * every hour except midnight, which the daily reshuffle already owns.
   */
  @Cron('0 1-23 * * *', { name: 'lineup-drop', timeZone: STATION_TIMEZONE })
  async drop(): Promise<void> {
    const date = this.today();

    const lineup = await this.lineupRepository.findOneBy({ date });

    if (!lineup || lineup.artistIDs.length === 0) {
      return;
    }

    lineup.artistIDs = lineup.artistIDs.slice(STAGE_COUNT);

    await this.lineupRepository.save(lineup);

    this.logger.log(`Dropped ${STAGE_COUNT}; ${lineup.artistIDs.length} remain for ${date}.`, 'Lineup');
  }

  /**
   * Returns the current broadcast day's running order resolved for display: the
   * two acts on the stages and everyone still on deck, in order. Captures the
   * day's order on the fly if none exists yet. Mirrors the shared `Lineup`
   * interface; the entity's `Date` fields serialize to the strings it expects.
   */
  async getCurrent(): Promise<{
    date: string;
    stages: { main: Artist | null; side: Artist | null };
    onDeck: Artist[];
  }> {
    const date = this.today();

    const lineup = (await this.lineupRepository.findOneBy({ date })) ?? (await this.capture());
    const artists = await this.resolve(lineup.artistIDs);

    return {
      date,
      onDeck: artists.slice(STAGE_COUNT),
      stages: {
        main: artists[0] ?? null,
        side: artists[1] ?? null
      }
    };
  }

  /**
   * Resolves an ordered list of artist ids to their Artist records, preserving
   * the order of the ids and dropping any that no longer exist.
   */
  private async resolve(artistIDs: string[]): Promise<Artist[]> {
    if (artistIDs.length === 0) {
      return [];
    }

    const artists = await this.artistRepository.findBy({ id: In(artistIDs) });
    const byID = new Map(artists.map((artist) => [artist.id, artist]));

    return artistIDs.map((id) => byID.get(id)).filter((artist): artist is Artist => artist !== undefined);
  }

  /**
   * Returns a new array with the given items in random order (Fisher–Yates).
   */
  private shuffle<T>(items: T[]): T[] {
    const shuffled = [...items];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  /**
   * The current Eastern-time calendar day as an ISO date string (YYYY-MM-DD).
   */
  private today(): string {
    return new Intl.DateTimeFormat('en-CA', { timeZone: STATION_TIMEZONE }).format(new Date());
  }
}
