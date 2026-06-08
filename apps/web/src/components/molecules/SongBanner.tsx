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
      <div className='w-8/10 mx-auto py-16'>
        <div className='flex justify-between'>
          <div className='col w-[10%]'>
            <img src={tower.src} alt='radio tower' className='w-40' />
          </div>
          <div className='col w-[55%]'>
            <h2 className='text-orange-100 text-3xl font-bold uppercase'>Song of the Day</h2>
            <p className='w-full text-5xl text-orange-100 uppercase my-4 font-display'>{song.title}</p>
            <div className='flex gap-4 text-xl text-orange-100 uppercase'>
              <p className='text-orange-100 font-bold'>{song.artistName}</p>
              {song.album && (
                <>
                  <p>&middot;</p>
                  <p className='text-orange-100 font-bold'>
                    {song.album}
                    {song.year && ` (${song.year})`}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className='col pr-8 w-[30%]'>
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
