// NPM Modules
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='antialiased bg-zinc-950 text-stone-100'>
        <div className='w-full bg-red-900 text-stone-100 font-bold text-lg text-center uppercase py-2'>
          Notice: This station is not on the airwaves yet.
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
