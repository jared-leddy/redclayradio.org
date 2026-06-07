// NPM Modules
import type { OnDeckListItem } from '@redclayradio/utils/interfaces';

// Custom Modules
import StageSection from '@/components/organisms/StageSection';
import PageLayout from '@/components/templates/PageLayout';
import OnDeckBanner from '../components/molecules/OnDeckBanner';
import SongBanner from '../components/molecules/SongBanner';
import DateSection from '../components/organisms/DateSection';

const onDeck: OnDeckListItem[] = [
  { artist: 'Knocked Loose', genre: 'Metalcore' },
  { artist: 'Turnstile', genre: 'Hardcore' },
  { artist: 'Chelsea Wolfe', genre: 'Darkwave' },
  { artist: 'Loathe', genre: 'Alternative Metal' },
  { artist: 'JPEGMAFIA', genre: 'Experimental Hip-Hop' },
  { artist: 'VOLA', genre: 'Progressive Metal' },
  { artist: 'HEALTH', genre: 'Industrial' },
  { artist: 'Bad Omens', genre: 'Alternative Metal' },
  { artist: 'JPEGMAFIA', genre: 'Experimental Hip-Hop' },
  { artist: 'VOLA', genre: 'Progressive Metal' },
  { artist: 'HEALTH', genre: 'Industrial' },
  { artist: 'Bad Omens', genre: 'Alternative Metal' }
];

export default function FutureHome() {
  return (
    <PageLayout>
      <DateSection />
      <StageSection />
      <SongBanner />
      <OnDeckBanner items={onDeck} />
    </PageLayout>
  );
}
