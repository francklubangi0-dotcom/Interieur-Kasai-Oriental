'use client';

import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default function ContactPage() {
  function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Contact institutionnel - ${String(form.get('subject') || 'Demande')}`;
    const body = [
      `Nom : ${form.get('name')}`,
      `Organisation : ${form.get('organization') || 'Non renseignée'}`,
      `Téléphone : ${form.get('phone') || 'Non renseigné'}`,
      `E-mail : ${form.get('email')}`,
      `Objet : ${form.get('subject')}`,
      '',
      `Message :`,
      String(form.get('message')),
    ].join('\n');
    window.location.href = `mailto:info@interieur-kasaioriental.gouv.cd?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <SiteHeader activeItem="CONTACT" />
      <main className="contact-page">
        <div className="page-shell contact-page__inner">
          <Link className="contact-page__back" href="/">← Retour à l&apos;accueil</Link>
          <span className="section-label">NOUS CONTACTER</span>
          <h1>Contact</h1>
          <p>Le Ministère de l&apos;Intérieur du Kasaï-Oriental reste à votre disposition.</p>
          <div className="contact-page__grid">
            <section>
              <h2>Adresse</h2>
              <address>
                Ancien gouvernorat, sise 001, Avenue Kasengulu,<br />
                Quartier Bubanji, Commune de Diulu Mbujimayi,<br />
                République démocratique du Congo
              </address>
            </section>
            <section>
              <h2>Courriel</h2>
              <a href="mailto:info@interieur-kasaioriental.gouv.cd">info@interieur-kasaioriental.gouv.cd</a>
            </section>
            <section>
              <h2>Réseaux sociaux</h2>
              <a href="https://web.facebook.com/profile.php?id=100069779207602" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://x.com/patrickmakanda0?s=11" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
            </section>
          </div>
          <form className="institution-form" onSubmit={submitContact}>
            <div className="institution-form__heading"><span>ÉCRIVEZ-NOUS</span><h2>Envoyer une demande</h2></div>
            <div className="institution-form__grid">
              <label>Nom complet<input name="name" required /></label>
              <label>Organisation<input name="organization" /></label>
              <label>Adresse e-mail<input name="email" type="email" required /></label>
              <label>Téléphone<input name="phone" type="tel" /></label>
              <label className="institution-form__wide">Objet
                <select name="subject" required>
                  <option value="">Sélectionner un objet</option>
                  <option>Demande d’information</option>
                  <option>Partenariat institutionnel</option>
                  <option>Courrier administratif</option>
                  <option>Autre demande</option>
                </select>
              </label>
              <label className="institution-form__wide">Message<textarea name="message" rows={7} required /></label>
            </div>
            <button className="reference-button" type="submit">Envoyer le message <span aria-hidden="true">→</span></button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
