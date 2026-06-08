# Challenge 1 — Product Inventory REST API

A RESTful API built with **Node.js**, **Express**, **Express Validator**, **JWT**, and **MongoDB**.

## Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally, **or** use Docker (see below)

### 2. Install & configure

```bash
cd challenge-1
npm install
cp .env.example .env
```

Edit `.env` if needed (defaults work with local MongoDB).

### 3. MongoDB

You need MongoDB running on `localhost:27017` (default in `.env`).

- **Already installed?** If the `MongoDB` Windows service is running, you are done — skip Docker.
- **Using Docker?** Start [Docker Desktop](https://www.docker.com/products/docker-desktop/) first, then from the project root run:

```powershell
docker compose up -d
```

If you see `dockerDesktopLinuxEngine: The system cannot find the file specified`, Docker Desktop is not running. Start it and retry, or use local MongoDB instead.

### 4. Run the server

```bash
npm start
# or for auto-reload during development:
npm run dev
```

Server runs at **http://localhost:3000**

---

## Demo Users

| Username | Password  | Role  |
|----------|-----------|-------|
| `admin`  | `admin123` | admin |
| `user`   | `user123`  | user  |

---

## API Endpoints

### Health check
```
GET /health
```

### Login (get JWT token)
```
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Response includes a `token`. Use it in protected routes:
```
Authorization: Bearer <your-token>
```

---

### Products

| Method | Endpoint           | Auth        | Description              |
|--------|--------------------|-------------|--------------------------|
| GET    | `/products`        | None        | List products (paginated, 10/page) |
| GET    | `/products/:id`    | None        | Get one product          |
| POST   | `/products`        | Admin only  | Create product           |
| PUT    | `/products/:id`    | Admin only  | Update product           |
| DELETE | `/products/:id`    | Admin only  | Delete product           |

#### Pagination
```
GET /products?page=1
GET /products?page=2
```

#### Create product (admin)
```
POST /products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Wireless Mouse",
  "category": "Electronics",
  "price": 29.99,
  "quantity": 100
}
```

#### Validation rules (POST & PUT)
| Field      | Rule                          |
|------------|-------------------------------|
| `name`     | Required                      |
| `category` | Optional, must be a string    |
| `price`    | Required, positive number     |
| `quantity` | Required, non-negative integer|

---

## Project Structure

```
challenge-1/
├── src/
│   ├── config/db.js          # MongoDB connection
│   ├── controllers/          # Request handlers
│   ├── data/users.js         # Demo users for login
│   ├── middleware/           # Auth, admin, validation
│   ├── models/Product.js     # Mongoose schema
│   ├── routes/               # Route definitions
│   ├── validators/           # Express Validator rules
│   ├── app.js                # Express app setup
│   └── server.js             # Entry point
├── .env.example
└── package.json
```

---

## Testing with curl

```bash
# Login as admin
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}"

# Create a product (replace TOKEN)
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d "{\"name\":\"Laptop\",\"category\":\"Electronics\",\"price\":999.99,\"quantity\":50}"

# List products
curl http://localhost:3000/products

# Try creating as non-admin (should get 403)
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer USER_TOKEN" \
  -d "{\"name\":\"Test\",\"price\":10,\"quantity\":1}"
```
