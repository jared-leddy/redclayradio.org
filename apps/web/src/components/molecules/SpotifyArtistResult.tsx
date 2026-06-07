// Shared Modules
import type { SpotifyArtist } from '@redclayradio/utils/interfaces';

type SpotifyArtistResultProps = {
  artist: SpotifyArtist;
  onSelect: (artist: SpotifyArtist) => void;
};

/**
 * A single Spotify search result rendered as a selectable row: artist artwork,
 * name, genres, and follower count. Clicking the row hands the full
 * {@link SpotifyArtist} back to the parent through `onSelect` so it can prefill
 * the create form.
 */
export default function SpotifyArtistResult({ artist, onSelect }: SpotifyArtistResultProps) {
  return (
    <button
      type='button'
      onClick={() => onSelect(artist)}
      className='flex w-full items-center gap-3 border border-zinc-700 bg-black px-3 py-2 text-left transition-colors hover:border-red-700'
    >
      {artist.imageURL ? (
        <img src={artist.imageURL} alt={artist.name} className='h-12 w-12 flex-shrink-0 object-cover' />
      ) : (
        <div className='h-12 w-12 flex-shrink-0 bg-zinc-800' />
      )}
      <div className='flex flex-col gap-0.5 overflow-hidden'>
        <span className='truncate font-heading text-lg font-bold uppercase tracking-ui text-orange-100'>
          {artist.name}
        </span>
        {artist.genres.length > 0 && (
          <span className='truncate font-ui text-xs text-stone-400'>{artist.genres.join(', ')}</span>
        )}
        {artist.followers !== undefined && (
          <span className='font-ui text-xs text-stone-500'>{artist.followers.toLocaleString()} followers</span>
        )}
      </div>
    </button>
  );
}
