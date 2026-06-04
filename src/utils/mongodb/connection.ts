// NPM Modules
import mongoose, { type Mongoose } from 'mongoose';

if (!process.env.MONGODB_URL) {
    throw new Error('Missing MONGODB_URL environment variable. Add it to DOTENV file.');
}

// Bound after the guard so the type is `string`, not `string | undefined`.
// A plain narrowed `const` would lose that narrowing inside the async closure.
const MONGODB_URL: string = process.env.MONGODB_URL;

/**
 * Shape of the cached connection stored on `globalThis`.
 *
 * `promise` holds the in-flight connection attempt so that concurrent callers
 * await the same handshake instead of each opening their own socket.
 */
interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

declare global {
    // Persisted across module reloads — see `cached` below.
    var mongooseCache: MongooseCache | undefined;
}

/**
 * Next.js re-evaluates server modules on every HMR reload in dev, and each
 * serverless invocation in prod is a fresh module scope. Caching the connection
 * on `globalThis` is what stops either case from opening a new connection on
 * every request and exhausting the database's connection pool.
 */
const cached: MongooseCache = global.mongooseCache ?? {
    conn: null,
    promise: null,
};

global.mongooseCache = cached;

/**
 * Returns a singleton Mongoose connection, opening it on first call and
 * reusing it thereafter. Call this at the top of any API route or server-side
 * function before touching a model.
 */
export async function connectToDatabase(): Promise<Mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, {
            // Surface connection errors immediately instead of silently queueing
            // operations against a database that may never connect.
            bufferCommands: false,
            dbName: process.env.MONGODB_NAME,
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        // Clear the rejected promise so the next call retries the connection.
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}
