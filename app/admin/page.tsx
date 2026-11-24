import type { Metadata } from 'next';
import AdminDashboard from '../components/AdminDashboard';

export const metadata: Metadata = {
  title: 'Espace administrateur — Ministère de l’Intérieur',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
