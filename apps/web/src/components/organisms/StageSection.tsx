// NPM Modules
import { StageType } from '@redclayradio/utils/enums';
import type { Artist } from '@redclayradio/utils/interfaces';

// Custom Modules
import StageCard from '../molecules/StageCard';

type StageSectionProps = {
  main: Artist | null;
  side: Artist | null;
};

/**
 * The two on-air stages. `main` and `side` are the first two acts of the day's
 * running order; each renders only when present, so the section collapses
 * gracefully as the order is exhausted near the end of the broadcast day.
 */
export default function StageSection({ main, side }: StageSectionProps) {
  return (
    <section className='w-[92%] sm:w-8/10 mx-auto mt-2 grid grid-cols-1 gap-6 md:grid-cols-2'>
      {main && <StageCard artist={main} stageType={StageType.main} />}
      {side && <StageCard artist={side} stageType={StageType.side} />}
    </section>
  );
}
