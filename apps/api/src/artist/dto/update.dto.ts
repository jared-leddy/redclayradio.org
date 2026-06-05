// NPM Modules
import { PartialType } from '@nestjs/mapped-types';

// Custom Modules
import Artist from '@/database/artist.entity';

export default class ArtistUpdateDTO extends PartialType(Artist) {}
