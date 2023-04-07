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
      <body className="h-full">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
