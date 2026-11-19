import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

const cabinetRoles = [
  'Directeur du Cabinet',
  'Directeur du Cabinet Adjoint',
  'Conseiller',
  'Conseiller',
  'Conseiller',
];

export default function CabinetPage() {
  return (
    <>
      <SiteHeader activeItem="LE MINISTÈRE" />
      <main className="cabinet-page">
        <div className="page-shell">
          <header className="cabinet-page__heading">
            <span className="section-label">LE MINISTÈRE</span>
            <h1>Membres du Cabinet du Ministère de l’Intérieur du Kasaï Oriental</h1>
          </header>
          <div className="cabinet-grid">
            {cabinetRoles.map((role, index) => (
              <article className="cabinet-card" key={`${role}-${index}`}>
                <div className="cabinet-card__photo" role="img" aria-label={`Emplacement de la photo du membre du cabinet, ${role}`}>
                  <span>PHOTO À AJOUTER</span>
                </div>
                <h2>Nom à compléter</h2>
                <p>{role}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
