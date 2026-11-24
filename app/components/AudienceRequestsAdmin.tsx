'use client';

import { useEffect, useState } from 'react';
import {
  getSupabaseClient,
  loadAdminAudienceRequests,
  subscribeToCmsTable,
  type AudienceRequestRow,
  type AudienceRequestStatus,
} from '../data/supabase';

const statusLabels: Record<AudienceRequestStatus, string> = {
  received: 'Reçue',
  in_progress: 'En cours',
  processed: 'Traitée',
};

function isAudienceRequestStatus(value: string): value is AudienceRequestStatus {
  return value === 'received' || value === 'in_progress' || value === 'processed';
}

export default function AudienceRequestsAdmin() {
  const supabase = getSupabaseClient();
  const [requests, setRequests] = useState<AudienceRequestRow[]>([]);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [updating, setUpdating] = useState('');
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      const currentRequests = await loadAdminAudienceRequests();
      if (currentRequests === null) {
        setError('La connexion à Supabase n’est pas configurée.');
        return;
      }
      setRequests(currentRequests);
      setError('');
    } catch (loadError) {
      console.error('Le chargement des demandes d’audience a échoué.', loadError);
      setError('Impossible de charger les demandes. Vérifiez la migration et vos droits administrateur.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
    return subscribeToCmsTable('audience_requests', () => void refresh());
  }, []);

  async function updateStatus(request: AudienceRequestRow, status: AudienceRequestStatus) {
    if (!supabase || request.status === status) return;
    setUpdating(request.id);
    setError('');
    setNotice('');
    try {
      const { error: updateError } = await supabase
        .from('audience_requests')
        .update({ status })
        .eq('id', request.id);
      if (updateError) throw updateError;
      setNotice(`Le statut de la demande ${request.tracking_code} a été mis à jour.`);
      await refresh();
    } catch (updateError) {
      console.error('La mise à jour du statut de la demande a échoué.', updateError);
      setError(`Le statut de ${request.tracking_code} n’a pas pu être modifié.`);
    } finally {
      setUpdating('');
    }
  }

  return (
    <section className="admin-audiences" aria-label="Demandes d’audience">
      <div className="admin-audiences__toolbar">
        <p>Les demandes et coordonnées sont réservées aux administrateurs autorisés.</p>
        <button className="admin-secondary-button" type="button" onClick={() => void refresh()}>Actualiser</button>
      </div>
      {error && <p className="admin-error" role="alert">{error}</p>}
      {notice && <p className="admin-message" role="status">{notice}</p>}
      {loading ? (
        <p className="admin-loading" role="status">Chargement des demandes…</p>
      ) : !error && requests.length === 0 ? (
        <p className="admin-loading" role="status">Aucune demande d’audience pour le moment.</p>
      ) : (
        requests.map((request) => (
          <article className="admin-audience-card" key={request.id}>
            <header className="admin-audience-card__head">
              <div>
                <span className="admin-audience-card__ref">{request.tracking_code}</span>
                <h3>{request.subject}</h3>
                <div className="admin-audience-card__meta">
                  <span>{request.full_name}</span>
                  {request.email && <span>{request.email}</span>}
                  {request.phone && <span>{request.phone}</span>}
                  <time dateTime={request.created_at}>{new Date(request.created_at).toLocaleString('fr-CD')}</time>
                </div>
              </div>
              <label className="admin-audience-card__status">
                Statut
                <select
                  aria-label={`Statut de la demande ${request.tracking_code}`}
                  disabled={updating === request.id}
                  onChange={(event) => {
                    if (isAudienceRequestStatus(event.target.value)) {
                      void updateStatus(request, event.target.value);
                    }
                  }}
                  value={request.status}
                >
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
            </header>
            <p>{request.message}</p>
          </article>
        ))
      )}
    </section>
  );
}
