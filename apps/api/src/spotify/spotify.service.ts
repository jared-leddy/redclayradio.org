// NPM Modules
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

// Shared Modules
import type { RawSpotifyArtist, SpotifyArtist, SpotifyTokenResponse } from '@redclayradio/utils/interfaces';

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
   * Looks up a single Spotify artist by id and returns a normalized result.
   */
  async getArtist(spotifyID: string): Promise<SpotifyArtist> {
    const token = await this.getAccessToken();

    const response = await axios<RawSpotifyArtist>({
      method: 'get',
      url: `${process.env.SPOTIFY_API_URL}/artists/${spotifyID}`,
      headers: { Authorization: `Bearer ${token}` }
    });

    return this.normalizeArtist(response.data);
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
