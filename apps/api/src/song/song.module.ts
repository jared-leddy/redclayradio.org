// NPM Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Modules
import Song from '@/database/song.entity';
import LineupModule from '@/lineup/lineup.module';
import SpotifyModule from '@/spotify/spotify.module';
import SongController from './song.controller';
import SongService from './song.service';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), LineupModule, SpotifyModule],
  controllers: [SongController],
  providers: [SongService]
})
export default class SongModule {}
