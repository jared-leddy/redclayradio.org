// NPM Modules
import axios from 'axios';

/**
 * Pre-configured Axios instance for the web client. Requests target the
 * same-origin `/api` proxy (see `pages/api/[...path].ts`), which forwards them
 * to the Red Clay Radio API with the `redclayradio-api-key` header injected
 * server-side — so the key never ships to the browser and callers never set it.
 * Use the config-object call form, e.g.
 * `HTTPService<{ data: Artist }>({ method: 'post', url: '/artist', data })`.
 */
const HTTPService = axios.create({
  baseURL: '/api'
});

export default HTTPService;
