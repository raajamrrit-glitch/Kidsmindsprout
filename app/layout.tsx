import type { Metadata } from 'next';
import { Nunito, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const headingFont = Nunito({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

const bodyFont = Plus_Jakarta_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'KidsMindSprout | Personalized AI Storybooks for Children',
  description:
    'Premium personalized children\'s storybooks in India, where every child becomes the hero of their own adventure.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  );
}
