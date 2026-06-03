// Custom Modules
import type { PlayerType } from '../enums/PlayerType.enum';

export default interface Artist {
    genres: string[];
    location: string;
    name: string;
    playerType: PlayerType;
    playerURL: string;
}
