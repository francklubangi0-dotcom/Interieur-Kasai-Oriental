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

La page d’accueil Next.js reprend désormais la composition du portail institutionnel de référence : menu horizontal en capitales avec chevrons, hero photo plein écran avec voile sombre, carte événement superposée, institutions, couverture santé, actualités, magazine, calendrier, accès rapide et footer institutionnel en colonnes. La typographie d’interface utilise Montserrat et le texte courant Roboto, avec une palette blanc, vert institutionnel, rouge éditorial, jaune et bleu doux.

L’image du hero est un asset documentaire sélectionné pour le projet et crédité dans le footer : Africa CDC.
