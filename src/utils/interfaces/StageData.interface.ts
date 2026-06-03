// Custom Modules
import type { PlayerType } from '../enums/PlayerType.enum';
import type { StageType } from '../enums/StageType.enum';

export default interface StageData {
    artist: string;
    genres: string[];
    location: string;
    playerType: PlayerType;
    playerURL: string;
    stageType: StageType;
}
