// NPM Modules
import type { Song } from '@redclayradio/utils/interfaces';

// Custom Modules
import tower from '@/assets/img/radio-tower.png';

type SongBannerProps = {
  song: Song | null;
};

/**
 * The "song of the day" feature: one track chosen at midnight and frozen for the
 * day, rendered with an embedded Spotify track player. Renders nothing until a
 * song has been picked.
 */
export default function SongBanner({ song }: SongBannerProps) {
  if (!song) {
    return null;
  }

  return (
    <section className='bg-red-500 w-full mt-4'>
      <div className='w-[92%] sm:w-8/10 mx-auto py-10 sm:py-16'>
        <div className='flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8'>
          <div className='shrink-0'>
            <img src={tower.src} alt='radio tower' className='w-24 sm:w-32 lg:w-40' />
          </div>
          <div className='w-full text-center lg:flex-1 lg:text-left'>
            <h2 className='text-orange-100 text-2xl sm:text-3xl font-bold uppercase'>Song of the Day</h2>
            <p className='w-full text-3xl sm:text-5xl text-orange-100 uppercase my-4 font-display'>{song.title}</p>
            <div className='flex flex-wrap justify-center gap-x-4 gap-y-1 text-lg sm:text-xl text-orange-100 uppercase lg:justify-start'>
              <p className='text-orange-100 font-bold'>{song.artistName}</p>
              {song.album && (
                <>
                  <p className='hidden sm:block'>&middot;</p>
                  <p className='text-orange-100 font-bold'>
                    {song.album}
                    {song.year && ` (${song.year})`}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className='w-full shrink-0 lg:w-80'>
            <iframe
              title={`Spotify player: ${song.title} by ${song.artistName}`}
              allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
              className='rounded-xl'
              data-testid='embed-iframe'
              height='152'
              loading='lazy'
              src={song.playerURL}
              width='100%'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
