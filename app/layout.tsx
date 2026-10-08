import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { AppProvider } from '../components/AppProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'ProofHire — Stop sending CVs. Start showing proof.',
  description:
    'Verified talent profiles for developers: skill tests, live project badges and recruiter search in plain words. Demo by AKCLNT.',
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('proofhire-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <Script id="proofhire-theme-init" strategy="beforeInteractive">
          {THEME_INIT}
        </Script>
        <AppProvider>
          <Header />
          <main className="mx-auto min-h-[70vh] w-full max-w-6xl px-4 pt-8">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
