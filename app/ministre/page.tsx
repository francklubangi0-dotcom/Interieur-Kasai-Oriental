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
            <div className="minister-bio">
              <section className="minister-bio__section">
                <h2>Origines et formation</h2>
                <p>Fils d’Anaclet MAKANDA MPINGA et de Marie Etienne MUANZA KAPIAMBA, Patrick MUKENDI MAKANDA est né à Kinshasa le 10 février 1978.</p>
                <ul className="minister-bio__education">
                  <li><span>1991</span><span>Certificat d’études primaires à l’EP DIKU de Kananga.</span></li>
                  <li><span>1998</span><span>Diplôme des études humanitaires, option Latin-Philo, au Collège Saint-Louis de Kananga.</span></li>
                  <li><span>2001</span><span>Diplôme de Graduat en droit économique et social de l’Université Protestante au Congo (U.P.C.).</span></li>
                  <li><span>2003</span><span>Licence en droit économique et social de l’Université Protestante au Congo (U.P.C.).</span></li>
                </ul>
              </section>

              <section className="minister-bio__section">
                <h2>Parcours dans l’administration territoriale</h2>
                <p>Son parcours le conduit à des responsabilités importantes dans la gestion publique. Nommé par ordonnance présidentielle, il exerce les fonctions de maire adjoint de la ville de Mbuji-Mayi depuis novembre 2022.</p>
                <p>À ce titre, il représente l’État sous l’autorité du Gouverneur et du Ministre de l’Intérieur. Ses responsabilités comprennent notamment :</p>
                <ul className="minister-bio__duties">
                  <li>Chef de l’administration urbaine.</li>
                  <li>Officier de l’état civil et officier de police judiciaire.</li>
                  <li>Représentation de la ville en justice.</li>
                  <li>Gestion des crédits et responsabilité du personnel urbain.</li>
                  <li>Vice-présidence du cadre multisectoriel urbain de lutte contre les maladies.</li>
                  <li>Suivi et évaluation des projets urbains.</li>
                </ul>
              </section>

              <section className="minister-bio__section">
                <h2>Engagement et connaissance de la territoriale</h2>
                <p>Fils de l’un des 13 parlementaires qui ont fait pression sur le régime du Président Mobutu afin d’obtenir des enquêtes indépendantes sur les tueries de Katekelayi au Kasaï-Oriental, Patrick MUKENDI MAKANDA suit les traces de son père, aujourd’hui décédé.</p>
                <p>Maîtrisant les rouages de l’administration territoriale, il fait preuve de rigueur dans la gestion des affaires de l’État. Méticuleux, à l’écoute, patient et capable d’anticiper, il accompagne le Gouverneur de province dans la gestion de la sécurité, des affaires coutumières et de l’administration territoriale.</p>
              </section>

              <section className="minister-bio__section">
                <h2>Expériences professionnelles</h2>
                <p>Au sein du Gouvernement MBUEBUA KAPO, il a notamment été conseiller juridique adjoint à temps partiel à l’ONG Source de vie, à Kinshasa, de mars à novembre 2005. Son parcours comprend également les expériences suivantes :</p>
                <ol className="minister-bio__career">
                  <li>
                    <strong>Stagiaire au Cabinet d’avocat de Maître MBIYE, à temps partiel</strong>
                    <span>Kinshasa · février 2006 à octobre 2008</span>
                  </li>
                  <li>
                    <strong>Stagiaire au Tribunal de paix de Pont-Kasa-Vubu</strong>
                    <span>avril 2006 à juillet 2006</span>
                  </li>
                  <li>
                    <strong>Stagiaire au Cabinet d’avocat de Maître Clément KAMPANGALA, à temps partiel</strong>
                    <span>Mbuji-Mayi · janvier 2009 à avril 2010</span>
                  </li>
                  <li>
                    <strong>Conseiller clientèle et caissier (agent polyvalent), à temps plein — Procrédit Bank Congo</strong>
                    <span>avril 2011 à juillet 2013</span>
                  </li>
                  <li>
                    <strong>Conseiller clientèle particulier senior, à temps plein — Bank of Africa RDC</strong>
                    <span>août 2013 à décembre 2019</span>
                  </li>
                  <li>
                    <strong>Responsable commercial et assistant de direction, à temps plein — LAGIMEX</strong>
                    <span>Kinshasa · décembre 2019 à septembre 2022</span>
                  </li>
                  <li>
                    <strong>Coordinateur à temps plein du Cabinet D.G.A. SOKIMO SA</strong>
                    <span>Kinshasa · septembre 2021 à novembre 2022</span>
                  </li>
                </ol>
              </section>

              <section className="minister-bio__section">
                <h2>Langues</h2>
                <p>Outre les quatre langues nationales — ciluba, lingala, swahili et kikongo —, Patrick MUKENDI MAKANDA possède des compétences en français et en anglais.</p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
