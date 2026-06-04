// NPM Modules
import type { AppProps } from 'next/app';

// Custom Modules
import '@/assets/css/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
