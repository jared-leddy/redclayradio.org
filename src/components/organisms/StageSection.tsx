// Custom Modules
import type { StageType } from '@/utils/enums/StageType.enum';
import StageCard from '../molecules/StageCard';

export default function StageSection() {
    return (
        <section className='w-8/10 mx-auto mt-2 grid grid-cols-2 gap-6'>
            <StageCard
                stage={{
                    artist: 'Deftones',
                    genres: ['Alternative Metal', 'Nu Metal', 'Shoegaze'],
                    location: 'Sacramento, CA, USA',
                    playerURL: 'https://open.spotify.com/embed/artist/6Ghvu1VvMGScGpOUJBAHNH?theme=0',
                    stageType: 'main' as StageType,
                }}
            />
            <StageCard
                stage={{
                    artist: 'Thursday',
                    genres: ['Hardcore', 'Metalcore', 'Industrial'],
                    location: 'New Brunswick, NJ, USA',
                    playerURL: 'https://open.spotify.com/artist/61awhbNK16ku1uQyXRsQj5?theme=0',
                    stageType: 'side' as StageType,
                }}
            />
        </section>
    );
}
