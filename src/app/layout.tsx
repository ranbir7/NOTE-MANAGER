import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans, Playfair_Display } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { cn } from '@/src/lib/utils';

const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Note Manager',
  description: 'A secure task and note manager built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full antialiased',
        geistSans.variable,
        geistMono.variable,
        notoSans.variable,
        playfairDisplay.variable,
        'font-sans'
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
