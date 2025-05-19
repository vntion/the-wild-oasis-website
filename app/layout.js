import '@/app/_styles/globals.css';
import Head from 'netx/head'

import { Josefin_Sans } from 'next/font/google';
import Header from '@/app/_components/Header';
import { ReservationProvider } from '@/app/_components/ReservationContext';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

export const metadata = {
  // title: 'The Wild Oasis',
  title: {
    template: '%s / The Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
  description:
    'Luxurious cabin hotel, located in the heart of the Itailan DOlomites, surrounded by beautiful mountains and dark forests',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <Head>
      <meta name="google-site-verification" content="-WPZe8czrgD10tx1k7Phwq2cwaqL3quSwrXwnfomVmw" />
    </Head>
      <body
        className={`${josefin.className} antialiased relative flex flex-col bg-primary-950 text-primary-100 min-h-svh`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid w-full">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
