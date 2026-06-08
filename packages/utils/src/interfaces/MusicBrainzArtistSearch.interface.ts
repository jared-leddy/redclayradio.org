// Custom Modules
import type MusicBrainzArtist from './MusicBrainzArtist.interface';

/**
 * Envelope returned by the MusicBrainz artist search endpoint.
 */
export default interface MusicBrainzArtistSearch {
  artists: MusicBrainzArtist[];
}
