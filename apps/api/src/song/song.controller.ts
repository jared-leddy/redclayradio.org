// NPM Modules
import { Controller, Get } from '@nestjs/common';

// Custom Modules
import SongService from './song.service';

// route: /song
@Controller('song')
export default class SongController {
  constructor(private songService: SongService) {}

  /**
   * Returns the current broadcast day's featured song, or null if one has not
   * been picked yet.
   */
  // route: /song
  @Get()
  songReadCurrent() {
    return this.songService.getCurrent();
  }
}
