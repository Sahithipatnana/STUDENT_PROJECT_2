# Sahithi - Student Assignment Submission System

This is a full-stack MERN student project. It is different from the first project because it includes a React frontend, an Express backend, and MongoDB database integration for real student assignment records.

## Features

- Student registration form with MongoDB storage
- Assignment creation with due dates and max score
- Submission tracking with review status updates
- Dashboard showing students, assignments, and pending reviews
- REST API backend for CRUD operations

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Project Structure

```text
sahithi/
├── backend/
├── public/
├── src/
├── index.html
├── package.json
└── vite.config.js
```

## Frontend Setup

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Backend Setup

Open a second terminal inside `backend`:

```bash
cd backend
npm install
cp .env.example .env
```

Add your MongoDB connection string inside `.env`:

```text
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@your-cluster.mongodb.net/sahithi_assignment_system?retryWrites=true&w=majority&appName=Cluster0
FRONTEND_URL=https://your-github-username.github.io/your-repo-name
```

Start the backend:

```bash
npm run dev
```

The backend runs on `http://localhost:5000`.

## API Routes

- `GET /api/students`
- `POST /api/students`
- `GET /api/assignments`
- `POST /api/assignments`
- `GET /api/submissions`
- `POST /api/submissions`
- `PATCH /api/submissions/:id/status`

## Notes

- Sample data is seeded automatically when the database is empty.
- If the backend is not running, the frontend shows a clear connection error.

## Deployment Notes

- Frontend can be hosted on GitHub Pages.
- Backend should be deployed from `backend/` on Render as a Web Service.
- Before deploying the frontend, create a frontend `.env` with:

```text
VITE_API_URL=https://your-render-service.onrender.com/api
```

- Before deploying the backend, create `backend/.env` from `backend/.env.example` and add your real MongoDB Atlas URI plus the GitHub Pages frontend URL in `FRONTEND_URL`.
- The app uses `HashRouter`, so GitHub Pages routing works without server-side rewrite rules.

## Render Backend Checklist

Use these settings when creating the Render service:

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:

```text
MONGO_URI=your-real-atlas-uri-for-sahithi_assignment_system
FRONTEND_URL=https://your-github-username.github.io/your-repo-name
```

`PORT` is usually assigned automatically by Render, so you do not need to set it manually there.

## GitHub Pages Frontend Checklist

Before building or publishing the frontend:

1. Create `.env` in the `sahithi` root.
2. Add the deployed Render API URL:

```text
VITE_API_URL=https://your-render-service.onrender.com/api
```

3. Build the frontend and publish the generated `dist/` to GitHub Pages.

Because `vite.config.js` uses `base: './'` and the app uses `HashRouter`, it is compatible with GitHub Pages subpaths.

## GitHub Push Checklist

Before pushing `sahithi` as its own repository:

1. Initialize Git inside `sahithi` if needed.
2. Make sure `.env`, `backend/.env`, `.agents/`, `.codex/`, `node_modules/`, and `dist/` are not committed.
3. Push to a GitHub repository whose default branch is `main`.
4. In GitHub repository settings, enable Pages with `GitHub Actions` as the source.
5. In GitHub repository settings, add a repository variable named `VITE_API_URL` after your Render backend URL is available.

Repository variable example:

```text
VITE_API_URL=https://your-render-service.onrender.com/api
```
