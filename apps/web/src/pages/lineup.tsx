// NPM Modules
import { useEffect, useState } from 'react';

// Shared Modules
import type { Artist } from '@redclayradio/utils/interfaces';

// Custom Modules
import ArtistTable from '@/components/organisms/ArtistTable';
import PageLayout from '@/components/templates/PageLayout';
import HTTPService from '@/utils/HTTPService';

/**
 * Lineup admin view: the full artist roster in a status-filterable table, loaded
 * from the `/artist` API on mount.
 */
export default function Lineup() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const response = await HTTPService<{ data: Artist[] }>({
          method: 'get',
          url: '/artist'
        });

        setArtists(response.data.data);
      } catch {
        setError('Something went wrong loading the lineup. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadArtists();
  }, []);

  return (
    <PageLayout>
      <section className='w-8/10 mx-auto my-8'>
        <h2 className='font-display text-7xl font-black uppercase tracking-display text-orange-100 text-center'>
          Artist Lineup
        </h2>
        <hr className='mt-4 border-t border-red-900' />
      </section>
      {isLoading ? (
        <p className='w-8/10 mx-auto font-ui text-sm text-stone-400'>Loading lineup…</p>
      ) : error ? (
        <p className='w-8/10 mx-auto font-ui text-sm text-red-600'>{error}</p>
      ) : (
        <ArtistTable artists={artists} />
      )}
    </PageLayout>
  );
}
