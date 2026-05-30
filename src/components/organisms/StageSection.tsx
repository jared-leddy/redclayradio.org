// Custom Modules
import { StageType } from '@/utils/enums/StageType.enum';
import StageCard from '../molecules/StageCard';

export default function StageSection() {
    return (
        <section className='w-8/10 mx-auto mt-2 grid grid-cols-2 gap-6'>
            <StageCard
                stage={{
                    artist: 'Deftones',
                    genres: ['Alternative Metal', 'Nu Metal', 'Shoegaze'],
                    location: 'Sacramento, California, USA',
                    stage: 'main' as StageType,
                }}
            >
                <iframe
                    data-testid='embed-iframe'
                    className='rounded-xl'
                    src='https://open.spotify.com/embed/artist/6Ghvu1VvMGScGpOUJBAHNH?utm_source=generator'
                    width='100%'
                    height='352'
                    allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                    loading='lazy'
                ></iframe>
            </StageCard>
            <StageCard
                stage={{
                    artist: 'Code Orange',
                    genres: ['Hardcore', 'Metalcore', 'Industrial'],
                    location: 'Pittsburgh, Pennsylvania, USA',
                    stage: 'side' as StageType,
                }}
            >
                <iframe
                    data-testid='embed-iframe'
                    className='rounded-xl'
                    src='https://open.spotify.com/embed/artist/6Ghvu1VvMGScGpOUJBAHNH?utm_source=generator'
                    width='100%'
                    height='352'
                    allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                    loading='lazy'
                ></iframe>
            </StageCard>
        </section>
    );
}
