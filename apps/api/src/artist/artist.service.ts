// NPM Modules
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Custom Modules
import Artist from '@/database/artist.entity';
import GenreService from '@/genre/genre.service';
import MusicBrainzService from '@/musicbrainz/musicbrainz.service';
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
    private readonly artistRepository: Repository<Artist>,
    private readonly genreService: GenreService,
    private readonly musicBrainzService: MusicBrainzService
  ) {}

  /**
   * Persists a new Artist and returns the created row. The location and genres
   * are derived server-side: MusicBrainz is queried by name for the artist's
   * origin and tags, and those tags are cross-referenced against our genre
   * vocabulary before the row is created.
   */
  async createOne(data: ArtistCreateDTO): Promise<Artist> {
    const { location, tags } = await this.musicBrainzService.searchArtistMetadata(data.name);
    const genres = await this.genreService.filterKnown(tags);

    const artist = this.artistRepository.create({ ...data, genres, location });

    return this.artistRepository.save(artist);
  }

  /**
   * Returns every Artist, ordered alphabetically by name.
   */
  readAll(): Promise<Artist[]> {
    return this.artistRepository.find({ order: { name: 'ASC' } });
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
