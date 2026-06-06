// Custom Modules
import ArtistTable from '@/components/organisms/ArtistTable';
import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';
import mockArtists from '@/data/mockArtists';

/**
 * Lineup admin view: the full artist roster in a status-filterable table.
 * Currently backed by {@link mockArtists}; swap the data source for the
 * `/artist` API once the web client is wired to the backend.
 */
export default function Lineup() {
  return (
    <>
      <Header />
      <section className='w-8/10 mx-auto my-8'>
        <h2 className='font-display text-7xl font-black uppercase tracking-display text-orange-100'>Artist Lineup</h2>
        <hr className='mt-4 border-t border-red-900' />
      </section>
      <ArtistTable artists={mockArtists} />
      <Footer />
    </>
  );
}
