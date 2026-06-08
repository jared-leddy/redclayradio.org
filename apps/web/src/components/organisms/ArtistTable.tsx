// NPM Modules
import { useMemo, useState } from 'react';

// Shared Modules
import { ArtistStatus } from '@redclayradio/utils/enums';
import type { Artist } from '@redclayradio/utils/interfaces';

// Custom Modules
import StatusBadge from '../atoms/StatusBadge';
import StatusTabs, { type StatusFilter } from '../molecules/StatusTabs';

type ArtistTableProps = {
  artists: Artist[];
};

/**
 * The full artist roster rendered as a table, with status tabs that filter the
 * visible rows. Tab counts and the filtered row set are derived from the
 * incoming `artists` prop, so the table stays in sync with whatever data it's
 * handed.
 */
export default function ArtistTable({ artists }: ArtistTableProps) {
  const [filter, setFilter] = useState<StatusFilter>('all');

  const counts = useMemo<Record<StatusFilter, number>>(
    () => ({
      all: artists.length,
      [ArtistStatus.Approved]: artists.filter((artist) => artist.status === ArtistStatus.Approved).length,
      [ArtistStatus.Pending]: artists.filter((artist) => artist.status === ArtistStatus.Pending).length,
      [ArtistStatus.Rejected]: artists.filter((artist) => artist.status === ArtistStatus.Rejected).length
    }),
    [artists]
  );

  const visibleArtists = useMemo(
    () => (filter === 'all' ? artists : artists.filter((artist) => artist.status === filter)),
    [artists, filter]
  );

  return (
    <section className='w-8/10 mx-auto'>
      <StatusTabs active={filter} counts={counts} onChange={setFilter} />
      <div className='mt-4 border border-red-500'>
        <table className='w-full border-collapse text-left'>
          <thead>
            <tr className='bg-zinc-950 font-ui text-xs uppercase tracking-ui text-red-500'>
              <th className='w-1/4 px-4 py-3'>Artist</th>
              <th className='px-4 py-3'>Genres</th>
              <th className='px-4 py-3'>Location</th>
              <th className='px-4 py-3'>Status</th>
              <th className='px-4 py-3'>Active</th>
            </tr>
          </thead>
          <tbody>
            {visibleArtists.map((artist) => (
              <tr key={artist.id} className='border-t border-zinc-800 bg-black/40 align-top'>
                <td className='px-4 py-3 font-heading text-lg font-bold uppercase tracking-ui text-orange-100'>
                  {artist.name}
                </td>
                <td className='px-4 py-3'>
                  <ul className='flex flex-wrap gap-2'>
                    {(artist.genres ?? []).map((genre) => (
                      <li
                        key={genre}
                        className='border border-zinc-700 px-2 py-1 font-ui text-xs uppercase tracking-ui text-stone-100'
                      >
                        {genre}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className='px-4 py-3 font-mono text-sm tracking-mono text-stone-300'>{artist.location ?? '—'}</td>
                <td className='px-4 py-3'>
                  <StatusBadge status={artist.status} />
                </td>
                <td className='px-4 py-3 font-ui text-sm uppercase tracking-ui'>
                  <span className={artist.status === ArtistStatus.Approved ? 'text-green-500' : 'text-orange-100'}>
                    {artist.status === ArtistStatus.Approved ? 'Live' : 'Off'}
                  </span>
                </td>
              </tr>
            ))}
            {visibleArtists.length === 0 && (
              <tr>
                <td colSpan={5} className='px-4 py-8 text-center font-ui uppercase tracking-ui text-stone-400'>
                  No artists in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
