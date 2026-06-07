// NPM Modules
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';

/**
 * A Genre is a single musical genre tag drawn from a fixed, curated vocabulary.
 * This table is static reference data: rows are seeded once and read from when
 * tagging or filtering artists. It is never written to at runtime.
 */
@Entity()
export default class Genre {
  /**
   * Primary key. Generated as a UUID.
   */
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  /**
   * Genre name (e.g., "alternative metal"). Unique across the table.
   */
  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  name: string;
}
