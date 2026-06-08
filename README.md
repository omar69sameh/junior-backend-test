# Backend Developer Coding Test

Welcome to the coding test for the **Backend Developer role**. This test evaluates your skills in Node.js, Express.js, Express Validator, JWT Authentication, Authorization Middleware, database management, and API design.

## Test Instructions

1. **Clone the Repository**: Fork this repository and complete the coding challenges below.
2. **Complete the Challenges**: Implement the tasks as specified.
3. **Submit the Solution**: Once you have completed the tasks, push your code to your repository and share the link.


---

# ⏳ Time Limit

You have **2 days** to complete this test.

### Submission Steps

1. Fork this repository
2. Complete the implementation
3. Push your solution to your fork
4. Email your GitHub repository link to:

careers@fekracorp.com

---

## Challenge 1: Build a RESTful API with Node.js, Express, Express Validator, and JWT Authentication

### Objective
Create a RESTful API using Node.js and Express.js to manage a Product Inventory System with JWT authentication and authorization middleware.

### Requirements

#### Authentication:
- Use JWT for authentication. Implement a login endpoint (`POST /auth/login`) to generate a JWT token, which will be required to access the protected routes.

#### Authorization:
- Implement authorization middleware to protect routes that require admin access (e.g., adding, updating, and deleting products).
- Authorization middleware should check the role from the decoded JWT token and ensure only users with the `admin` role can access these routes.

#### Endpoints:
- **POST /auth/login**: User login (returns a JWT token).
- **POST /products**: Add a new product (`name`, `category`, `price`, `quantity`). Only accessible to admin.
- **GET /products**: List all products with pagination (10 products per page).
- **GET /products/:id**: Get a single product by its ID.
- **PUT /products/:id**: Update a product. Only accessible to admin.
- **DELETE /products/:id**: Delete a product. Only accessible to admin.

#### Input Validation (using Express Validator):
- Use Express Validator for validation on the POST and PUT endpoints.
- Ensure the following validations:
  - `name` is required.
  - `category` is optional but should be a string.
  - `price` should be a positive number.
  - `quantity` should be a non-negative integer.

#### Database:
- Use MongoDB for storing product data with the following schema:

```json
{
  "name": String,
  "category": String,
  "price": Number,
  "quantity": Number,
  "createdAt": Date,
  "updatedAt": Date
}
```

## Features:
- Implement basic validation for required fields and proper error handling using Express Validator.
- Ensure security best practices for authentication and authorization.

---

## Challenge 2: Database Query Optimization

### Objective
Write optimized SQL/NoSQL queries to retrieve product data efficiently.

Requirements
SQL Query: (Assuming PostgreSQL)

Write a query to fetch products with a price between $50 and $200, ordered by price (ascending), with pagination (10 products per page).
NoSQL Query: (Assuming MongoDB)

Write a query to retrieve products by category (e.g., "Electronics"), sorted by price in descending order. Limit the result to 5 products per page.
Optimization:

How would you optimize the queries for high traffic scenarios (e.g., indexing, caching)?


---

## Submission Instructions

1. **Clone This Repository**: Fork this repository and set up your environment.
2. **Complete the Tasks**: Implement the tasks in the respective directories for each challenge.
3. **Test Your Work**: Ensure your APIs, authentication, authorization, and queries work as expected.
4. **Submit Your Solution**: Push your completed code to your public GitHub repository and share the link with us.


---
# 📤 Submission Reminder

You have 2 days.

Fork → Implement → Push → Send GitHub link to:

careers@fekracorp.com

Good luck.

---

## Solution Overview

This repository contains a complete implementation of both challenges.

### Challenge 1 — REST API
Located in [`challenge-1/`](challenge-1/). See the [Challenge 1 README](challenge-1/README.md) for setup and API usage.

**Implemented:**
- `POST /auth/login` — JWT authentication
- `POST /products` — Create product (admin only)
- `GET /products` — List products with pagination (10/page)
- `GET /products/:id` — Get single product
- `PUT /products/:id` — Update product (admin only)
- `DELETE /products/:id` — Delete product (admin only)
- Express Validator on POST/PUT
- JWT auth + admin authorization middleware
- MongoDB with Mongoose

### Challenge 2 — Query Optimization
Located in [`challenge-2/`](challenge-2/). See the [Challenge 2 README](challenge-2/README.md).

**Implemented:**
- PostgreSQL query with price filter, sort, and pagination
- MongoDB query with category filter, sort, and pagination
- Optimization notes (indexing, caching, scaling)

### Quick Start

**Option A — Local MongoDB (recommended on Windows if already installed)**

If MongoDB is installed as a Windows service (check: `Get-Service MongoDB`), skip Docker and run:

```powershell
cd challenge-1
npm install
copy .env.example .env
npm start
```

**Option B — MongoDB via Docker**

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) to be **running** first, then:

```powershell
docker compose up -d
cd challenge-1
npm install
copy .env.example .env
npm start
```

> **Docker error:** `open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified`  
> Docker Desktop is not running. Either **start Docker Desktop** and retry, or use **Option A** with your local MongoDB service.

API available at `http://localhost:3000`. Demo admin login: `admin` / `admin123`.

