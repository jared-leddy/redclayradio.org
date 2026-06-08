// NPM Modules
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import 'reflect-metadata';

/**
 * A Song is the station's featured "song of the day" for a single broadcast day.
 * At local midnight a random track by a random artist from that day's lineup is
 * chosen and frozen here, so the home page shows one stable song regardless of
 * the hourly stage rotation. Exactly one Song exists per calendar day.
 */
@Entity()
export default class Song {
  /**
   * Primary key. Generated as a UUID.
   */
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  /**
   * The Eastern-time calendar day this song is featured on (e.g., "2026-06-08").
   * Unique: one Song per broadcast day.
   */
  @Column({ type: 'date', unique: true })
  @IsString()
  @IsNotEmpty()
  date: string;

  /**
   * Track title (e.g., "Under A Killing Moon").
   */
  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * Display name of the artist the track belongs to, denormalized from the source
   * Artist for rendering.
   */
  @Column()
  @IsString()
  @IsNotEmpty()
  artistName: string;

  /**
   * Id of the lineup Artist the track was drawn from.
   */
  @Column({ type: 'uuid' })
  @IsString()
  @IsNotEmpty()
  artistID: string;

  /**
   * Album the track appears on (e.g., "The Artist in the Ambulance"). Optional.
   */
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  album?: string;

  /**
   * Album release year (e.g., "2003"). Optional.
   */
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  year?: string;

  /**
   * Embeddable Spotify track player URL (track iframe embed).
   */
  @Column()
  @IsString()
  @IsNotEmpty()
  playerURL: string;

  /**
   * Timestamp when the Song row was created.
   */
  @CreateDateColumn()
  createdOn: Date;

  /**
   * Timestamp when the Song row was last updated.
   */
  @UpdateDateColumn()
  updatedOn: Date;
}
