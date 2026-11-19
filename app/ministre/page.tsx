import Image from 'next/image';
import ministerPhoto from '../../images/Patrick Min.jpeg';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

export default function MinisterPage() {
  return (
    <>
      <SiteHeader activeItem="LE MINISTÈRE" />
      <main className="institutional-page">
        <section className="minister-profile page-shell">
          <div className="minister-profile__portrait">
            <Image
              src={ministerPhoto}
              alt="Me Patrick Mukendi Makanda, ministre provincial de l’Intérieur du Kasaï Oriental"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 42vw"
            />
          </div>
          <div className="minister-profile__content">
            <span className="section-label">LE MINISTRE</span>
            <h1>Me Patrick<br />Mukendi Makanda</h1>
            <p className="minister-profile__role">Ministre provincial de l’Intérieur du Kasaï Oriental</p>
            <p>La sécurité et la protection des citoyens sont un droit pour chaque habitant du Kasaï Oriental et une responsabilité essentielle des pouvoirs publics.</p>
            <p>À la tête du ministère, Me Patrick Mukendi Makanda œuvre au renforcement des services de proximité, à la coordination avec les autorités locales et les services de sécurité, ainsi qu’à la promotion de la paix et de la cohésion sociale dans la province.</p>
            <blockquote>« Je prends l’engagement de poursuivre et d’intensifier mes efforts au service du bien-être de la population du Kasaï Oriental. »</blockquote>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
