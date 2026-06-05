// Custom Modules
import tower from '@/assets/img/radio-tower.png';
import Spotify from '../atoms/icons/Spotify';
import YouTube from '../atoms/icons/YouTube';

export default function SongBanner() {
  return (
    <section className='bg-red-800 w-full mt-4'>
      <div className='w-8/10 mx-auto py-16'>
        <div className='flex justify-between'>
          <div className='col w-[10%]'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tower.src} alt='radio tower' className='w-40' />
          </div>
          <div className='col w-[60%]'>
            <h2 className='text-yellow-500 text-3xl font-bold uppercase'>Song of the Day</h2>
            <p className='w-full text-5xl text-orange-100 uppercase my-4 font-display'>Under A Killing Moon</p>
            <div className='flex gap-4 text-xl text-orange-100 uppercase'>
              <p>Thrice</p>
              <p>&middot;</p>
              <p>The Artist in the Ambulance (2003)</p>
            </div>
          </div>
          <div className='col pr-8 w-[20%]'>
            <a
              className='bg-zinc-950 border border-yellow-500 uppercase px-4 py-1 flex items-center text-yellow-500 font-medium mb-4'
              href='https://redclayradio.com'
              target='_blank'
              rel='noreferrer'
            >
              <Spotify />
              Play on Spotify
            </a>
            <a
              className='flex bg-zinc-950 border border-yellow-500 uppercase px-4 py-1 items-center text-yellow-500 font-medium'
              href='https://redclayradio.com'
              target='_blank'
              rel='noreferrer'
            >
              <YouTube />
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
