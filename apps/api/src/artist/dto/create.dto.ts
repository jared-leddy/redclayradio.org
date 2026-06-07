// NPM Modules
import { ArrayMaxSize, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class ArtistCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  genres: string[];

  @IsString()
  @IsOptional()
  playerURL?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsNotEmpty()
  spotifyID: string;
}
