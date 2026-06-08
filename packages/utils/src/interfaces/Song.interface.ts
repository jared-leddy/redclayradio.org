/**
 * The station's featured song for a single broadcast day, resolved for display.
 * Chosen once at local midnight from a random track by a random artist in that
 * day's lineup and then frozen for the day, independent of the hourly stage
 * rotation. `playerURL` is the embeddable Spotify track iframe.
 */
export default interface Song {
  date: string;
  title: string;
  artistName: string;
  album?: string;
  year?: string;
  playerURL: string;
}
