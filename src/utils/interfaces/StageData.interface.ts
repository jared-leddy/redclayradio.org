// Custom Modules
import type { StageType } from '../enums/StageType.enum';

export default interface StageData {
    artist: string;
    genres: string[];
    location: string;
    playerURL: string;
    stageType: StageType;
}
