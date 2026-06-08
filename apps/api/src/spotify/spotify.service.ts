// NPM Modules
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

// Shared Modules
import type {
  RawSpotifyAlbum,
  RawSpotifyArtist,
  RawSpotifyTrack,
  SpotifyArtist,
  SpotifyTokenResponse,
  SpotifyTrack
} from '@redclayradio/utils/interfaces';

/**
 * Talks to the Spotify Web API using the Client Credentials flow (app-level
 * access, no user login). The bearer token is cached in memory and transparently
 * refreshed shortly before it expires, so callers never manage tokens directly.
 *
 * Upstream/network failures are left to propagate — the global DataResponse
 * interceptor logs them and Nest's exception handling shapes the response.
 */
@Injectable()
export default class SpotifyService {
  private cachedToken: string | null = null;
  private tokenExpiresAt = 0;

  constructor(private readonly configService: ConfigService) {}

  /**
   * Returns a valid bearer token, fetching a fresh one if the cache is empty or
   * within 60s of expiry.
   */
  private async getAccessToken(): Promise<string> {
    if (this.cachedToken && Date.now() < this.tokenExpiresAt) {
      return this.cachedToken;
    }

    const clientID = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get<string>('SPOTIFY_CLIENT_SECRET');

    if (!clientID || !clientSecret) {
      throw new InternalServerErrorException('Spotify credentials are not configured.');
    }

    const basicAuth = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');

    const response = await axios<SpotifyTokenResponse>({
      method: 'post',
      url: process.env.SPOTIFY_TOKEN_URL,
      data: new URLSearchParams({ grant_type: 'client_credentials' }),
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    this.cachedToken = response.data.access_token;
    // Refresh 60s early to avoid races against the hard expiry.
    this.tokenExpiresAt = Date.now() + (response.data.expires_in - 60) * 1000;

    return this.cachedToken;
  }

  /**
   * Maps a raw Spotify artist object onto our normalized {@link SpotifyArtist},
   * including the embeddable player URL used by the web client.
   */
  private normalizeArtist(artist: RawSpotifyArtist): SpotifyArtist {
    return {
      spotifyID: artist.id,
      name: artist.name,
      genres: artist.genres ?? [],
      imageURL: artist.images?.[0]?.url,
      playerURL: `https://open.spotify.com/embed/artist/${artist.id}?theme=0`,
      spotifyURL: artist.external_urls?.spotify,
      followers: artist.followers?.total,
      popularity: artist.popularity
    };
  }

  /**
   * Maps a raw Spotify track and its album onto our normalized {@link SpotifyTrack},
   * including the embeddable track player URL used by the web client.
   */
  private normalizeTrack(track: RawSpotifyTrack, album: RawSpotifyAlbum): SpotifyTrack {
    return {
      spotifyID: track.id,
      title: track.name,
      album: album.name,
      year: album.release_date?.slice(0, 4) ?? '',
      playerURL: `https://open.spotify.com/embed/track/${track.id}?theme=0`
    };
  }

  /**
   * Picks a single album uniformly at random from across the artist's full
   * catalog of albums and singles (not "appears on" compilations). The albums
   * endpoint caps `limit` at 10, so rather than page through everything we read
   * the catalog size and fetch one album at a random offset. Throws if the artist
   * has no albums.
   */
  private async getRandomAlbum(spotifyID: string, token: string): Promise<RawSpotifyAlbum> {
    const url = `${process.env.SPOTIFY_API_URL}/artists/${spotifyID}/albums`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = { include_groups: 'album,single', market: 'US' };

    const countResponse = await axios<{ total: number }>({
      method: 'get',
      url,
      headers,
      params: { ...params, limit: 1 }
    });

    const { total } = countResponse.data;

    if (total === 0) {
      throw new Error(`Artist ${spotifyID} has no albums.`);
    }

    const albumResponse = await axios<{ items: RawSpotifyAlbum[] }>({
      method: 'get',
      url,
      headers,
      params: { ...params, limit: 1, offset: Math.floor(Math.random() * total) }
    });

    return albumResponse.data.items[0];
  }

  /**
   * Returns a random track from a random album in the artist's catalog. Restricts
   * to the artist's own albums and singles so the result is a genuine catalog cut
   * rather than the artist's top hit.
   */
  async getRandomTrack(spotifyID: string): Promise<SpotifyTrack> {
    const token = await this.getAccessToken();

    const album = await this.getRandomAlbum(spotifyID, token);

    const tracksResponse = await axios<{ items: RawSpotifyTrack[] }>({
      method: 'get',
      url: `${process.env.SPOTIFY_API_URL}/albums/${album.id}/tracks`,
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: 50, market: 'US' }
    });

    const tracks = tracksResponse.data.items;
    const track = tracks[Math.floor(Math.random() * tracks.length)];

    return this.normalizeTrack(track, album);
  }

  /**
   * Searches Spotify for artists matching `query` and returns normalized results.
   */
  async searchArtists(query: string, limit = 10): Promise<SpotifyArtist[]> {
    const token = await this.getAccessToken();

    const response = await axios<{ artists: { items: RawSpotifyArtist[] } }>({
      method: 'get',
      url: `${process.env.SPOTIFY_API_URL}/search`,
      headers: { Authorization: `Bearer ${token}` },
      params: { q: query, type: 'artist', limit }
    });

    return response.data.artists.items.map((artist) => this.normalizeArtist(artist));
  }
}
