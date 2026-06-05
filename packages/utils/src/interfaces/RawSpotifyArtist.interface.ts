/** Subset of the raw Spotify artist object we consume. */
export default interface RawSpotifyArtist {
  id: string;
  name: string;
  genres?: string[];
  images?: { url: string; width: number; height: number }[];
  external_urls?: { spotify?: string };
  followers?: { total?: number };
  popularity?: number;
}
