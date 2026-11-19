'use client';

import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default function SignalerPage() {
  function submitReport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Préoccupation citoyenne - ${String(form.get('category'))}`;
    const body = [
      `Nom : ${form.get('name') || 'Anonyme'}`,
      `Téléphone : ${form.get('phone') || 'Non renseigné'}`,
      `E-mail : ${form.get('email') || 'Non renseigné'}`,
      `Territoire/Commune : ${form.get('location')}`,
      `Catégorie : ${form.get('category')}`,
      '',
      `Description :`,
      String(form.get('message')),
    ].join('\n');
    window.location.href = `mailto:info@interieur-kasaioriental.gouv.cd?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <SiteHeader />
      <main className="contact-page">
        <div className="page-shell contact-page__inner">
          <Link className="contact-page__back" href="/">← Retour à l&apos;accueil</Link>
          <span className="section-label">SIGNALER UNE PRÉOCCUPATION</span>
          <h1>Votre voix compte</h1>
          <p>Transmettez une préoccupation liée à la sécurité, à l’administration ou à la vie communautaire.</p>
          <form className="institution-form" onSubmit={submitReport}>
            <div className="institution-form__heading"><span>FORMULAIRE CITOYEN</span><h2>Faire un signalement</h2></div>
            <div className="institution-form__grid">
              <label>Nom complet (facultatif)<input name="name" /></label>
              <label>Territoire ou commune<input name="location" required /></label>
              <label>Adresse e-mail<input name="email" type="email" /></label>
              <label>Téléphone<input name="phone" type="tel" /></label>
              <label className="institution-form__wide">Nature de la préoccupation
                <select name="category" required>
                  <option value="">Sélectionner une catégorie</option>
                  <option>Sécurité des personnes</option>
                  <option>Ordre public</option>
                  <option>Conflit communautaire</option>
                  <option>Administration publique</option>
                  <option>Autorité coutumière</option>
                  <option>Autre préoccupation</option>
                </select>
              </label>
              <label className="institution-form__wide">Description précise<textarea name="message" rows={8} required /></label>
            </div>
            <button className="reference-button reference-button--red" type="submit">Envoyer le signalement <span aria-hidden="true">→</span></button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
