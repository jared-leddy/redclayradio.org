// NPM Modules
import { Controller, Get } from '@nestjs/common';

// Custom Modules
import GenreService from './genre.service';

// route: /genre
@Controller('genre')
export default class GenreController {
  constructor(private genreService: GenreService) {}

  /**
   * Returns every Genre.
   */
  // route: /genre
  @Get()
  genreReadAll() {
    return this.genreService.readAll();
  }
}
