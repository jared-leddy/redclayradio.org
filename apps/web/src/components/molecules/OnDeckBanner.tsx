// NPM Modules
import { useState } from 'react';

// NPM Modules
import type { OnDeckListItem } from '@redclayradio/utils';

// Custom Modules
import ChevronRight from '../atoms/icons/ChevronRight';
import CircleXMark from '../atoms/icons/CircleXMark';
import Signal from '../atoms/icons/Signal';

type OnDeckBannerProps = {
  items: OnDeckListItem[];
};

export default function OnDeckBanner({ items }: OnDeckBannerProps) {
  const [currentItems, setCurrentItems] = useState(items);

  const handleRemove = (indexToRemove: number) => {
    setCurrentItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <section className='w-full bg-zinc-950 overflow-x-hidden'>
      <div className='flex items-center'>
        <Signal />
        <h2 className='text-red-700 uppercase'>On Deck</h2>
        <ChevronRight />
        <ul className='flex max-h-14 flex-wrap items-center overflow-hidden'>
          {currentItems.map((item, index) => (
            <li key={`${item.artist}-${index}`} className='flex p-2'>
              <div className='px-2'>
                <p className='font-bold text-sm'>{item.artist}</p>
                <p className='text-xs'>{item.genre}</p>
              </div>
              <button
                aria-label={`Remove ${item.artist}`}
                className='cursor-pointer'
                onClick={() => handleRemove(index)}
                type='button'
              >
                <CircleXMark />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
