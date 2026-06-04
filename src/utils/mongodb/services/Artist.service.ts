// NPM Modules
import type { HydratedDocument } from 'mongoose';

// Custom Modules
import type Artist from '@/utils/interfaces/Artist.interface';
import type ArtistCreate from '@/utils/interfaces/ArtistCreate.interface';
import { connectToDatabase } from '@/utils/mongodb/connection';
import ArtistModel from '@/utils/mongodb/models/Artist.model';

/**
 * Data-access layer for the Artist model. Every method opens (or reuses) the
 * singleton Mongoose connection before touching the collection, so the service
 * is safe to call from any serverless invocation or server-side render.
 *
 * Exported as a singleton instance — import it directly and call its methods.
 */
class ArtistService {
    /**
     * Persist a new artist and return the created document.
     */
    async create(data: ArtistCreate): Promise<HydratedDocument<Artist>> {
        await connectToDatabase();

        return ArtistModel.create(data);
    }

    /**
     * Return every artist in the collection.
     */
    async findAll(): Promise<HydratedDocument<Artist>[]> {
        await connectToDatabase();

        return ArtistModel.find().exec();
    }

    /**
     * Return a single artist by its `_id`, or `null` if none exists.
     */
    async findById(id: string): Promise<HydratedDocument<Artist> | null> {
        await connectToDatabase();

        return ArtistModel.findById(id).exec();
    }

    /**
     * Apply a partial update to an artist and return the updated document, or
     * `null` if no artist matched the given `_id`. `runValidators` re-applies
     * the schema's rules to the changed fields, which Mongoose skips by default
     * on updates.
     */
    async update(id: string, data: Partial<Artist>): Promise<HydratedDocument<Artist> | null> {
        await connectToDatabase();

        return ArtistModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
    }

    /**
     * Delete an artist by its `_id` and return the deleted document, or `null`
     * if none matched.
     */
    async delete(id: string): Promise<HydratedDocument<Artist> | null> {
        await connectToDatabase();

        return ArtistModel.findByIdAndDelete(id).exec();
    }
}

export default new ArtistService();
