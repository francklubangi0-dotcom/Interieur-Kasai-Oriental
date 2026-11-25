# nod.jc

Portail institutionnel francophone développé avec **Next.js**, pensé comme une porte d’entrée claire vers les actualités, programmes, ressources et services publics.

## Démarrage

```bash
npm install
npm run dev
```

Le projet utilise l’App Router, React, TypeScript et un export statique (`out/`). Le serveur de développement Next.js écoute sur le port `3000` par défaut.

## Direction d’interface

L’expérience reprend les repères du site de référence `https://sante.gouv.cd/` — en-tête institutionnel, navigation principale, accès rapides, liens utiles et pied de page — avec une identité propre à nod.jc : bleu nuit, vert menthe et une mise en page éditoriale plus aérée. La page est composée dans `app/page.tsx` et ses styles globaux sont dans `app/globals.css`.

## Refonte de l’interface

La page d’accueil Next.js reprend désormais la composition du portail institutionnel de référence : menu horizontal en capitales avec chevrons, hero photo plein écran avec voile sombre, carte événement superposée, institutions, exploration interactive de la province, actualités, magazine, calendrier, accès rapides et footer institutionnel en colonnes. La typographie d’interface utilise Montserrat et le texte courant Roboto, avec une palette blanc, vert institutionnel, rouge éditorial, jaune et bleu doux.

La page d’accueil comprend également un explorateur interactif du Kasaï-Oriental : 1 ville, 5 territoires et 5 communes recensées pour Mbuji-Mayi. Les entités peuvent être sélectionnées sur la carte ou à l’aide des boutons. Le total provincial des communes, le nombre de secteurs, chefferies et commissariats, ainsi que les responsables, superficies, populations et contacts locaux, restent à confirmer auprès des services compétents. Les contours 2019 proviennent du référentiel OCHA/RGC diffusé par [geoBoundaries](https://www.geoboundaries.org/) sous licence CC BY 3.0 IGO et sont indicatifs.

L’image du hero est un asset documentaire sélectionné pour le projet et crédité dans le footer : Africa CDC.

## Gestion éditoriale

- **Actualités** : le panneau `/admin` permet de créer, modifier, publier et supprimer des actualités. Il comporte la date, la catégorie, le titre, le résumé, la photo de couverture et son texte alternatif, le texte complet, la mise à la une, la position du carrousel et le statut brouillon/publié. Chaque article publié dispose d’une page détaillée.
- **Avis urgents** : le panneau permet de choisir une catégorie, l’autorité émettrice, les dates de publication et d’expiration, les zones et les consignes. Un avis publié et actif affiche sa catégorie, son titre et les zones dans le bandeau ; le point passe au rouge. Les catégories disponibles sont : alerte sécuritaire, restriction temporaire d’accès, appel au calme, mise en garde contre une rumeur, accident ou catastrophe, fermeture temporaire d’un service, interruption d’un service numérique, danger routier, appel à témoins et rappel d’une mesure administrative.
- **Services aux citoyens** : la page `/services-publics` présente les démarches et le formulaire de demande d’audience. Chaque dépôt reçoit une référence aléatoire ; `/services-publics/suivi-audience` ne révèle que le statut et les dates, jamais les coordonnées ou le message. L’onglet « Demandes d’audience » de `/admin` permet aux administrateurs autorisés de consulter les demandes et d’actualiser leur statut. Sans configuration Supabase, les formulaires restent visibles mais désactivés et invitent à contacter le Ministère.
- **Message du Ministre** : le texte complet est centralisé dans `app/data/ministerMessage.ts`. La photographie utilisée sur sa page est `images/MIN INT.jpeg`.

### Mise en service de Supabase

1. Dans l’éditeur SQL du projet Supabase, exécuter dans l’ordre [`supabase/migrations/20261120160000_cms.sql`](./supabase/migrations/20261120160000_cms.sql), puis [`supabase/migrations/20261120170000_audience_requests.sql`](./supabase/migrations/20261120170000_audience_requests.sql). La seconde migration crée le dépôt et le suivi des audiences ; les visiteurs ne peuvent ni lire les demandes ni accéder aux données personnelles. Le code de suivi sert de justificatif secret : invitez les citoyens à le conserver confidentiellement.
2. Créer le compte administrateur dans **Authentication → Users**, puis exécuter dans l’éditeur SQL en remplaçant l’adresse :

   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'admin@example.org'
   on conflict do nothing;
   ```

3. Copier `.env.example` vers `.env.local` et renseigner l’URL Supabase ainsi que la clé publique **anon/publishable** du projet. Ne jamais utiliser ni exposer la clé `service_role`.
4. Lancer `npm run dev`, ouvrir `/admin` et se connecter avec le compte autorisé. Pour déployer, les variables doivent être définies dans l’environnement de build avant `npm run build`; le site statique généré se trouve dans `out/`.

Les visiteurs ne peuvent lire que les contenus publiés. Les écritures et les images sont réservées aux comptes inscrits dans `admin_users` par les politiques RLS. Les changements de contenu sont propagés aux pages ouvertes via Supabase Realtime, avec une actualisation périodique de secours. Sans variables Supabase, le site garde son contenu initial et l’espace d’administration indique qu’il doit être configuré.

Les variables `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont destinées au navigateur ; la sécurité repose sur les politiques RLS, jamais sur le masquage de cette clé. L’accès administrateur est fermé par défaut : il n’y a pas d’inscription publique.
