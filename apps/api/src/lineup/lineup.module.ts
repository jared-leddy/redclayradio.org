// NPM Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Modules
import Artist from '@/database/artist.entity';
import Lineup from '@/database/lineup.entity';
import LineupController from './lineup.controller';
import LineupService from './lineup.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Lineup])],
  controllers: [LineupController],
  providers: [LineupService]
})
export default class LineupModule {}
