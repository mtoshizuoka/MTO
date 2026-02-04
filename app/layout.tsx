import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MTO配送管理システム',
  description: '配送管理システム',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
