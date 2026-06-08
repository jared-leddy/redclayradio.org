// NPM Modules
import { BadRequestException, Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';

// Custom Modules
import SpotifyService from './spotify.service';

// route: /spotify
@Controller('spotify')
export default class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  /**
   * Searches Spotify for artists by name. Returns normalized results the client
   * can present and prefill the create form from.
   */
  // route: /spotify/search?q=deftones&limit=10
  @Get('search')
  spotifySearch(@Query('q') query: string, @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number) {
    if (!query || !query.trim()) {
      throw new BadRequestException('Query parameter "q" is required.');
    }

    return this.spotifyService.searchArtists(query.trim(), limit);
  }
}
