// Custom Modules
import type { ArtistStatus } from '../enums/ArtistStatus.enum';
import type ArtistCreate from './ArtistCreate.interface';

/**
 * Canonical Artist shape shared between the API (TypeORM entity) and the web
 * client (rendered UI). `id` and the timestamps are present on records returned
 * by the API and absent on not-yet-persisted input — hence optional here.
 * `genres` and `location` are derived server-side from MusicBrainz rather than
 * supplied on create, so they live here on the record shape, not on `ArtistCreate`.
 */
export default interface Artist extends ArtistCreate {
  id?: string;
  genres?: string[];
  isActive: boolean;
  location?: string;
  status: ArtistStatus;
  createdOn?: string;
  updatedOn?: string;
}
