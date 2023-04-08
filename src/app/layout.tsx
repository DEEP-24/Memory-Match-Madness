/* eslint-disable @next/next/no-img-element */
import '~/styles/globals.css';
import { ToastProvider } from '../utils/toaster';
import { Roboto } from 'next/font/google';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

const specialFont = Roboto({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-specialFont',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`h-full ${specialFont.variable} font-header`}>
      <body className="h-full relative isolate">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src="/assets/background.png" alt="background-image" />
          <div className="absolute inset-0 bg-black/90"></div>
        </div>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
