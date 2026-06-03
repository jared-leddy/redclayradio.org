// Custom Modules
import type { ArtistStatus } from '../enums/ArtistStatus.enum';
import type { PlayerType } from '../enums/PlayerType.enum';

export default interface Artist {
    genres: string[];
    isActive: boolean;
    location: string;
    name: string;
    playerType: PlayerType;
    playerURL: string;
    status: ArtistStatus;
}
