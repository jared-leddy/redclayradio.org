/**
 * Normalized Spotify track, shaped for our own use rather than mirroring the raw
 * Spotify Web API response. Returned by the API's random-track lookup and used to
 * build the song of the day. `playerURL` is the embeddable track iframe URL,
 * mirroring the artist embed convention.
 */
export default interface SpotifyTrack {
  spotifyID: string;
  title: string;
  album: string;
  year: string;
  /** Embeddable player URL for the track (Spotify iframe embed). */
  playerURL: string;
}
