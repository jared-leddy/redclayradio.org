// NPM Modules
import axios from 'axios';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

// Shared Modules
import type { Lineup, Song } from '@redclayradio/utils/interfaces';

// Custom Modules
import StageSection from '@/components/organisms/StageSection';
import PageLayout from '@/components/templates/PageLayout';
import OnDeckBanner from '../components/molecules/OnDeckBanner';
import SongBanner from '../components/molecules/SongBanner';
import DateSection from '../components/organisms/DateSection';

/**
 * Public home page. The running order and song of the day are resolved
 * server-side on every request (uncached), so each load reflects the current two
 * stages, on-deck list, and featured song as the API's rotation advances.
 */
export default function FutureHome({ lineup, song }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PageLayout>
      <DateSection />
      <StageSection main={lineup.stages.main} side={lineup.stages.side} />
      <SongBanner song={song} />
      <OnDeckBanner items={lineup.onDeck} />
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{ lineup: Lineup; song: Song | null }> = async () => {
  const headers = { 'redclayradio-api-key': process.env.API_KEY };

  const [lineupResponse, songResponse] = await Promise.all([
    axios<{ data: Lineup }>({ method: 'get', url: `${process.env.API_URL}/lineup`, headers }),
    axios<{ data: Song | null }>({ method: 'get', url: `${process.env.API_URL}/song`, headers })
  ]);

  return { props: { lineup: lineupResponse.data.data, song: songResponse.data.data } };
};
