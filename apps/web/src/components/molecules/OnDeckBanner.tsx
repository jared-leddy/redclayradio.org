// NPM Modules
import type { Artist } from '@redclayradio/utils/interfaces';

// Custom Modules
import ChevronRight from '../atoms/icons/ChevronRight';
import Signal from '../atoms/icons/Signal';

type OnDeckBannerProps = {
  items: Artist[];
};

/**
 * The live on-deck ticker: every act queued behind the two stages, in rotation
 * order. Read-only — the list is driven by the server's running order and shifts
 * down on its own as acts rotate onto the stages each hour.
 */
export default function OnDeckBanner({ items }: OnDeckBannerProps) {
  return (
    <section className='w-full bg-zinc-950 overflow-x-hidden'>
      <div className='flex items-center'>
        <div className='flex items-center'>
          <Signal />
          <h2 className='text-red-500 uppercase w-16'>On Deck</h2>
          <ChevronRight />
        </div>
        <ul className='flex max-h-14 flex-wrap items-center overflow-hidden'>
          {items.map((artist) => (
            <li key={artist.id} className='flex p-2'>
              <div className='px-2'>
                <p className='font-bold text-sm'>{artist.name}</p>
                <p className='text-xs uppercase'>{artist.genres?.[0] ?? '—'}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
