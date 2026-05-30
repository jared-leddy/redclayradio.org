// Custom Modules
import StageSection from '@/components/organisms/StageSection';
import OnDeckBanner from '../components/molecules/OnDeckBanner';
import SongBanner from '../components/molecules/SongBanner';
import DateSection from '../components/organisms/DateSection';
import Footer from '../components/organisms/Footer';
import Header from '../components/organisms/Header';

export default function FutureHome() {
    return (
        <>
            <div className='w-full bg-red-900 text-stone-100 font-bold text-lg text-center uppercase py-2'>
                Notice: This station is not on the airwaves yet.
            </div>
            <Header />
            <DateSection />
            <StageSection />
            <SongBanner />
            <OnDeckBanner />
            <Footer />
        </>
    );
}
