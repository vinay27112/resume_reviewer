# Resume Reviewer

AI-powered interview prep and resume platform. Upload a resume and a job
description, get an AI-generated skill-gap report, and export an
ATS-optimized resume as a dynamically generated PDF.

**Live:** https://resume-reviewer-psi.vercel.app
**Repo:** https://github.com/vinay27112/resume_reviewer

---

## How it works

1. A logged-in user uploads a resume file plus a job description and a
   short self-description.
2. The backend parses the resume and sends it, along with the JD, to the
   **Gemini API**, which returns a structured skill-gap analysis.
3. That report is saved and viewable later (all past reports are listed).
4. From a report, the user can trigger PDF generation — the backend renders
   an ATS-optimized resume as HTML and uses **Puppeteer** (a headless
   Chrome) to convert it to a downloadable PDF.

## Architecture

```
Backend/    Node.js + Express, MongoDB Atlas, Gemini API, Puppeteer
Frontend/   React — 4-layer structure: service layer, Context state,
            custom hooks, protected routes
```

### Routes

**Auth** (`/api/auth`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/register` | – | Create account (expects `username`, not `name`) |
| POST | `/login` | – | Log in, sets JWT cookie |
| GET | `/logout` | – | Clear session |
| GET | `/get-me` | cookie | Get current user |

**Interview** (`/api/interview`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/` | cookie | Upload resume + JD, generate AI report |
| GET | `/report/:id` | cookie | Fetch a specific report |
| GET | `/` | cookie | List all of the user's reports |
| POST | `/resume/pdf/:reportId` | cookie | Generate ATS resume PDF via Puppeteer |

## Environment variables

### `Backend/.env`
```
PORT=
MONGO_URI=
JWT_SECRET=
GOOGLE_GENAI_API_KEY2=      # Gemini API key — note the exact variable name
CLIENT_URL=                 # deployed frontend URL, for CORS
```

### `Frontend/.env`
```
VITE_API_URL=               # backend URL, e.g. http://localhost:3000 locally
```

> Never commit real `.env` values — only an `.env.example` with empty values.

## Running locally

```bash
# Backend
cd Backend
npm install
node server.js         # http://localhost:3000

# Frontend (separate terminal)
cd Frontend
npm install
npm run dev
```

## Docker

No Dockerfile/`docker-compose.yml` exists for this project currently.

## Deployment (how the live version is actually hosted)

- **Backend → Render.** Root directory `Backend`, build `npm install`,
  start `node server.js`.
  - **Puppeteer needs an explicit Chrome install step** — the default
    `npm install` alone doesn't reliably leave a usable Chrome binary on
    Render. Build command should be:
    ```
    npm install && npx puppeteer browsers install chrome
    ```
  - Chrome also needs to land somewhere that survives from build to
    runtime — Render's default `/opt/render/.cache` path isn't always
    carried over. Set:
    ```
    PUPPETEER_CACHE_DIR=/opt/render/project/src/.cache/puppeteer
    ```
    as an env var, and do a "Clear build cache & deploy" the first time
    this is set, so Chrome downloads into the right place.
  - Puppeteer's `launch()` call also needs sandbox disabled for Render's
    container environment: `args: ["--no-sandbox", "--disable-setuid-sandbox"]`.
- **Frontend → Vercel.** Root directory `Frontend`, needs a `vercel.json`:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- **MongoDB Atlas** free M0 cluster, Network Access set to allow `0.0.0.0/0`.

## Known limitations

- No automated test suite.
- Puppeteer-based PDF generation is memory-heavier than the rest of the
  stack — on Render's free tier (512MB RAM) this is the most likely place
  to hit resource limits under load.
