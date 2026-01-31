# qr-app (PayQR)

Single project with **React (Vite)** frontend and **Node.js (Express)** backend.

## Structure

```
payqr/
├── client/          # React frontend (Vite)
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/           # Node.js backend (Express)
│   ├── index.js
│   └── package.json
├── package.json      # Root – run both client & server
└── README.md
```

## Setup

Install dependencies for root, client, and server:

```bash
npm run install:all
```

Or manually:

```bash
npm install
cd client && npm install
cd ../server && npm install
```

## Development

Run **frontend and backend** together (frontend on port 5173, backend on port 5000):

```bash
npm run dev
```

Run only frontend:

```bash
npm run dev:client
```

Run only backend:

```bash
npm run dev:server
```

## API

- Backend runs at **http://localhost:5000**
- In dev, the Vite proxy forwards `/api` from the frontend to the backend.
- Example: `GET http://localhost:5173/api/health` → proxied to backend.

## Build & production

Build the frontend:

```bash
npm run build
```

Output is in `client/dist`. Serve it with your backend or a static host.

Start the server only (e.g. after building):

```bash
npm start
```

## Environment

- **Server:** set `PORT` (default 5000).
- **Client:** use `VITE_API_URL` for the API base URL in production (e.g. `https://your-api.vercel.app`).
