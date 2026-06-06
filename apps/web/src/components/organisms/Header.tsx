// NPM Modules
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const today = new Date()
    .toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    .toUpperCase();

  return (
    <header className='w-8/10 mx-auto border border-red-900 bg-zinc-950'>
      <div className='flex flex-col items-center justify-center gap-2 px-6 py-4 font-ui uppercase tracking-ui sm:flex-row sm:justify-between'>
        <div className='flex items-center gap-2'>
          <span className='h-3 w-3 animate-pulse rounded-full bg-red-700' />
          <span className='text-xl font-bold text-red-800'>On Air</span>
          <span className='text-stone-500'>&middot;</span>
          <span className='text-sm text-stone-100'>From the Carolinas</span>
        </div>
        <p className='font-mono text-lg tracking-mono text-stone-100'>{today}</p>
      </div>
      <div className='flex items-center justify-between border-t border-red-900'>
        <Link href='/' className='block px-6 pt-4 text-center'>
          <h1 className='font-display text-6xl font-black uppercase tracking-display text-red-800 transition-colors hover:text-red-700'>
            Red Clay Radio
          </h1>
        </Link>
        <nav className='flex items-center justify-center gap-8 px-6 py-3 font-ui uppercase tracking-ui'>
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-bold transition-colors ${
                  isActive ? 'text-red-700' : 'text-stone-100 hover:text-red-700'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
