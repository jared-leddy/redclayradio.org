// NPM Modules
import { isAxiosError } from 'axios';
import { useState, type SubmitEvent } from 'react';

// Shared Modules
import type { Artist, ArtistCreate, SpotifyArtist } from '@redclayradio/utils/interfaces';

// Custom Modules
import HTTPService from '@/utils/HTTPService';
import TextField from '../atoms/TextField';

type ArtistFormProps = {
  initialArtist?: SpotifyArtist;
  onSuccess: (artist: Artist) => void;
  onBack?: () => void;
  onCancel: () => void;
};

/**
 * Final step of the Add Artist flow: a controlled form that creates an Artist
 * from a Spotify selection. When `initialArtist` is supplied, its name, genres,
 * embeddable player URL, and Spotify id prefill the fields; location is always
 * entered by hand since Spotify doesn't provide it. The Spotify id is required
 * and unique server-side, so submitting an artist already in the roster surfaces
 * a conflict message rather than creating a duplicate. Genres are edited as a
 * comma-separated list and split into an array on submit, and blank optional
 * fields are omitted from the payload. The created Artist is handed back through
 * `onSuccess`. When provided, `onBack` returns to the search step; `onCancel`
 * dismisses the flow. Submission failures are surfaced inline.
 */
export default function ArtistForm({ initialArtist, onSuccess, onBack, onCancel }: ArtistFormProps) {
  const [name, setName] = useState(initialArtist?.name ?? '');
  const [genres, setGenres] = useState(initialArtist?.genres.join(', ') ?? '');
  const [location, setLocation] = useState('');
  const [playerURL, setPlayerURL] = useState(initialArtist?.playerURL ?? '');
  const [spotifyID, setSpotifyID] = useState(initialArtist?.spotifyID ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload: ArtistCreate = {
      name: name.trim(),
      genres: genres
        .split(',')
        .map((genre) => genre.trim())
        .filter(Boolean),
      spotifyID: spotifyID.trim(),
      ...(location.trim() && { location: location.trim() }),
      ...(playerURL.trim() && { playerURL: playerURL.trim() })
    };

    try {
      const response = await HTTPService<{ data: Artist }>({
        method: 'post',
        url: '/artist',
        data: payload
      });

      onSuccess(response.data.data);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) {
        setError('This artist is already in the lineup.');
      } else {
        setError('Something went wrong submitting the artist. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <TextField id='artist-name' label='Name' value={name} onChange={setName} required placeholder='Blink 182' />
      <TextField
        id='artist-genres'
        label='Genres'
        value={genres}
        onChange={setGenres}
        hint='Comma-separated, e.g. Punk, Pop Punk'
        placeholder='Punk, Pop Punk'
      />
      <TextField
        id='artist-location'
        label='Location'
        value={location}
        onChange={setLocation}
        placeholder='Charlotte, NC, USA'
      />
      <TextField
        id='artist-player'
        label='Spotify URL'
        value={playerURL}
        onChange={setPlayerURL}
        placeholder='https://open.spotify.com/embed/artist/...'
      />
      <TextField
        id='artist-spotify'
        label='Spotify ID'
        value={spotifyID}
        onChange={setSpotifyID}
        required
        placeholder='6Ghvu1VvMGScGpOUJBAHNH'
      />
      {error && <p className='font-ui text-sm text-red-600'>{error}</p>}
      <div className='mt-2 flex justify-end gap-3'>
        {onBack && (
          <button
            type='button'
            onClick={onBack}
            className='mr-auto border border-zinc-700 px-4 py-2 font-ui text-sm font-bold uppercase tracking-ui text-stone-300 transition-colors hover:border-stone-500'
          >
            Back
          </button>
        )}
        <button
          type='button'
          onClick={onCancel}
          className='border border-zinc-700 px-4 py-2 font-ui text-sm font-bold uppercase tracking-ui text-stone-300 transition-colors hover:border-stone-500'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isSubmitting}
          className='border border-red-900 bg-red-900 px-4 py-2 font-ui text-sm font-bold uppercase tracking-ui text-stone-100 transition-colors hover:bg-red-800 disabled:opacity-50'
        >
          {isSubmitting ? 'Submitting…' : 'Submit Artist'}
        </button>
      </div>
    </form>
  );
}
