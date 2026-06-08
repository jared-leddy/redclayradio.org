// NPM Modules
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import 'reflect-metadata';

/**
 * A Lineup is the station's running order for a single broadcast day. At local
 * midnight the eligible artist pool is reshuffled and the first fifty are
 * captured here as an ordered list of artist ids; each hour the first two are
 * dropped so the acts on the two stages rotate off and the on-deck list shifts
 * down. Exactly one Lineup exists per calendar day.
 */
@Entity()
export default class Lineup {
  /**
   * Primary key. Generated as a UUID.
   */
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  /**
   * The Eastern-time calendar day this running order belongs to (e.g.,
   * "2026-06-08"). Unique: one Lineup per broadcast day.
   */
  @Column({ type: 'date', unique: true })
  @IsString()
  @IsNotEmpty()
  date: string;

  /**
   * Ordered artist ids still in rotation for the day, first to last. Captured at
   * fifty when the day's Lineup is created and shortened by two every hour as
   * acts rotate off. The first two ids are on the stages (main, side); the rest
   * are on deck.
   */
  @Column({ type: 'jsonb', default: [] })
  @IsArray()
  @IsString({ each: true })
  artistIDs: string[];

  /**
   * Timestamp when the Lineup row was created.
   */
  @CreateDateColumn()
  createdOn: Date;

  /**
   * Timestamp when the Lineup row was last updated (i.e., the last hourly drop).
   */
  @UpdateDateColumn()
  updatedOn: Date;
}
