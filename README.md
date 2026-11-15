# Balaju Living Heritage

A mobile-first website that preserves the heritage of **22 Dhara (Baisdhara)** and **Pyah Thwam Ajima** in Balaju, Kathmandu.
Visitors can explore the places, ask a chatbot, and post reviews, photos and complaints that an admin approves before anyone sees them.

- `frontend/` Next.js website, http://localhost:3000
- `backend/` Node.js API with PostgreSQL (database `hoc`), http://localhost:4000

More detail (features, safety, known limits): see [overview.pdf](overview.pdf).

## Run it

You need **Node.js 20.9+**, **Git** and **PostgreSQL** (running, with your `postgres` password).

```bash
git clone https://github.com/bikitasuwal/Ai-workshop.git
cd Ai-workshop

npm run setup      # installs everything and creates the .env files
```

Open `backend/.env` and replace `YOUR_PASSWORD` in `DATABASE_URL` with your PostgreSQL password
(URL-encode special characters, e.g. `@` becomes `%40`). Then:

```bash
npm run db:setup   # creates the database "hoc" and its tables
npm run dev        # starts the API and the website
```

Open **http://localhost:3000**.

**Admin:** sign up on the site, then run `npm run make-admin -- your@email.com`. Admins review posts at `/admin`.

## Common problems

| Problem | Fix |
|---|---|
| `password authentication failed` / `ECONNREFUSED` | PostgreSQL isn't running, or the password in `backend/.env` is wrong. |
| `database "hoc" does not exist` | Run `npm run db:setup`. |
| `concurrently is not recognized` | Run `npm run setup`. |
| Port 3000 or 4000 in use | Close the other program or old terminal. |

## Commands

| Command | What it does |
|---|---|
| `npm run setup` | First-time install and `.env` files |
| `npm run db:setup` | Create the database and tables (safe to repeat) |
| `npm run dev` | Run the API and the website |
| `npm run make-admin -- email` | Make an account the admin |
| `npm run check` | Type-check and lint |

## Editing content

- **Facts and chatbot knowledge:** `frontend/lib/content.ts` (the backend copy is generated automatically).
- **Places, map pins, 360° scenes:** `frontend/lib/places.ts`. The Ajima pin is approximate; replace its `lat`/`lng` with the real spot.
- **Photos and video:** `frontend/public/media/`.

Local-only project: there are no deployment steps. Optional: add a free `GEMINI_API_KEY` in `backend/.env` for smoother chatbot answers.
