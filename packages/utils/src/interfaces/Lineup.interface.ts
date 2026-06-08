// Custom Modules
import type Artist from './Artist.interface';

/**
 * The station's running order for a single broadcast day, resolved for display.
 * `stages.main` and `stages.side` are the two acts currently on the stages (the
 * first two of the day's order); `onDeck` is everyone still queued behind them.
 * Any of these may be absent once the day's order is nearly exhausted or the
 * eligible pool is empty.
 */
export default interface Lineup {
  date: string;
  stages: {
    main: Artist | null;
    side: Artist | null;
  };
  onDeck: Artist[];
}
