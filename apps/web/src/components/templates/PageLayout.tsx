// NPM Modules
import type { ReactNode } from 'react';

// Custom Modules
import Footer from '../organisms/Footer';
import Header from '../organisms/Header';

type PageLayoutProps = {
  children: ReactNode;
};

/**
 * Standard page shell: the site {@link Header} above the page content and the
 * {@link Footer} below it. Wrap a page's body in this so the header/footer chrome
 * stays consistent across routes.
 */
export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
