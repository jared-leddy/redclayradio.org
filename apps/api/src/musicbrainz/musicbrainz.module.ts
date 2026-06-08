// NPM Modules
import { Module } from '@nestjs/common';

// Custom Modules
import MusicBrainzService from './musicbrainz.service';

@Module({
  providers: [MusicBrainzService],
  exports: [MusicBrainzService]
})
export default class MusicBrainzModule {}
