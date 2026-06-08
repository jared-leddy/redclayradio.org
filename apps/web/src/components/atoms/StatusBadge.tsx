// Shared Modules
import { ArtistStatus } from '@redclayradio/utils/enums';

type StatusBadgeProps = {
  status: ArtistStatus;
};

/**
 * Tailwind border/text classes for each moderation status, keeping the
 * approved/pending/rejected colors consistent everywhere a badge is rendered.
 */
const statusStyles: Record<ArtistStatus, string> = {
  [ArtistStatus.Approved]: 'border-green-600 text-green-500',
  [ArtistStatus.Pending]: 'border-yellow-600 text-yellow-500',
  [ArtistStatus.Rejected]: 'border-red-500 text-red-500'
};

/**
 * Small uppercase pill displaying an Artist's moderation status, color-coded by
 * {@link statusStyles}.
 */
export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-block border px-2 py-1 font-ui text-xs uppercase tracking-ui ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
