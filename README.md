# Gestion des notes

Application web de gestion de notes développée avec **React.js** et **Vite**, avec une API **Node.js / Express** connectée à une base **MySQL**.
Elle permet de créer, consulter, modifier et supprimer des notes (CRUD).

🔗 Démo : https://gestion-des-notes-two.vercel.app

## Fonctionnalités

- Créer une note (titre obligatoire, contenu optionnel)
- Consulter la liste des notes (triées par dernière modification)
- Modifier une note
- Supprimer une note

## Technologies

- **Frontend** : React.js, Vite
- **Backend** : Node.js, Express, CORS, dotenv
- **Base de données** : MySQL
- **Déploiement** : Vercel

## API REST

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/notes` | Lister toutes les notes |
| GET | `/api/notes/:id` | Récupérer une note |
| POST | `/api/notes` | Créer une note |
| PUT | `/api/notes/:id` | Modifier une note |
| DELETE | `/api/notes/:id` | Supprimer une note |
| GET | `/api/health` | Vérifier que le serveur tourne |

## Installation

```bash
git clone https://github.com/Nour123456789432/gestion-des-notes.git
cd gestion-des-notes

# Frontend
npm install
npm run dev

# Backend (dans un 2e terminal)
cd backend
npm install
node server.js
```

Créer un fichier `backend/.env` avec les paramètres de connexion MySQL.

## Structure

- `src/` : composants React et gestion de l'état
- `backend/server.js` : routes de l'API
- `backend/bd.js` : connexion MySQL
- `backend/import-notes.js` : import de notes depuis `notes.json`

## Compétences mises en pratique

- Gestion des composants et de l'état avec React
- Conception d'une API REST et opérations CRUD
- Connexion à une base de données MySQL
- Tests et débogage
