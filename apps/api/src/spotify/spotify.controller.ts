// NPM Modules
import {
  BadRequestException,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query
} from '@nestjs/common';

// Custom Modules
import ArtistService from '@/artist/artist.service';
import SpotifyService from './spotify.service';

// route: /spotify
@Controller('spotify')
export default class SpotifyController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly spotifyService: SpotifyService
  ) {}

  /**
   * Looks up a single Spotify artist by id.
   */
  // route: /spotify/artists/:spotifyID
  @Get('artists/:spotifyID')
  spotifyGetArtist(@Param('spotifyID') spotifyID: string) {
    return this.spotifyService.getArtist(spotifyID);
  }

  /**
   * Imports a Spotify artist into the station roster: looks the artist up, maps
   * it onto an Artist, and persists it. Returns the created Artist.
   */
  // route: /spotify/import/:spotifyID
  @Post('import/:spotifyID')
  async spotifyImport(@Param('spotifyID') spotifyID: string) {
    const artist = await this.spotifyService.getArtist(spotifyID);

    return this.artistService.createOne({
      name: artist.name,
      genres: artist.genres,
      playerURL: artist.playerURL,
      spotifyID: artist.spotifyID
    });
  }

  /**
   * Searches Spotify for artists by name. Returns normalized results the client
   * can present and, on selection, import via {@link SpotifyController.spotifyImport}.
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
