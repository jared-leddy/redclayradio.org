import OnDeckBanner from '../components/molecules/OnDeckBanner';
import SongBanner from '../components/molecules/SongBanner';
import StageCard from '../components/molecules/StageCard';
import Footer from '../components/organisms/Footer';
import Header from '../components/organisms/Header';

export default function Home() {
    return (
        <>
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
