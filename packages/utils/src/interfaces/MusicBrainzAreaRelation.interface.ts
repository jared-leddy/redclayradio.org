// Custom Modules
import type MusicBrainzArea from './MusicBrainzArea.interface';

/**
 * A relationship between two MusicBrainz areas. A `part of` relation with
 * `backward` direction points from a child area up to its parent.
 */
export default interface MusicBrainzAreaRelation {
  type: string;
  direction: string;
  area: MusicBrainzArea;
}
