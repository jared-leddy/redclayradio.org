/** Shape of the OAuth token response from the Spotify accounts service. */
export default interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
