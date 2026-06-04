// NPM Modules
import type { NextApiRequest, NextApiResponse } from 'next';

// Custom Modules
import { connectToDatabase } from '@/utils/mongodb/connection';

type Data = { status: 'ok'; database: string | undefined; readyState: number } | { status: 'error'; message: string };

/**
 * Connectivity probe. Hit `/api/db-health` in the browser to confirm the
 * Mongoose connection opens against the configured database.
 */
export default async function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const connection = await connectToDatabase();

        res.status(200).json({
            status: 'ok',
            database: connection.connection.name,
            // 1 === connected.
            readyState: connection.connection.readyState,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
