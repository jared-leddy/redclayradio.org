// Custom Modules
import type { ArtistStatus } from '../enums/ArtistStatus.enum';
import type ArtistCreate from './ArtistCreate.interface';

export default interface Artist extends ArtistCreate {
    isActive: boolean;
    status: ArtistStatus;
}
