# DEV — Offres tech

Plateforme d'offres d'emploi tech construite avec Next.js (App Router), Prismic, Zustand et Tailwind.

## Stack technique

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Prismic (`@prismicio/client`, `@prismicio/next`, `@prismicio/react`)
- Zustand (offres enregistrées + historique des candidatures)
- Material UI Icons

## Fonctionnalités implémentées

- Affichage des offres depuis Prismic
- Page détail d'offre
- Filtres par technologies/tags
- Enregistrement d'offres (bookmark) sur le profil
- Vérification de disponibilité des offres enregistrées (suppression des slugs absents)
- Formulaire de candidature et historique des candidatures
- Layout responsive + pages légales/profil

## Routes principales

- `/` : accueil + dernières opportunités
- `/offres` : liste des offres
- `/offres/[slug]` : détail d'une offre
- `/tags/[tag]` : offres filtrées par techno/tag
- `/profil` : offres enregistrées + historique candidatures
- `/mentions-legales` : mentions légales

## Installation

```bash
npm install
```

## Variables d'environnement

Créer un fichier `.env.local` (ou utiliser `.env`) à la racine :

```env
PRISMIC_REPOSITORY_NAME=nom-du-repository
PRISMIC_ACCESS_TOKEN=token-optionnel
```

## Lancer le projet

```bash
npm run dev
```

Puis ouvrir http://localhost:3000.

## Scripts utiles

- `npm run dev` : mode développement
- `npm run build` : build de production
- `npm run start` : lancer la build
- `npm run lint` : lint ESLint
- `npm run slicemachine` : interface Slice Machine

## Déploiement

Déploiement recommandé : Vercel.

Penser à ajouter les variables d'environnement Prismic dans le projet Vercel avant de déployer.
