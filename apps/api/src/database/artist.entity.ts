// NPM Modules
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import 'reflect-metadata';

// Shared Modules
import { ArtistStatus } from '@redclayradio/utils/enums';

/**
 * An Artist is a musical act featured on the station. Each row is the
 * source-of-truth record for a single artist, including the Spotify-derived
 * metadata used to render the player and the moderation status that controls
 * whether the artist is shown publicly.
 */
@Entity()
export default class Artist {
  /**
   * Primary key. Generated as a UUID.
   */
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  /**
   * Artist display name (e.g., "Blink 182").
   */
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Genre tags associated with the artist (e.g., ["Alternative Metal", "Nu Metal"]).
   */
  @Column({ type: 'jsonb', default: [] })
  @IsArray()
  @IsString({ each: true })
  genres: string[];

  /**
   * Embeddable player URL (e.g., a Spotify artist embed URL).
   */
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  playerURL?: string;

  /**
   * Free-text origin of the artist (e.g., "Charlotte, NC, USA"). Optional.
   */
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  location?: string;

  /**
   * Spotify artist ID the artist was sourced from. Required and unique: it is the
   * key that prevents the same artist being added to the roster twice.
   */
  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  spotifyID: string;

  /**
   * Moderation status controlling public visibility. Defaults to `Pending`.
   */
  @Column({ type: 'enum', enum: ArtistStatus, default: ArtistStatus.Pending })
  @IsEnum(ArtistStatus)
  status: ArtistStatus;

  /**
   * Soft on/off switch independent of moderation status. Defaults to `true`.
   */
  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  /**
   * Timestamp when the Artist row was created.
   */
  @CreateDateColumn()
  createdOn: Date;

  /**
   * Timestamp when the Artist row was last updated.
   */
  @UpdateDateColumn()
  updatedOn: Date;
}
