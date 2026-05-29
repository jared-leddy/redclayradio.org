# Red Clay Radio

The official website for Red Clay Radio is open for others to contribute on. What started out as a joke is now becoming a real website.

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
