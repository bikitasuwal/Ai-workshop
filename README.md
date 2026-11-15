# Balaju Living Heritage

A living archive of **22 Dhara (Baisdhara)** and **Pyah Thwam Ajima**, Balaju, Kathmandu.

```
Ai-workshop/
├─ frontend/   Next.js website (pages, design, chatbot widget)                     → http://localhost:3000
├─ backend/    Node.js + Express API (accounts, chatbot, PostgreSQL database hoc)  → http://localhost:4000
└─ 22_Dhara_and_Pyah_Thwam_Ajima_Research_Notes.txt   source research
```

The browser only talks to the frontend. Requests to `/api/*` are forwarded by Next.js to the backend
(`BACKEND_URL` in `frontend/.env.local`), so login cookies stay on one origin and no CORS setup is needed.

## Getting started (after cloning)

**You need:** Node.js 20.9 or newer, Git, and PostgreSQL (any recent version) running on your computer.
You must know the password of your PostgreSQL `postgres` user.

```bash
git clone https://github.com/bikitasuwal/Ai-workshop.git
cd Ai-workshop

npm run setup        # 1. installs everything and creates backend/.env and frontend/.env.local
                     #    (it also generates a random AUTH_SECRET for you)

# 2. open backend/.env and replace YOUR_PASSWORD in DATABASE_URL with your PostgreSQL password
#    (if the password has characters like @ or #, URL-encode them: @ becomes %40)

npm run db:setup     # 3. creates the database "hoc" and its tables (safe to repeat)
npm run dev          # 4. starts the API (port 4000) and the website (port 3000)
```

Open **http://localhost:3000**. The first run compiles pages, so give it a few seconds.

**Make yourself the admin** (admins review posts at `/admin`; they cannot post):
sign up on the website first, then run `npm run make-admin -- your@email.com`.

**Optional:** put a free Google AI Studio key in `GEMINI_API_KEY` (in `backend/.env`) for more natural chatbot answers.
Without it, the chatbot answers directly from the verified notes.

### If something goes wrong

| Problem | Fix |
|---|---|
| `password authentication failed` or `ECONNREFUSED` | PostgreSQL is not running, or the password in `backend/.env` is wrong. |
| `The database "hoc" does not exist yet` | Run `npm run db:setup`. |
| `concurrently is not recognized` | Run `npm run setup` (it installs the root packages too). |
| Port 3000 or 4000 already in use | Close the other program, or stop an old `npm run dev` terminal. |
| Site loads but login or posts fail | Make sure the API is running (the terminal shows `Balaju Heritage API listening`). |
| Changed `BACKEND_URL` | Restart `npm run dev` (Next.js reads it at start). |

This project is for local use; there are no deployment steps.
Other useful commands: `npm run check` (type-check and lint both parts), `npm run build`.

## Photos, video, map and panoramas

All of this is configured in one file: `frontend/lib/places.ts`.

- **Media** lives in `frontend/public/media/` (resized copies of the project's photos and video).
- **Map landmarks:** edit `places` (name, coordinates, photo, page it opens). The shrine's pin is *approximate*:
  it is not in OpenStreetMap, so replace its `lat`/`lng` (right-click the spot in Google Maps → copy coordinates)
  and set `approximate: false`.
- **Ward 16 outline:** `frontend/public/data/ward16.json` (OpenStreetMap relation 16110486, © OpenStreetMap contributors, ODbL).
- **360° panoramas:** the current photos are ordinary flat photos, so they appear as *partial* panoramas
  (about 70° wide). For a true 360° view, capture an equirectangular photo (phone **Panorama** mode isn't enough;
  use Google Street View app's *Photo Sphere*, or a 360° camera), save it as a 2:1 JPG in `public/media/`, and add a scene:
  `{ id, placeId, title, ne, caption, src: "/media/your-360.jpg", width, height, equirect: true, hfov: 360 }`.
  The viewer becomes a full 360° view automatically, including gyroscope on phones.
- **Video** is `spouts-walk.mp4` (re-encoded to 3 MB, sound removed). It only downloads when someone presses play.

## Reviews, photos and complaints

- Only signed-in visitors can post (Voices page). Every post starts as **pending** and is invisible to everyone else.
- The admin approves or rejects posts at **/admin** (shown in the account menu for admins). The admin is the first account created
  with the email set as `ADMIN_EMAIL` in `backend/.env`; sign up with that email first.
- Photos are saved in `backend/uploads/` (git-ignored), re-encoded as JPEG with location/EXIF data removed, max 3 per post.
  A photo is only served publicly once its post is approved; the author and admins can always see it.
- Tables in the `hoc` database: `users`, `posts`, `post_photos` (created by `npm run db:setup`).

## Where things live

- **Verified facts:** edit only `frontend/lib/content.ts`. The backend gets its copy automatically (`backend/scripts/sync-content.mjs`
  runs before `dev`, `build` and `typecheck`), so the pages and the chatbot never disagree.
- **Places** (names, photos, summaries, map positions): `frontend/lib/places.ts`. Home cards, the Places page, the Gallery and the map all read it.
- **Shared look:** `frontend/lib/styles.ts` (buttons, inputs) and `frontend/components/ui.tsx`.
- **Make someone admin:** sign up on the site, then `npm run make-admin -- their@email.com`.
- **Check everything:** `npm run check` (type-check and lint both parts).
