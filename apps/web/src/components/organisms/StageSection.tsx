// NPM Modules
import { ArtistStatus, type StageType } from '@redclayradio/utils';

// Custom Modules
import StageCard from '../molecules/StageCard';

export default function StageSection() {
  return (
    <section className='w-8/10 mx-auto mt-2 grid grid-cols-2 gap-6'>
      <StageCard
        artist={{
          genres: ['Alternative Metal', 'Nu Metal', 'Shoegaze'],
          isActive: true,
          location: 'Sacramento, CA, USA',
          name: 'Deftones',
          playerURL: 'https://open.spotify.com/embed/artist/6Ghvu1VvMGScGpOUJBAHNH?theme=0',
          status: ArtistStatus.Approved
        }}
        stageType={'main' as StageType}
      />
      <StageCard
        artist={{
          genres: ['Hardcore', 'Metalcore', 'Industrial'],
          isActive: true,
          location: 'New Brunswick, NJ, USA',
          name: 'Thursday',
          playerURL: 'https://open.spotify.com/artist/61awhbNK16ku1uQyXRsQj5?theme=0',
          status: ArtistStatus.Approved
        }}
        stageType={'side' as StageType}
      />
    </section>
  );
}
