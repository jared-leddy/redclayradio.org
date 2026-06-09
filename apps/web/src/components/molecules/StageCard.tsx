// NPM Modules
import type { StageType } from '@redclayradio/utils/enums';
import type { Artist } from '@redclayradio/utils/interfaces';

// Custom Modules
import Stage from '../atoms/icons/Stage';

type StageCardProps = {
  artist: Artist;
  stageType: StageType;
};

export default function StageCard({ artist, stageType }: StageCardProps) {
  return (
    <article className='flex flex-col border border-red-500 bg-zinc-950 p-4 sm:p-6'>
      <div className='flex items-start gap-3'>
        <div className='flex items-center justify-center border border-red-500 p-2'>
          <Stage />
        </div>
        <div className='flex-1'>
          <p className='font-heading text-lg font-bold uppercase tracking-ui text-red-500'>{stageType} Stage</p>
          <h3 className='font-display text-3xl font-black uppercase leading-none tracking-display text-orange-100 sm:text-4xl lg:text-5xl'>
            {artist.name}
          </h3>
          <ul className='mt-4 flex flex-wrap gap-2 min-h-4'>
            {(artist.genres ?? []).map((genre) => (
              <li
                key={genre}
                className='border border-zinc-700 px-3 py-1 font-ui text-xs uppercase tracking-ui text-stone-100'
              >
                {genre}
              </li>
            ))}
          </ul>
          {artist.location && (
            <p className='mt-3 font-heading text-md uppercase tracking-ui text-yellow-500'>{artist.location}</p>
          )}
        </div>
      </div>
      {artist.playerURL && (
        <div className='music-player mt-4 border-2 border-green-500 rounded-lg'>
          <iframe
            title='spotify player'
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            className='rounded-xl'
            data-testid='embed-iframe'
            height='352'
            loading='lazy'
            src={artist.playerURL}
            width='100%'
          />
        </div>
      )}
    </article>
  );
}
