declare namespace NodeJS {
  export interface ProcessEnv {
    DB_HOST: string;
    DB_PASSWORD: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_SSL: string;
    DB_USERNAME: string;
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
  }
}
