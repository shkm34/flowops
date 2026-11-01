# FlowOps (Week 1 skeleton)

## Requirements

- Node.js 22.22.3+ (the repository pins API and web to Node 22.23.4 with Volta)
- Docker with Docker Compose
- npm

## Run locally

```powershell
# From the repository root
Docker Desktop must be running.
docker compose up -d
docker compose ps

cd api
Copy-Item .env.example .env
npm ci
npx prisma migrate dev
npx prisma generate
npm run start:dev
```

The API runs at http://localhost:3000. Check `GET /health`.

In a second terminal:

```powershell
cd flowops/web
npm ci
npm run dev -- -p 3001
```

The web app runs at http://localhost:3001.

## Checks

```powershell
cd api
npm run lint
npm run typecheck
npm run build
npm test

cd ../web
npm run lint
npm run typecheck
npm run build
```

## API smoke test

```powershell
Invoke-RestMethod http://localhost:3000/health
Invoke-RestMethod -Method Post http://localhost:3000/notes -ContentType 'application/json' -Body '{"text":"first db note"}'
Invoke-RestMethod http://localhost:3000/notes
```
