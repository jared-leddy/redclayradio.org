// NPM Modules
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Server-side proxy between the web client and the Red Clay Radio API. The
 * browser only ever calls same-origin `/api/*` routes; this handler runs in
 * Node, forwards each request to the backend at `API_URL`, and injects the
 * `redclayradio-api-key` header from the server-only `API_KEY` secret — so the
 * key is never shipped to the browser. The backend's status and JSON body are
 * passed back through verbatim.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path, ...query } = req.query;
  const segments = Array.isArray(path) ? path.join('/') : (path ?? '');

  const response = await axios({
    method: req.method,
    url: `${process.env.API_URL}/${segments}`,
    headers: { 'redclayradio-api-key': process.env.API_KEY },
    params: query,
    data: req.body,
    // Forward the backend's response as-is rather than throwing on non-2xx.
    validateStatus: () => true
  });

  res.status(response.status).json(response.data);
}
