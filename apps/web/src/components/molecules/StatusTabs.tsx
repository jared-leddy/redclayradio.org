// Shared Modules
import { ArtistStatus } from '@redclayradio/utils/enums';

/**
 * Selected lineup filter: either a specific moderation status or `'all'`, which
 * shows every artist regardless of status.
 */
export type StatusFilter = ArtistStatus | 'all';

type StatusTabsProps = {
  active: StatusFilter;
  counts: Record<StatusFilter, number>;
  onChange: (filter: StatusFilter) => void;
};

/**
 * The ordered tab definitions: an "All" tab followed by one tab per moderation
 * status. The order here is the order the tabs render in.
 */
const tabs: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Approved', value: ArtistStatus.Approved },
  { label: 'Pending', value: ArtistStatus.Pending },
  { label: 'Rejected', value: ArtistStatus.Rejected }
];

/**
 * Horizontal tab strip for filtering the artist lineup by moderation status.
 * Each tab shows its matching artist count, and the active tab is highlighted.
 */
export default function StatusTabs({ active, counts, onChange }: StatusTabsProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      {tabs.map((tab) => {
        const isActive = tab.value === active;

        return (
          <button
            key={tab.value}
            type='button'
            onClick={() => onChange(tab.value)}
            className={`flex items-center gap-2 border px-4 py-2 font-ui text-sm uppercase tracking-ui transition-colors ${
              isActive
                ? 'border-red-900 bg-red-900 text-stone-100'
                : 'border-zinc-700 text-stone-300 hover:border-red-900 hover:text-red-700'
            }`}
          >
            {tab.label}
            <span className={isActive ? 'text-stone-100' : 'text-zinc-500'}>{counts[tab.value]}</span>
          </button>
        );
      })}
    </div>
  );
}
