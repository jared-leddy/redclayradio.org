// NPM Modules
import axios from 'axios';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

// Shared Modules
import type { Lineup } from '@redclayradio/utils/interfaces';

// Custom Modules
import StageSection from '@/components/organisms/StageSection';
import PageLayout from '@/components/templates/PageLayout';
import OnDeckBanner from '../components/molecules/OnDeckBanner';
import SongBanner from '../components/molecules/SongBanner';
import DateSection from '../components/organisms/DateSection';

/**
 * Public home page. The running order is resolved server-side on every request
 * (uncached), so each load reflects the current two stages and on-deck list as
 * the API's hourly rotation advances.
 */
export default function FutureHome({ lineup }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PageLayout>
      <DateSection />
      <StageSection main={lineup.stages.main} side={lineup.stages.side} />
      <SongBanner />
      <OnDeckBanner items={lineup.onDeck} />
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{ lineup: Lineup }> = async () => {
  const response = await axios<{ data: Lineup }>({
    method: 'get',
    url: `${process.env.API_URL}/lineup`,
    headers: { 'redclayradio-api-key': process.env.API_KEY }
  });

  return { props: { lineup: response.data.data } };
};
