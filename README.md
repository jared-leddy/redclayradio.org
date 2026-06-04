# Red Clay Radio

The official website for Red Clay Radio is open for others to contribute on. What started out as a joke is now becoming a real website.

## Monorepo

This repository is a [Turborepo](https://turbo.build/) monorepo managed with npm workspaces.

```
apps/
  web/    Next.js 16 public site (Pages Router, Tailwind 4)
  api/    NestJS 11 API — TypeORM + Postgres, Spotify integration
packages/
  utils/             Shared domain types & enums (Artist, ArtistStatus, SpotifyArtist, …)
  typescript-config/ Shared tsconfig bases (base / nextjs / nestjs)
  eslint-config/     Shared ESLint flat configs (base / library / next / nest)
  prettier-config/   Shared Prettier config
```

### Requirements

- Node `v22.14.0` (see `.nvmrc`) and npm `>=10`
- A Postgres database for the API
- A [Spotify app](https://developer.spotify.com/dashboard) for client-credentials search

### Getting started

```bash
nvm use
npm install
npm run build   # builds packages/utils first, then both apps

# configure environment
#   apps/api/.env.development  → DB_* and SPOTIFY_CLIENT_*
#   apps/web/.env.development  → NEXT_PUBLIC_API_URL

npm run dev     # runs web (:3000) and api (:4000) together
```

### Useful scripts

| Command          | What it does                         |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Run all apps in watch mode via Turbo |
| `npm run build`  | Build every workspace                |
| `npm run lint`   | Lint every workspace                 |
| `npm run format` | Prettier-format the repo             |

### API surface (prefixed with `/v1`)

| Method   | Route                  | Purpose                                 |
| -------- | ---------------------- | --------------------------------------- |
| `GET`    | `/artist`              | List artists                            |
| `POST`   | `/artist`              | Create an artist                        |
| `GET`    | `/artist/:id`          | Get one artist                          |
| `PATCH`  | `/artist/:id`          | Update an artist                        |
| `DELETE` | `/artist/:id`          | Delete an artist                        |
| `GET`    | `/spotify/search?q=`   | Search Spotify for artists              |
| `GET`    | `/spotify/artists/:id` | Look up a Spotify artist                |
| `POST`   | `/spotify/import/:id`  | Import a Spotify artist into the roster |

## Mockups

We used AI to generate an image for what our mockups could look like. The original idea was to get a general idea and rebuild it in Figma Make, but the initial attempt was too good to let go of. So, the image below is being used as our mockup.

<img width="1536" height="1024" alt="RedClayRadio com-mockup" src="https://github.com/user-attachments/assets/19083691-5076-4ba7-bade-8aa954050b13" />

## Brand Tailwind Color Classes

### Backgrounds

| Element             | Tailwind Class | Notes                     |
| ------------------- | -------------- | ------------------------- |
| Page background     | `bg-zinc-950`  | Near-black base           |
| Stage cards         | `bg-zinc-900`  | Slightly lifted from base |
| Song of the Day bar | `bg-red-900`   | Deep brick red            |
| On Deck ticker      | `bg-zinc-950`  | Same as page bg           |
| Header              | `bg-zinc-950`  | Flush with page           |

### Text

| Element              | Tailwind Class   |
| -------------------- | ---------------- |
| Band names / hero    | `text-stone-100` |
| Body / metadata      | `text-stone-400` |
| Genre pills          | `text-stone-300` |
| Faded date watermark | `text-zinc-800`  |
| On Air / labels      | `text-red-500`   |

### Accents & Borders

| Element                  | Tailwind Class                    |
| ------------------------ | --------------------------------- |
| Logo + card borders      | `border-red-600` / `text-red-500` |
| Card top bar accent      | `bg-red-600`                      |
| Yellow lightning / icons | `text-yellow-500`                 |
| Reroll button border     | `border-red-600`                  |

### Third-Party Brand Colors (hardcode — no Tailwind equivalent)

| Element       | Hex       |
| ------------- | --------- |
| Spotify green | `#1DB954` |
| YouTube red   | `#FF0000` |

> **Note:** All colors map to Tailwind's default palette with no custom config needed,
> except the exact red-clay tone if a closer match to the mockup is desired.
> Add to `tailwind.config.ts` as:
>
> ```ts
> colors: {
>   'red-clay': '#B84B2A',
> }
> ```
