// NPM Modules
import { Module } from '@nestjs/common';

// Custom Modules
import SpotifyController from './spotify.controller';
import SpotifyService from './spotify.service';

@Module({
  controllers: [SpotifyController],
  providers: [SpotifyService],
  exports: [SpotifyService]
})
export default class SpotifyModule {}
