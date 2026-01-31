# MongoDB setup for PayQR server

## Prerequisites

### 1. Choose how you run MongoDB

| Option | Best for | Prerequisite |
|--------|----------|--------------|
| **MongoDB Atlas** (cloud) | Production, no local install | Free account at [mongodb.com/atlas](https://www.mongodb.com/atlas) |
| **MongoDB locally** | Development on your machine | Install [MongoDB Community](https://www.mongodb.com/docs/manual/installation/) |

### 2. Node.js

- Node.js **18+** (you already have this for the server).
- The official `mongodb` driver is used in this project.

### 3. Environment variable

- **`MONGODB_URI`** – connection string (see below).  
  Add it to `server/.env`; never commit real credentials.

---

## Connection strings

### MongoDB Atlas (cloud)

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com).
2. Create a database user (Database Access → Add User).
3. Add your IP (or `0.0.0.0/0` for “any”) under Network Access.
4. Get the connection string: **Connect → Drivers → Node.js** and copy the URI.

Format:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, `<cluster>`, and `<dbname>` with your values.  
If the password has special characters, [URL-encode](https://www.urlencoder.org/) them.

### Local MongoDB

If MongoDB is running on your machine (default port 27017):

```env
MONGODB_URI=mongodb://localhost:27017/payqr
```

---

## Quick start

1. Install dependencies (from project root or `server/`):

   ```bash
   cd server && npm install
   ```

2. Add to `server/.env`:

   ```env
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/payqr?retryWrites=true&w=majority
   ```
   (or the local URI above.)

3. Start the server:

   ```bash
   npm run dev
   ```

   You should see: `MongoDB connected` and `Server running at http://localhost:5000`.

---

## Optional: MongoDB Compass

- [MongoDB Compass](https://www.mongodb.com/products/compass) – GUI to browse collections and run queries.
- Use the same `MONGODB_URI` (or the URI from Atlas) to connect.
