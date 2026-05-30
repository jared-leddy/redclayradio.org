import OnDeckBanner from '../components/molecules/OnDeckBanner';
import SongBanner from '../components/molecules/SongBanner';
import StageCard from '../components/molecules/StageCard';
import Footer from '../components/organisms/Footer';
import Header from '../components/organisms/Header';

export default function FutureHome() {
    return (
        <>
            <div className='w-full bg-red-900 text-stone-100 font-bold text-lg text-center uppercase py-2'>
                Notice: This station is not on the airwaves yet.
            </div>
            <Header />
            <section>
                <h1>Date Section</h1>
            </section>
            <section>
                <h1>Stages Section</h1>
                <StageCard />
                <StageCard />
            </section>
            <section>
                <SongBanner />
            </section>
            <section>
                <OnDeckBanner />
            </section>
            <Footer />
        </>
    );
}
