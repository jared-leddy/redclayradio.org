// NPM Modules
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class ArtistCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  playerURL?: string;

  @IsString()
  @IsNotEmpty()
  spotifyID: string;
}
