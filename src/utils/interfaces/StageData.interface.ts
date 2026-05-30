// Custom Modules
import { StageType } from '../enums/StageType.enum';

export default interface StageData {
    artist: string;
    genres: string[];
    location: string;
    stage: StageType;
}
