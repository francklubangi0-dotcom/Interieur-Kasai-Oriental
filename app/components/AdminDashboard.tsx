'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSupabaseClient } from '../data/supabase';
import AudienceRequestsAdmin from './AudienceRequestsAdmin';
import NewsAdminForm from './NewsAdminForm';
import UrgentAdminForm from './UrgentAdminForm';

type AccessState = 'loading' | 'signed-out' | 'checking' | 'admin' | 'denied';

export default function AdminDashboard() {
  const supabase = getSupabaseClient();
  const [access, setAccess] = useState<AccessState>(supabase ? 'loading' : 'denied');
  const [email, setEmail] = useState<string | null>(null);
  const [tab, setTab] = useState<'news' | 'notices' | 'audiences'>('news');
  const [message, setMessage] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    let active = true;
    let sessionVersion = 0;
    const pendingChecks = new Set<number>();

    async function evaluateSession(session: { user: { email?: string } } | null, version: number) {
      if (!active || version !== sessionVersion) return;
      setEmail(session?.user.email ?? null);
      if (!session) {
        setAccess('signed-out');
        return;
      }

      setAccess('checking');
      try {
        const { data, error } = await client.rpc('is_admin');
        if (!active || version !== sessionVersion) return;
        if (error) {
          console.error('La vérification du rôle administrateur a échoué.', error);
          setMessage('Le rôle administrateur n’a pas pu être vérifié. Réessayez ou contactez le responsable du site.');
          setAccess('denied');
          return;
        }
        setAccess(data ? 'admin' : 'denied');
        setMessage(data ? '' : 'Ce compte est connecté, mais n’a pas les droits de publication.');
      } catch (error) {
        console.error('La vérification du rôle administrateur a échoué.', error);
        if (!active || version !== sessionVersion) return;
        setMessage('Le rôle administrateur n’a pas pu être vérifié. Réessayez ou contactez le responsable du site.');
        setAccess('denied');
      }
    }

    client.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('La session administrateur n’a pas pu être vérifiée.', error);
        if (active) {
          setMessage('La session administrateur n’a pas pu être vérifiée. Rechargez la page.');
          setAccess('signed-out');
        }
        return;
      }
      if (active) void evaluateSession(data.session, ++sessionVersion);
    }).catch((error: unknown) => {
      console.error('La session administrateur n’a pas pu être vérifiée.', error);
      if (active) {
        setMessage('La session administrateur n’a pas pu être vérifiée. Rechargez la page.');
        setAccess('signed-out');
      }
    });

    const { data: authListener } = client.auth.onAuthStateChange((_event, session) => {
      const version = ++sessionVersion;
      setAccess(session ? 'checking' : 'signed-out');
      const timerId = window.setTimeout(() => {
        pendingChecks.delete(timerId);
        if (active) void evaluateSession(session, version);
      }, 0);
      pendingChecks.add(timerId);
    });

    return () => {
      active = false;
      pendingChecks.forEach((timerId) => window.clearTimeout(timerId));
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setLoginError('');
    setMessage('');
    const formData = new FormData(event.currentTarget);
    const emailValue = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: emailValue, password });
      if (error) throw error;
    } catch (error) {
      console.error('La connexion administrateur a échoué.', error);
      setLoginError('Connexion impossible. Vérifiez vos identifiants ou contactez le responsable du site.');
    }
  }

  async function signOut() {
    if (!supabase) return;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('La déconnexion administrateur a échoué.', error);
      setMessage('La déconnexion a échoué. Fermez la session puis réessayez.');
    }
  }

  if (!supabase) {
    return (
      <main className="admin-page">
        <section className="admin-setup-card">
          <span className="section-label">ESPACE ADMINISTRATEUR</span>
          <h1>Configuration Supabase requise</h1>
          <p>Renseignez l’URL du projet et sa clé publique dans les variables d’environnement, puis appliquez la migration SQL indiquée dans le guide d’installation.</p>
          <Link className="admin-secondary-button page-back-link" href="/">Retour au site</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <div>
            <span className="section-label">MINISTÈRE DE L’INTÉRIEUR</span>
            <h1>Espace de publication</h1>
            <p>Gestion des actualités, des avis urgents et des demandes d’audience.</p>
          </div>
          <Link className="admin-secondary-button page-back-link" href="/">← Voir le site</Link>
        </header>

        {message && <p className="admin-message" role="status">{message}</p>}

        {access === 'loading' || access === 'checking' ? (
          <p className="admin-loading" role="status">Vérification de vos droits…</p>
        ) : access === 'signed-out' ? (
          <form className="admin-login" onSubmit={signIn}>
            <span className="section-label">CONNEXION SÉCURISÉE</span>
            <h2>Accès administrateur</h2>
            <label>
              Adresse courriel
              <input name="email" type="email" autoComplete="username" required />
            </label>
            <label>
              Mot de passe
              <input name="password" type="password" autoComplete="current-password" required />
            </label>
            {loginError && <p className="admin-error" role="alert">{loginError}</p>}
            <button className="admin-primary-button" type="submit">Se connecter</button>
          </form>
        ) : access === 'denied' ? (
          <section className="admin-login">
            <span className="section-label">ACCÈS RESTREINT</span>
            <h2>Compte non autorisé</h2>
            <p>{email ? `Compte connecté : ${email}.` : 'Connectez-vous avec un compte administrateur autorisé.'}</p>
            {email && <button className="admin-secondary-button" type="button" onClick={signOut}>Se déconnecter</button>}
          </section>
        ) : (
          <>
            <div className="admin-session-bar">
              <span>Connecté : <strong>{email}</strong></span>
              <button className="admin-secondary-button" type="button" onClick={signOut}>Se déconnecter</button>
            </div>
            <div className="admin-tabs" role="tablist" aria-label="Contenus à gérer">
              <button type="button" role="tab" aria-selected={tab === 'news'} onClick={() => setTab('news')}>Actualités</button>
              <button type="button" role="tab" aria-selected={tab === 'notices'} onClick={() => setTab('notices')}>Avis urgents</button>
              <button type="button" role="tab" aria-selected={tab === 'audiences'} onClick={() => setTab('audiences')}>Demandes d’audience</button>
            </div>
            {tab === 'news' ? <NewsAdminForm /> : tab === 'notices' ? <UrgentAdminForm /> : <AudienceRequestsAdmin />}
          </>
        )}
      </div>
    </main>
  );
}
