# Junior Backend Coding Test — Solution

Complete implementation of both challenges: a Product Inventory REST API with JWT auth, and optimized database queries.

## What's Done

### Challenge 1 — REST API (`challenge-1/`)
- JWT login (`POST /auth/login`)
- Product CRUD with MongoDB + Mongoose
- Admin-only routes (create, update, delete)
- Express Validator on POST/PUT
- Pagination (10 products/page)
- Auth + admin authorization middleware
- Auto port fallback if 3000 is in use

### Challenge 2 — Queries (`challenge-2/`)
- PostgreSQL query — price $50–$200, sorted ASC, 10/page (`queries.sql`)
- MongoDB query — by category, sorted DESC, 5/page (`queries.mongodb.js`)
- Optimization notes — indexing, caching, scaling (`optimization-notes.md`)

## Tech Stack

Node.js · Express · Express Validator · JWT · bcrypt · MongoDB · Mongoose

## Quick Start

```powershell
cd challenge-1
npm install
copy .env.example .env
npm start
```

MongoDB must be running on `localhost:27017`. Or use Docker (with Docker Desktop running):

```powershell
docker compose up -d
```

Open the URL shown in the terminal (default: `http://localhost:3000`).

## Demo Users

| Username | Password   | Role  |
|----------|------------|-------|
| admin    | admin123   | admin |
| user     | user123    | user  |

## API Endpoints

| Method | Endpoint           | Access      |
|--------|--------------------|-------------|
| GET    | `/`                | Public      |
| GET    | `/health`          | Public      |
| POST   | `/auth/login`      | Public      |
| GET    | `/products`        | Public      |
| GET    | `/products/:id`    | Public      |
| POST   | `/products`        | Admin only  |
| PUT    | `/products/:id`    | Admin only  |
| DELETE | `/products/:id`    | Admin only  |

Protected routes require header: `Authorization: Bearer <token>`

## Project Structure

```
challenge-1/          REST API
  src/
    controllers/      Route logic
    middleware/       Auth, admin, validation
    models/           Product schema
    routes/           API routes
    validators/       Express Validator rules
challenge-2/          SQL/NoSQL queries + optimization notes
docker-compose.yml    Optional MongoDB setup
```

## More Details

- [Challenge 1 README](challenge-1/README.md) — full API examples with curl/PowerShell
- [Challenge 2 README](challenge-2/README.md) — query usage
