/**
 * Normalized Spotify artist, shaped for our own use rather than mirroring the
 * raw Spotify Web API response. Returned by the API's Spotify search/lookup
 * endpoints and consumed by the web client when building an Artist.
 */
export default interface SpotifyArtist {
  spotifyID: string;
  name: string;
  genres: string[];
  imageURL?: string;
  /** Embeddable player URL for the artist (Spotify iframe embed). */
  playerURL: string;
  /** Public Spotify page URL for the artist. */
  spotifyURL?: string;
  followers?: number;
  popularity?: number;
}
