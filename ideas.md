# 💻 DevChallenge Platform

## 🎯 Objectif
Créer une plateforme web de **challenges pour développeurs**, où les utilisateurs peuvent :
- Découvrir des challenges en cours ou passés.
- Participer en soumettant leurs projets/démos.
- Voter pour leurs projets favoris.
- Découvrir les lauréats et classements.

Les **admins** gèrent la création, la modération et la clôture des challenges.

---

## 🌐 Structure générale de l’application

### 🏠 1. Landing Page
- Présentation claire de la plateforme et de son concept.
- Boutons de connexion : **Google** et **GitHub**.
- Liste publique des challenges récents ou populaires.
- Possibilité de **voir les détails d’un challenge** sans être connecté (lecture seule).

---

### 🔐 2. Authentification
#### Méthodes disponibles :
- **Connexion avec Google**
- **Connexion avec GitHub**

#### Gestion des rôles :
- Par défaut, tout utilisateur connecté devient **user**.
- Les **admins** sont désignés manuellement en base de données ou via une interface d’administration.
- Rôles disponibles :
  - `admin`
  - `user`

#### Comportement :
- Les **non-connectés** peuvent uniquement :
  - Consulter la liste des challenges.
  - Voir les détails d’un challenge et les scores publics.

- Les **connectés** peuvent :
  - Participer à un challenge.
  - Soumettre un lien vers leur démo.
  - Voter pour d’autres participants.
  - Suivre l’évolution des résultats.

---

### 🧭 3. Navigation utilisateur

#### 🔹 Page Liste des Challenges
- Vue publique : liste des challenges **“en cours”**, **“à venir”**, et **“terminés”**.
- Pour chaque challenge :
  - Titre, description courte, statut, dates, nombre de participants, score global.
  - Bouton “Voir plus” → détail du challenge.

#### 🔹 Page Détail d’un Challenge
- Informations complètes : titre, description, durée, récompenses, deadline.
- Liste des participants :
  - Nom + lien vers leur profil GitHub (si disponible).
  - Bouton **“Like / Vote”** sous chaque participant.
  - Score actuel (nombre de votes).
- Bouton **“Participer”** (si le challenge est en cours et que l’utilisateur est connecté).
- Après participation :
  - Possibilité de **soumettre un lien démo** (GitHub, Vercel, etc.).
  - Voir les votes reçus.

#### 🔹 Page Résultats / Lauréats
- Classement final avec les scores.
- Démos vidéo courtes (ex : 10–20 secondes) ou liens externes vers les projets.
- Section "Les meilleurs scores" + statistiques générales.

---

### 🧑‍💻 4. Fonctionnalités futures (phase 2+)
- **Challenges Live** :
  - Lancement de sessions de codage en direct.
  - Les participants codent directement sur la plateforme.
  - Votes en temps réel.
- **Galerie de démos** :
  - Replays ou courtes démos vidéo intégrées.
- **Commentaires** :
  - Section de retours pour les participants.

---

## 🧰 5. Fonctionnalités administrateur

#### Gestion des challenges (CRUD)
- Créer un challenge : titre, description, dates, durée, statut, image.
- Modifier ou supprimer un challenge.
- Clôturer un challenge manuellement avant la fin.
- Ajouter ou retirer un participant (en cas de triche ou non-respect des règles).
- Annoncer les **gagnants officiels** et publier les résultats.

#### Gestion des utilisateurs
- Liste des utilisateurs inscrits.
- Promotion ou rétrogradation de rôles (`user` ↔ `admin`).
- Suppression de comptes problématiques.

---

## 🧩 Stack Technique

### 🖥️ Frontend
- **Next.js 15 (App Router)** – framework principal.
- **TypeScript** – typage fort pour fiabilité.
- **Tailwind CSS** – design rapide, moderne et responsive.
- **ShadCN/UI** – composants UI propres et réutilisables.

### ⚙️ Backend (intégré)
> Aucun backend séparé (comme DRF) nécessaire.  
Toute la logique (auth, CRUD, API) sera gérée avec **Next.js Server Actions** et **API Routes**.

