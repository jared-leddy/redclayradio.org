// NPM Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Modules
import Artist from '@/database/artist.entity';
import GenreModule from '@/genre/genre.module';
import MusicBrainzModule from '@/musicbrainz/musicbrainz.module';
import ArtistController from './artist.controller';
import ArtistService from './artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist]), GenreModule, MusicBrainzModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService]
})
export default class ArtistModule {}
