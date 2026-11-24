'use client';

import { useState } from 'react';
import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default function SignalerPage() {
  const [error, setError] = useState('');

  async function submitReport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const image = form.get('image');
    if (image instanceof File && image.size > 5 * 1024 * 1024) {
      setError('L’image ne doit pas dépasser 5 Mo.');
      return;
    }
    if (image instanceof File && image.size > 0 && !image.type.startsWith('image/')) {
      setError('Le fichier sélectionné doit être une image.');
      return;
    }

    setError('');
    const subject = `Préoccupation citoyenne - ${String(form.get('category') ?? '')}`;
    const body = [
      `Nom : ${form.get('name')}`,
      `Téléphone : ${form.get('phone')}`,
      `E-mail : ${form.get('email')}`,
      `Territoire/Commune : ${form.get('location')}`,
      `Catégorie : ${form.get('category')}`,
      '',
      'Description :',
      String(form.get('message')),
      ...(image instanceof File && image.size > 0
        ? ['', `Image sélectionnée : ${image.name}`, 'Veuillez joindre cette image au courriel avant son envoi.']
        : []),
    ].join('\n');

    if (
      image instanceof File
      && image.size > 0
      && typeof navigator.canShare === 'function'
      && typeof navigator.share === 'function'
      && navigator.canShare({ files: [image] })
    ) {
      try {
        await navigator.share({ title: subject, text: body, files: [image] });
        return;
      } catch (shareError) {
        if (shareError instanceof DOMException && shareError.name === 'AbortError') return;
        console.error('Le partage du signalement avec image a échoué.', shareError);
        setError('Le partage de l’image a échoué. Réessayez ou envoyez le signalement sans image.');
        return;
      }
    }

    window.location.href = `mailto:info@interieur-kasaioriental.gouv.cd?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <SiteHeader />
      <main className="contact-page">
        <div className="page-shell contact-page__inner">
          <Link className="contact-page__back page-back-link" href="/">← Retour à l&apos;accueil</Link>
          <span className="section-label">SIGNALER UNE PRÉOCCUPATION</span>
          <h1>Votre voix compte</h1>
          <p>Transmettez une préoccupation liée à la sécurité, à l’administration ou à la vie communautaire.</p>
          <form className="institution-form" onSubmit={submitReport}>
            <div className="institution-form__heading"><span>FORMULAIRE CITOYEN</span><h2>Faire un signalement</h2></div>
            <div className="institution-form__grid">
              <label>Nom complet<input name="name" autoComplete="name" maxLength={120} required /></label>
              <label>Territoire ou commune<input name="location" maxLength={160} required /></label>
              <label>Adresse e-mail<input name="email" autoComplete="email" type="email" maxLength={254} required /></label>
              <label>Téléphone<input name="phone" autoComplete="tel" type="tel" maxLength={30} required /></label>
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
              <label className="institution-form__wide">Description précise<textarea name="message" rows={8} minLength={20} maxLength={5000} required /></label>
              <label className="institution-form__wide">Image (facultative, 5 Mo maximum)
                <input name="image" type="file" accept="image/*" />
                <span className="institution-form__hint">Sur les appareils compatibles, l’image est jointe au partage. Sinon, votre messagerie s’ouvrira et vous pourrez joindre le fichier avant d’envoyer.</span>
              </label>
            </div>
            {error && <p className="admin-error" role="alert">{error}</p>}
            <button className="reference-button reference-button--red" type="submit">Envoyer le signalement <span aria-hidden="true">→</span></button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
