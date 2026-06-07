// NPM Modules
import { useState } from 'react';

// Shared Modules
import type { Artist, SpotifyArtist } from '@redclayradio/utils/interfaces';

// Custom Modules
import ArtistForm from './ArtistForm';
import SpotifyArtistSearch from './SpotifyArtistSearch';

type AddArtistFlowProps = {
  onComplete: (artist: Artist) => void;
  onCancel: () => void;
};

/**
 * Orchestrates the two-step Add Artist flow inside the modal. Step one searches
 * Spotify ({@link SpotifyArtistSearch}); once an artist is chosen it advances to
 * step two, an {@link ArtistForm} prefilled from that selection. "Back" clears
 * the selection and returns to search, `onComplete` fires with the created
 * Artist, and `onCancel` dismisses the flow.
 */
export default function AddArtistFlow({ onComplete, onCancel }: AddArtistFlowProps) {
  const [selectedArtist, setSelectedArtist] = useState<SpotifyArtist | null>(null);

  if (!selectedArtist) {
    return <SpotifyArtistSearch onSelect={setSelectedArtist} onCancel={onCancel} />;
  }

  return (
    <ArtistForm
      initialArtist={selectedArtist}
      onSuccess={onComplete}
      onBack={() => setSelectedArtist(null)}
      onCancel={onCancel}
    />
  );
}
