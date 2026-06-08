// Custom Modules
import type MusicBrainzArea from './MusicBrainzArea.interface';
import type MusicBrainzTag from './MusicBrainzTag.interface';

/**
 * A MusicBrainz artist entry from the search results. `area` is typically the
 * country and `begin-area` the founding city.
 */
export default interface MusicBrainzArtist {
  id: string;
  name: string;
  country?: string;
  area?: MusicBrainzArea;
  'begin-area'?: MusicBrainzArea;
  tags?: MusicBrainzTag[];
}
