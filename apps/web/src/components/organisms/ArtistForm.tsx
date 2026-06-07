// NPM Modules
import axios from 'axios';
import { useState, type FormEvent } from 'react';

// Shared Modules
import type { Artist, ArtistCreate } from '@redclayradio/utils/interfaces';

// Custom Modules
import TextField from '../atoms/TextField';

type ArtistFormProps = {
  onSuccess: (artist: Artist) => void;
  onCancel: () => void;
};

/**
 * Controlled form for submitting a new Artist to the API. Genres are typed as a
 * comma-separated list and split into an array on submit; blank optional fields
 * are omitted from the payload. The created Artist is handed back through
 * `onSuccess`, while submission failures are surfaced inline.
 */
export default function ArtistForm({ onSuccess, onCancel }: ArtistFormProps) {
  const [name, setName] = useState('');
  const [genres, setGenres] = useState('');
  const [location, setLocation] = useState('');
  const [playerURL, setPlayerURL] = useState('');
  const [spotifyID, setSpotifyID] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload: ArtistCreate = {
      name: name.trim(),
      genres: genres
        .split(',')
        .map((genre) => genre.trim())
        .filter(Boolean),
      ...(location.trim() && { location: location.trim() }),
      ...(playerURL.trim() && { playerURL: playerURL.trim() }),
      ...(spotifyID.trim() && { spotifyID: spotifyID.trim() })
    };

    try {
      const response = await axios<{ data: Artist }>({
        method: 'post',
        url: `${process.env.API_URL}/artist`,
        data: payload
      });

      onSuccess(response.data.data);
    } catch {
      setError('Something went wrong submitting the artist. Please try again.');
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
        placeholder='6Ghvu1VvMGScGpOUJBAHNH'
      />
      {error && <p className='font-ui text-sm text-red-600'>{error}</p>}
      <div className='mt-2 flex justify-end gap-3'>
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
