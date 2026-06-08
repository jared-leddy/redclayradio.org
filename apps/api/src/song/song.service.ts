// NPM Modules
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Shared Modules
import type { SpotifyTrack } from '@redclayradio/utils/interfaces';

// Custom Modules
import Artist from '@/database/artist.entity';
import Song from '@/database/song.entity';
import LineupService from '@/lineup/lineup.service';
import LoggerService from '@/logger/logger.service';
import SpotifyService from '@/spotify/spotify.service';

/**
 * Time zone the broadcast day is anchored to, matching the lineup. The song is
 * chosen on this zone's midnight and "today" is resolved against it.
 */
const STATION_TIMEZONE = 'America/New_York';

/**
 * How many random artists to try before giving up on picking a song, so a single
 * artist Spotify can't return a track for (no catalog, market restrictions, a
 * transient error) doesn't leave the day without a song.
 */
const SONG_PICK_ATTEMPTS = 3;

/**
 * Owns the song of the day: picks one at local midnight from a random artist in
 * the day's lineup, freezes it for the day, and serves the current pick. The
 * schedule is the only writer; reads are a plain lookup with no upstream calls,
 * so they never wait on Spotify.
 */
@Injectable()
export default class SongService implements OnModuleInit {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    private readonly lineupService: LineupService,
    private readonly spotifyService: SpotifyService,
    private readonly logger: LoggerService
  ) {}

  /**
   * Picks the current broadcast day's song on boot if one hasn't been chosen yet,
   * so the home page has a song to show without waiting for midnight. The
   * scheduled pick takes over from there.
   */
  async onModuleInit(): Promise<void> {
    const date = this.today();

    const existing = await this.songRepository.findOneBy({ date });

    if (!existing) {
      await this.capture();
    }
  }

  /**
   * Picks the song of the day: a random track by a random artist from the day's
   * lineup, frozen onto the day's Song row. Runs at local midnight and replaces
   * any song already stored for the day.
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: 'song-capture', timeZone: STATION_TIMEZONE })
  async capture(): Promise<Song | null> {
    const date = this.today();

    const { onDeck, stages } = await this.lineupService.getCurrent();
    const pool = [stages.main, stages.side, ...onDeck].filter((artist): artist is Artist => artist !== null);

    if (pool.length === 0) {
      this.logger.warn(`No lineup artists to pick a song from for ${date}.`, 'Song');
      return null;
    }

    const picked = await this.pickTrack(pool);

    if (!picked) {
      this.logger.warn(`Could not resolve a song from Spotify for ${date}.`, 'Song');
      return null;
    }

    const { artist, track } = picked;
    const existing = await this.songRepository.findOneBy({ date });
    const song = this.songRepository.create({
      ...existing,
      album: track.album,
      artistID: artist.id,
      artistName: artist.name,
      date,
      playerURL: track.playerURL,
      title: track.title,
      year: track.year
    });

    this.logger.log(`Captured "${track.title}" by ${artist.name} for ${date}.`, 'Song');

    return this.songRepository.save(song);
  }

  /**
   * Tries to resolve a random track from up to {@link SONG_PICK_ATTEMPTS} random
   * artists in the pool, moving on whenever Spotify can't return a track for a
   * pick. Returns null if none of the attempts succeed. Tolerating these failures
   * here is deliberate: this runs from `onModuleInit` and the schedule, outside
   * the HTTP pipeline, so a thrown error would crash the process rather than be
   * shaped by a filter.
   */
  private async pickTrack(pool: Artist[]): Promise<{ artist: Artist; track: SpotifyTrack } | null> {
    const attempts = Math.min(SONG_PICK_ATTEMPTS, pool.length);

    for (let attempt = 0; attempt < attempts; attempt++) {
      const artist = pool[Math.floor(Math.random() * pool.length)];

      try {
        const track = await this.spotifyService.getRandomTrack(artist.spotifyID);
        return { artist, track };
      } catch (error) {
        const message = error instanceof Error ? error.message : 'unknown error';
        this.logger.warn(`Spotify track lookup failed for ${artist.name}: ${message}.`, 'Song');
      }
    }

    return null;
  }

  /**
   * Returns the current broadcast day's featured song, or null if one has not
   * been picked yet.
   */
  getCurrent(): Promise<Song | null> {
    return this.songRepository.findOneBy({ date: this.today() });
  }

  /**
   * The current Eastern-time calendar day as an ISO date string (YYYY-MM-DD).
   */
  private today(): string {
    return new Intl.DateTimeFormat('en-CA', { timeZone: STATION_TIMEZONE }).format(new Date());
  }
}
