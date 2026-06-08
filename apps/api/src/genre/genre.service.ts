// NPM Modules
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

// Custom Modules
import Genre from '@/database/genre.entity';

/**
 * Data-access layer for the Genre entity. Wraps the TypeORM repository over the
 * static genre lookup table, which is read-only at runtime.
 */
@Injectable()
export default class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>
  ) {}

  /**
   * Returns every Genre, ordered alphabetically by name.
   */
  readAll(): Promise<Genre[]> {
    return this.genreRepository.find({ order: { name: 'ASC' } });
  }

  /**
   * Cross-references arbitrary tag names against the genre vocabulary and returns
   * the subset that are known genres, de-duplicated and in the order given.
   */
  async filterKnown(names: string[]): Promise<string[]> {
    if (!names.length) {
      return [];
    }

    const matches = await this.genreRepository.find({ where: { name: In(names) } });
    const known = new Set(matches.map((genre) => genre.name));

    return [...new Set(names)].filter((name) => known.has(name));
  }
}
