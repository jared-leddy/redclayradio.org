// NPM Modules
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
}
