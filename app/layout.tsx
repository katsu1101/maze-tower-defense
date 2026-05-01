import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Maze Tower Defense',
  description: 'Next.js + TypeScript + Phaser prototype',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
