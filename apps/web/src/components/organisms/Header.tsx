// Custom Modules
import Radio from '../atoms/icons/Radio';
import Shuffle from '../atoms/icons/Shuffle';

export default function Header() {
  const today = new Date().toDateString();

  return (
    <header className='w-8/10 mx-auto bg-zinc-950 flex items-stretch border border-red-900'>
      <div className='flex w-3/10 items-center justify-center px-6 py-3'>
        <h1 className='font-display text-7xl font-black uppercase tracking-display text-red-800'>Red Clay Radio</h1>
      </div>
      <div className='flex w-1/4 items-center justify-center gap-2 px-4 py-3'>
        <Radio isLive={true} />
        <div className='font-ui uppercase tracking-ui'>
          <p className='text-2xl font-bold text-red-800'>On Air</p>
          <p className='text-sm text-stone-100'>From the Carolinas</p>
        </div>
      </div>
      <div className='flex w-1/5 flex-col justify-center px-4 py-3'>
        <p className='font-ui text-sm uppercase tracking-ui text-stone-100'>Today&apos;s Date</p>
        <p className='font-mono text-xl tracking-mono text-stone-100'>{today}</p>
      </div>
      <div className='flex w-1/4 items-center justify-center px-4 py-3'>
        <div className='flex items-center gap-3 border-2 border-red-900 px-5 py-2'>
          <div className='scale-75'>
            <Shuffle />
          </div>
          <div className='font-ui uppercase tracking-ui'>
            <p className='text-2xl font-bold text-red-800'>Shuffle</p>
            <p className='text-xs text-stone-100'>Discover New Tunes</p>
          </div>
        </div>
      </div>
    </header>
  );
}
