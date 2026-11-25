'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSupabaseClient, type AudienceRequestStatus } from '../../data/supabase';

const statusLabels: Record<AudienceRequestStatus, string> = {
  received: 'Demande reçue',
  in_progress: 'En cours de traitement',
  processed: 'Traitée',
};

function isAudienceRequestStatus(value: string): value is AudienceRequestStatus {
  return value === 'received' || value === 'in_progress' || value === 'processed';
}

export default function AudienceRequestTracking() {
  const supabase = getSupabaseClient();
  const [reference, setReference] = useState('');
  const [status, setStatus] = useState<AudienceRequestStatus | null>(null);
  const [updatedAt, setUpdatedAt] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialReference = new URLSearchParams(window.location.search).get('reference');
    if (initialReference) setReference(initialReference);
  }, []);

  async function lookup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setError('Le service de suivi est momentanément indisponible.');
      return;
    }

    setLoading(true);
    setError('');
    setStatus(null);
    setUpdatedAt('');
    try {
      const { data, error: lookupError } = await supabase.rpc('get_audience_request_status', {
        p_tracking_code: reference.trim().toUpperCase(),
      });
      if (lookupError) throw lookupError;
      const result = data?.[0];
      if (!result || !isAudienceRequestStatus(result.status)) {
        setError('Aucune demande trouvée pour ce numéro. Vérifiez-le et réessayez.');
        return;
      }
      setStatus(result.status);
      setUpdatedAt(result.updated_at);
    } catch (lookupError) {
      console.error('La consultation du suivi de la demande a échoué.', lookupError);
      setError('Le statut n’a pas pu être consulté. Réessayez ultérieurement.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="audience-tracking-card" aria-label="Consultation du statut d’une demande">
      {!supabase && (
        <p className="audience-form__error" role="alert">
          Le suivi en ligne n’est pas encore disponible. <Link href="/contact">Contactez le Ministère</Link> pour vous renseigner.
        </p>
      )}
      <form onSubmit={lookup}>
        <fieldset disabled={!supabase} className="audience-form__fields">
            <label className="audience-form-grid__wide">
              Numéro de suivi
              <input
                autoComplete="off"
                maxLength={40}
                onChange={(event) => setReference(event.target.value.toUpperCase())}
                placeholder="AUD-…"
                required
                value={reference}
              />
            </label>
            {error && <p className="audience-form__error" role="alert">{error}</p>}
            <div className="audience-form__actions">
              <button className="reference-button" type="submit" disabled={loading}>
                {loading ? 'Recherche…' : 'Consulter le statut'}
              </button>
            </div>
        </fieldset>
      </form>
      {status && (
        <div className="audience-status-result" role="status" aria-live="polite">
          <strong>{statusLabels[status]}</strong>
          <span>Dernière mise à jour : <time dateTime={updatedAt}>{new Date(updatedAt).toLocaleString('fr-CD')}</time></span>
        </div>
      )}
    </section>
  );
}
