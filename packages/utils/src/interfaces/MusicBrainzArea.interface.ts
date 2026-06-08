// Custom Modules
import type MusicBrainzAreaRelation from './MusicBrainzAreaRelation.interface';

/**
 * A MusicBrainz geographic area (city, county, subdivision/state, country, ...).
 * When fetched with `inc=area-rels`, `relations` holds its hierarchy links.
 */
export default interface MusicBrainzArea {
  id: string;
  name: string;
  type: string | null;
  relations?: MusicBrainzAreaRelation[];
}
