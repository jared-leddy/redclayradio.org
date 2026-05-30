// Custom Modules
import { PlayerType } from '../enums/PlayerType.enum';
import { StageType } from '../enums/StageType.enum';

export default interface StageData {
    artist: string;
    genres: string[];
    location: string;
    playerType: PlayerType;
    playerURL: string;
    stageType: StageType;
}
