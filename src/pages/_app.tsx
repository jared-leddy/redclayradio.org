// NPM Modules
import type { AppProps } from 'next/app';

// Custom Modules
import '@/src/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
