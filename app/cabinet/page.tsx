import Image from 'next/image';
import communicationPhoto from '../../images/FK.jpg';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

const cabinetMembers = [
  { name: 'Nom à compléter', role: 'Directeur du Cabinet', photo: null },
  { name: 'Nom à compléter', role: 'Directeur du Cabinet Adjoint', photo: null },
  { name: 'Franck KAYOMBO', role: 'Conseiller en Communication', photo: communicationPhoto },
  { name: 'Nom à compléter', role: 'Conseiller', photo: null },
  { name: 'Nom à compléter', role: 'Conseiller', photo: null },
  { name: 'Nom à compléter', role: 'Conseiller', photo: null },
  { name: 'Nom à compléter', role: 'Conseiller', photo: null },
  { name: 'Nom à compléter', role: 'Conseiller', photo: null },
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
            {cabinetMembers.map(({ name, role, photo }, index) => (
              <article className="cabinet-card" key={`${role}-${index}`}>
                <div
                  className="cabinet-card__photo"
                  role={photo ? undefined : 'img'}
                  aria-label={photo ? undefined : `Emplacement de la photo du membre du cabinet, ${role}`}
                >
                  {photo
                    ? <Image src={photo} alt={`Portrait de ${name}`} fill sizes="(max-width: 500px) 100vw, (max-width: 800px) 50vw, 25vw" />
                    : <span>PHOTO À AJOUTER</span>}
                </div>
                <h2>{name}</h2>
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
