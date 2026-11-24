import type { Metadata } from 'next';
import ScrollPositionRestoration from './components/ScrollPositionRestoration';
import logo from '../images/RIJEC DESIGN (11).png';
import './globals.css';

export const metadata: Metadata = {
  title: "nod.jc — Ministère de l'intérieur du Kasai-Oriental",
  description: "Portail d'information publique claire et accessible.",
  icons: { icon: logo.src },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body>
        {children}
        <ScrollPositionRestoration />
      </body>
    </html>
  );
}
