// Custom Modules
import { StageType } from '@/utils/enums/StageType.enum';
import StageCard from '../molecules/StageCard';
import { PlayerType } from '@/utils/enums/PlayerType.enum';

export default function StageSection() {
    return (
        <section className='w-8/10 mx-auto mt-2 grid grid-cols-2 gap-6'>
            <StageCard
                stage={{
                    artist: 'Deftones',
                    genres: ['Alternative Metal', 'Nu Metal', 'Shoegaze'],
                    location: 'Sacramento, California, USA',
                    playerType: 'spotify' as PlayerType,
                    playerURL: 'https://open.spotify.com/embed/artist/6Ghvu1VvMGScGpOUJBAHNH?theme=0',
                    stageType: 'main' as StageType,
                }}
            />
            <StageCard
                stage={{
                    artist: 'Code Orange',
                    genres: ['Hardcore', 'Metalcore', 'Industrial'],
                    location: 'Pittsburgh, Pennsylvania, USA',
                    playerType: 'youtube' as PlayerType,
                    playerURL:
                        'https://www.youtube.com/embed/videoseries?si=sg9OnYy4ajCStjuH&amp;list=PLFX2XrrafiGz7wABBQmPV0MuUJ3AocTLW',
                    stageType: 'side' as StageType,
                }}
            />
        </section>
    );
}
