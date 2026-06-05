// NPM Modules
import { Module } from '@nestjs/common';

// Custom Modules
import ArtistModule from '@/artist/artist.module';
import SpotifyController from './spotify.controller';
import SpotifyService from './spotify.service';

@Module({
  imports: [ArtistModule],
  controllers: [SpotifyController],
  providers: [SpotifyService],
  exports: [SpotifyService]
})
export default class SpotifyModule {}
