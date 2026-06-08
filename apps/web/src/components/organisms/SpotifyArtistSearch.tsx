// NPM Modules
import { useState, type SubmitEvent } from 'react';

// Shared Modules
import type { SpotifyArtist } from '@redclayradio/utils/interfaces';

// Custom Modules
import HTTPService from '@/utils/HTTPService';
import TextField from '../atoms/TextField';
import SpotifyArtistResult from '../molecules/SpotifyArtistResult';

type SpotifyArtistSearchProps = {
  onSelect: (artist: SpotifyArtist) => void;
  onCancel: () => void;
};

/**
 * First step of the Add Artist flow: searches Spotify by artist name and lists
 * the matches as selectable rows. Choosing a row fires `onSelect` with the
 * picked {@link SpotifyArtist} so the next step can prefill the create form. An
 * empty or failed search is surfaced inline, and `onCancel` dismisses the flow.
 */
export default function SpotifyArtistSearch({ onSelect, onCancel }: SpotifyArtistSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SpotifyArtist[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Runs the Spotify search for the current query and stores the normalized
   * results. A blank query is ignored.
   */
  const handleSearch = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const term = query.trim();
    if (!term) {
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await HTTPService<{ data: SpotifyArtist[] }>({
        method: 'get',
        url: '/spotify/search',
        params: { q: term }
      });

      setResults(response.data.data);
      setHasSearched(true);
    } catch {
      setError('Something went wrong searching Spotify. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <form onSubmit={handleSearch} className='flex items-end gap-3'>
        <div className='flex-1'>
          <TextField id='spotify-search' label='Artist Name' value={query} onChange={setQuery} placeholder='Deftones' />
        </div>
        <button
          type='submit'
          disabled={isSearching || !query.trim()}
          className='border border-red-500 bg-red-500 px-4 py-2 font-ui text-sm font-bold uppercase tracking-ui text-stone-100 transition-colors hover:bg-red-500 disabled:opacity-50'
        >
          {isSearching ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && <p className='font-ui text-sm text-red-500'>{error}</p>}

      {results.length > 0 && (
        <ul className='flex max-h-80 flex-col gap-2 overflow-y-auto'>
          {results.map((artist) => (
            <li key={artist.spotifyID}>
              <SpotifyArtistResult artist={artist} onSelect={onSelect} />
            </li>
          ))}
        </ul>
      )}

      {hasSearched && !isSearching && !error && results.length === 0 && (
        <p className='font-ui text-sm text-stone-500'>No artists found. Try a different name.</p>
      )}

      <div className='mt-2 flex justify-end'>
        <button
          type='button'
          onClick={onCancel}
          className='border border-zinc-700 px-4 py-2 font-ui text-sm font-bold uppercase tracking-ui text-stone-300 transition-colors hover:border-stone-500'
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
