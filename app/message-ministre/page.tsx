import Image from 'next/image';
import ministerPhoto from '../../images/MIN INT.jpeg';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { ministerMessage } from '../data/ministerMessage';

export default function MinisterMessagePage() {
  return (
    <>
      <SiteHeader activeItem="LE MINISTÈRE" />
      <main className="minister-message-page">
        <div className="page-shell minister-message-page__inner">
          <a className="minister-message-page__back page-back-link" href="/">← Retour à l’accueil</a>
          <header className="minister-message-page__heading">
            <span className="section-label">LE MOT DU MINISTRE</span>
            <h1>Une province plus sûre,<br /><strong>unie et tournée vers l’avenir.</strong></h1>
            <p>Un message aux concitoyennes et concitoyens du Kasaï-Oriental.</p>
          </header>
          <div className="minister-message-page__content">
            <figure className="minister-message-page__portrait">
              <div className="minister-message-page__photo">
                <Image
                  src={ministerPhoto}
                  alt="Me Patrick Mukendi Makanda, ministre provincial de l’Intérieur du Kasaï-Oriental"
                  fill
                  priority
                  sizes="(max-width: 800px) 100vw, 42vw"
                />
              </div>
              <figcaption>
                <span>Le Ministre provincial de l’Intérieur</span>
                <strong>Me Patrick Mukendi Makanda</strong>
              </figcaption>
            </figure>
            <blockquote className="minister-message-page__quote">
              <p className="minister-message-page__greeting">{ministerMessage.greeting}</p>
              {ministerMessage.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <footer>
                <span>{ministerMessage.signature}</span>
                <strong>{ministerMessage.signatory}</strong>
              </footer>
            </blockquote>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
