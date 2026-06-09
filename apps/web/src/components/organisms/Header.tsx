// NPM Modules
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Custom Modules
import AddArtistFlow from './AddArtistFlow';
import Modal from '../molecules/Modal';

/**
 * Primary header navigation targets. The order here is the order links render in
 * the nav row.
 */
const navLinks: { href: string; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/lineup', label: 'Lineup' }
];

/**
 * Site masthead rendered on every page through {@link PageLayout}: a centered
 * wordmark that links home, an "On Air" status line paired with the current
 * date, and a nav row that highlights the active route. Stacks vertically on
 * small screens and spreads across the row on larger ones.
 */
export default function Header() {
  const router = useRouter();
  const [isArtistModalOpen, setIsArtistModalOpen] = useState(false);
  const today = new Date()
    .toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    .toUpperCase();

  return (
    <>
      <header className='w-[92%] sm:w-8/10 mx-auto border border-red-500 bg-zinc-950'>
        <div className='flex flex-col items-center justify-center gap-2 px-4 py-4 font-ui uppercase tracking-ui sm:flex-row sm:justify-between sm:px-6'>
          <div className='flex items-center gap-2'>
            <span className='h-3 w-3 animate-pulse rounded-full bg-red-500' />
            <span className='text-lg font-bold text-red-500 sm:text-xl'>On Air</span>
            <span className='text-stone-500'>&middot;</span>
            <span className='text-sm text-stone-100'>From the Carolinas</span>
          </div>
          <p className='font-mono text-base tracking-mono text-stone-100 sm:text-lg'>{today}</p>
        </div>
        <div className='flex flex-col items-center justify-between gap-2 border-t border-red-500 sm:flex-row sm:gap-0'>
          <Link href='/' className='block px-4 pt-4 text-center sm:px-6'>
            <h1 className='font-display text-4xl font-black uppercase tracking-display text-red-500 transition-colors hover:text-red-500 sm:text-5xl lg:text-6xl'>
              Red Clay Radio
            </h1>
          </Link>
          <nav className='flex flex-wrap items-center justify-center gap-4 px-4 pb-4 font-ui uppercase tracking-ui sm:gap-8 sm:px-6 sm:py-3 sm:pb-3'>
            {navLinks.map((link) => {
              const isActive = router.pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-bold transition-colors ${
                    isActive ? 'text-red-500' : 'text-stone-100 hover:text-red-500'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              type='button'
              onClick={() => setIsArtistModalOpen(true)}
              className='border border-red-500 px-3 py-1 text-lg font-bold text-red-500 transition-colors hover:bg-red-500 hover:text-stone-100'
            >
              Add Artist
            </button>
          </nav>
        </div>
      </header>
      <Modal isOpen={isArtistModalOpen} onClose={() => setIsArtistModalOpen(false)} title='Add Artist'>
        <AddArtistFlow onComplete={() => setIsArtistModalOpen(false)} onCancel={() => setIsArtistModalOpen(false)} />
      </Modal>
    </>
  );
}
