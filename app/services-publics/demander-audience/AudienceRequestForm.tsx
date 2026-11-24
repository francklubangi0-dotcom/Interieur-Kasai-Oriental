'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getSupabaseClient } from '../../data/supabase';

export default function AudienceRequestForm() {
  const supabase = getSupabaseClient();
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setError('Le service de dépôt est momentanément indisponible. Réessayez ultérieurement.');
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const subject = String(formData.get('subject') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!email && !phone) {
      setError('Indiquez au moins une adresse courriel ou un numéro de téléphone.');
      return;
    }

    setSaving(true);
    setError('');
    setReference('');
    try {
      const { data, error: submissionError } = await supabase.rpc('submit_audience_request', {
        p_name: name,
        p_email: email || null,
        p_phone: phone || null,
        p_subject: subject,
        p_message: message,
      });
      if (submissionError) throw submissionError;
      if (typeof data !== 'string' || !data) {
        throw new Error('La référence de suivi est absente de la réponse.');
      }
      setReference(data);
      form.reset();
    } catch (submissionError) {
      console.error('Le dépôt de la demande d’audience a échoué.', submissionError);
      setError('Votre demande n’a pas pu être envoyée. Vérifiez votre connexion ou réessayez plus tard.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="audience-form-card" aria-label="Formulaire de demande d’audience">
      {!supabase ? (
        <p className="audience-form__error" role="alert">
          Le service de dépôt n’est pas encore configuré. Veuillez réessayer ultérieurement.
        </p>
      ) : (
        <form onSubmit={submit}>
          <div className="audience-form-grid">
            <label>
              Nom complet
              <input name="name" autoComplete="name" maxLength={120} required />
            </label>
            <label>
              Adresse courriel <span aria-hidden="true">(facultatif)</span>
              <input name="email" type="email" autoComplete="email" maxLength={254} />
            </label>
            <label className="audience-form-grid__wide">
              Téléphone <span aria-hidden="true">(facultatif)</span>
              <input name="phone" type="tel" autoComplete="tel" maxLength={30} aria-describedby="audience-contact-hint" />
              <span className="audience-form__hint" id="audience-contact-hint">Au moins une adresse courriel ou un numéro de téléphone est requis.</span>
            </label>
            <label className="audience-form-grid__wide">
              Objet de la demande
              <input name="subject" maxLength={160} required />
            </label>
            <label className="audience-form-grid__wide">
              Message
              <textarea name="message" minLength={20} maxLength={5000} required />
            </label>
          </div>
          {error && <p className="audience-form__error" role="alert">{error}</p>}
          {reference && (
            <div className="audience-form__success" role="status" aria-live="polite">
              Votre demande a bien été enregistrée. Conservez ce numéro de suivi :
              <strong className="audience-form__reference">{reference}</strong>
              <div className="audience-form__actions">
                <Link className="underlined-link" href={`/services-publics/suivi-audience?reference=${encodeURIComponent(reference)}`}>
                  Suivre cette demande <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          )}
          <div className="audience-form__actions">
            <button className="reference-button" type="submit" disabled={saving}>
              {saving ? 'Envoi en cours…' : 'Envoyer la demande'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
