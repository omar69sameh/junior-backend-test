# Challenge 2 — Database Query Optimization

This folder contains optimized queries and performance notes for both SQL and NoSQL databases.

## Files

| File | Description |
|------|-------------|
| `queries.sql` | PostgreSQL query — products priced $50–$200, sorted ascending, 10 per page |
| `queries.mongodb.js` | MongoDB/Mongoose query — products by category, sorted by price desc, 5 per page |
| `optimization-notes.md` | Indexing, caching, and scaling strategies for high traffic |

## PostgreSQL Example

```sql
SELECT id, name, category, price, quantity, created_at, updated_at
FROM products
WHERE price BETWEEN 50 AND 200
ORDER BY price ASC
LIMIT 10 OFFSET 0;  -- page 1
```

## MongoDB Example

```javascript
db.products.find({ category: "Electronics" })
  .sort({ price: -1 })
  .skip(0)
  .limit(5);
```

See `optimization-notes.md` for indexing and caching recommendations.
