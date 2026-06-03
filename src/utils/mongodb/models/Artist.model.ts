// NPM Modules
import { type Model, model, models, Schema } from 'mongoose';

// Custom Modules
import { PlayerType } from '@/utils/enums/PlayerType.enum';
import type Artist from '@/utils/interfaces/Artist.interface';

/**
 * Mongoose schema for the `artists` collection. Typed as `Schema<Artist>` so
 * the compiler enforces that this definition stays in sync with the Artist
 * interface, which is the single source of truth for the document shape.
 */
const ArtistSchema = new Schema<Artist>({
    genres: { type: [String], required: true },
    location: { type: String, required: true },
    name: { type: String, required: true },
    playerType: { type: String, enum: Object.values(PlayerType), required: true },
    playerURL: { type: String, required: true },
});

/**
 * Reuse the already-registered model on HMR reloads; only compile it the first
 * time. Without this guard, Next.js dev reloads throw
 * `OverwriteModelError: Cannot overwrite 'Artist' model once compiled`.
 */
const ArtistModel: Model<Artist> = models.Artist ?? model<Artist>('Artist', ArtistSchema);

export default ArtistModel;
