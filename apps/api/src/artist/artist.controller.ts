// NPM Modules
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';

// Custom Modules
import ArtistService from './artist.service';
import ArtistCreateDTO from './dto/create.dto';
import ArtistUpdateDTO from './dto/update.dto';

// route: /artist
@Controller('artist')
export default class ArtistController {
  constructor(private artistService: ArtistService) {}

  /**
   * Creates a single Artist.
   */
  // route: /artist
  @Post()
  artistCreate(@Body() data: ArtistCreateDTO) {
    return this.artistService.createOne(data);
  }

  /**
   * Returns every Artist.
   */
  // route: /artist
  @Get()
  artistReadAll() {
    return this.artistService.readAll();
  }

  /**
   * Returns a single Artist by id. Returns 404 if the id doesn't exist.
   */
  // route: /artist/:artistID
  @Get(':artistID')
  artistReadOne(@Param('artistID', ParseUUIDPipe) artistID: string) {
    return this.artistService.readOne(artistID);
  }

  /**
   * Applies a partial update to the Artist identified by `artistID`. Returns 404
   * if the id doesn't exist.
   */
  // route: /artist/:artistID
  @Patch(':artistID')
  artistUpdateOne(@Param('artistID', ParseUUIDPipe) artistID: string, @Body() data: ArtistUpdateDTO) {
    return this.artistService.updateOne(artistID, data);
  }

  /**
   * Deletes the Artist identified by `artistID`. Returns 404 if the id doesn't exist.
   */
  // route: /artist/:artistID
  @Delete(':artistID')
  artistDeleteOne(@Param('artistID', ParseUUIDPipe) artistID: string) {
    return this.artistService.deleteOne(artistID);
  }
}
