// NPM Modules
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Custom Modules
import Artist from '@/database/artist.entity';
import ArtistCreateDTO from './dto/create.dto';
import ArtistUpdateDTO from './dto/update.dto';

/**
 * Data-access layer for the Artist entity. Wraps the TypeORM repository and
 * translates "not found" lookups into 404s for the controller.
 */
@Injectable()
export default class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>
  ) {}

  /**
   * Persists a new Artist and returns the created row.
   */
  createOne(data: ArtistCreateDTO): Promise<Artist> {
    const artist = this.artistRepository.create(data);

    return this.artistRepository.save(artist);
  }

  /**
   * Returns every Artist, newest first.
   */
  readAll(): Promise<Artist[]> {
    return this.artistRepository.find({ order: { createdOn: 'DESC' } });
  }

  /**
   * Returns a single Artist by id, or throws 404 if none exists.
   */
  async readOne(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException(`Artist ${id} not found.`);
    }

    return artist;
  }

  /**
   * Applies a partial update to an Artist and returns the updated row, or throws
   * 404 if none exists.
   */
  async updateOne(id: string, data: ArtistUpdateDTO): Promise<Artist> {
    const artist = await this.readOne(id);

    Object.assign(artist, data);

    return this.artistRepository.save(artist);
  }

  /**
   * Deletes an Artist by id and returns the deleted row, or throws 404 if none
   * exists.
   */
  async deleteOne(id: string): Promise<Artist> {
    const artist = await this.readOne(id);

    return this.artistRepository.remove(artist);
  }
}
