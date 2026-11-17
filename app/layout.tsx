import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'nod.jc — Portail institutionnel',
  description: "Portail d'information publique claire et accessible.",
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
