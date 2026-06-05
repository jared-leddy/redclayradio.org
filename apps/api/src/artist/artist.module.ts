// NPM Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Modules
import Artist from '@/database/artist.entity';
import ArtistController from './artist.controller';
import ArtistService from './artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService]
})
export default class ArtistModule {}