- Gestion des challenges, participations et votes via des routes sécurisées.
- Vérification du rôle (`user` ou `admin`) avant chaque action sensible.

### 🗄️ Base de données
- **PostgreSQL** (local ou via Supabase / Neon.tech)
- **Drizzle ORM**
  - ORM léger et typé pour Next.js.
  - Migrations faciles.
  - Pas besoin de Docker.

### 🔐 Authentification
- **Better Auth**
  - Connexion OAuth (Google, GitHub uniquement).
  - Gestion simplifiée des sessions côté serveur.
  - Stockage des rôles dans la table `User`.

---

## 🧱 6. Modèles de données (Drizzle + PostgreSQL)

### User
| Champ | Type | Description |
|--------|------|-------------|
| id | UUID | Identifiant unique |
| name | string | Nom complet |
| email | string | Email unique |
| role | enum("user", "admin") | Rôle utilisateur |
| created_at | timestamp | Date d’inscription |

---

### Challenge
| Champ | Type | Description |
|--------|------|-------------|
| id | UUID | Identifiant |
| title | string | Nom du challenge |
| description | text | Description détaillée |
| start_date | date | Début du challenge |
| end_date | date | Fin du challenge |
| status | enum("à venir", "en cours", "terminé") | État du challenge |
| created_by | FK(User) | Admin créateur |
| created_at | timestamp | Date de création |

---

### Submission
| Champ | Type | Description |
|--------|------|-------------|
| id | UUID | Identifiant |
| user_id | FK(User) | Participant |
| challenge_id | FK(Challenge) | Challenge concerné |
| demo_link | text | Lien vers le projet |
| votes_count | int | Nombre de votes |
| created_at | timestamp | Date de soumission |

---

### Vote
| Champ | Type | Description |
|--------|------|-------------|
| id | UUID | Identifiant |
| voter_id | FK(User) | Utilisateur ayant voté |
| submission_id | FK(Submission) | Projet voté |
| created_at | timestamp | Date du vote |

---

## 🚀 7. Roadmap de Développement

### Phase 1 – Initialisation
- Setup Next.js + Tailwind + Drizzle + Better Auth.
- Config Postgres + migrations.
- Création des tables de base.

### Phase 2 – Authentification & Rôles
- Connexion Google/GitHub.
- Attribution automatique du rôle `user`.
- Gestion manuelle des admins.

### Phase 3 – Challenges & Participations
- CRUD Challenge (admin only).
- Liste et détails des challenges publics.
- Participation + soumission de démos.

### Phase 4 – Votes & Résultats
- Système de likes/votes.
- Affichage dynamique des scores.
- Page de classement final.

### Phase 5 – Interface & Expérience
- Pages responsive.
- UI dynamique (toasts, transitions).
- Page résultats avec liens démos GitHub/Vercel.

### Phase 6 – Bonus / Évolutions
- Challenges Live.
- Courtes vidéos de démos.
- Classement global et badges.

---

## 🧠 8. Outils recommandés
- **VS Code** avec extensions : Tailwind, Drizzle, Prettier.
- **Supabase / Neon.tech** pour héberger Postgres.
- **Vercel** pour le déploiement de la plateforme.

---

## 🧩 9. Résumé
| Rôle | Permissions principales |
|------|--------------------------|
| **Visiteur** | Voir la liste des challenges |
| **User** | Participer, voter, soumettre un projet |
| **Admin** | Créer, éditer, supprimer challenges, gérer utilisateurs |

---

## 💬 Conclusion
Cette plateforme servira de base moderne et légère pour :
- Expérimenter Next.js côté full-stack.
- Gérer une vraie auth OAuth (Google/GitHub).
- Manipuler une base Postgres avec Drizzle.
- Mettre en place une logique de rôles, de votes, et de participation réaliste.

---



Quelques petites notes perso
-autoriser l'affichage d'avatar github dans le next.config.ts

installation de nanoid qui génère des ids plus complexe
npm install nanoid
npm install --save-dev @types/nanoid