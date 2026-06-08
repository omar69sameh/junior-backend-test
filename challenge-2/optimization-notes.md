# Challenge 2: Query Optimization for High Traffic

## PostgreSQL (price range + pagination)

### Indexing
```sql
-- Composite index supports WHERE price BETWEEN ... ORDER BY price
CREATE INDEX idx_products_price ON products (price);

-- If queries often filter by category AND price:
CREATE INDEX idx_products_category_price ON products (category, price);
```

### Caching
- Cache paginated results in **Redis** with a short TTL (e.g. 60 seconds).
- Cache key example: `products:price:50-200:page:1`
- Invalidate cache when products in that price range are created, updated, or deleted.

### Other techniques
- Use **connection pooling** (e.g. PgBouncer) to avoid connection exhaustion.
- Run `EXPLAIN ANALYZE` on queries to verify index usage.
- For very large tables, consider **keyset pagination** (cursor-based) instead of `OFFSET` to avoid scanning skipped rows.

---

## MongoDB (category filter + sort by price)

### Indexing
```javascript
// Supports find({ category }).sort({ price: -1 })
db.products.createIndex({ category: 1, price: -1 });
```

### Caching
- Cache popular category pages in Redis: `products:category:Electronics:page:1`
- Use MongoDB's built-in query cache for repeated identical queries (enabled by default in recent versions).

### Other techniques
- Use `.lean()` in Mongoose to return plain JS objects (faster, less memory).
- Project only needed fields: `.select('name category price quantity')`
- For read-heavy workloads, use **MongoDB replica sets** and route reads to secondaries.
- Shard by `category` if certain categories dominate traffic.

---

## General high-traffic strategies

| Strategy | Benefit |
|----------|---------|
| **Redis caching** | Reduces database load for repeated reads |
| **Database indexes** | Speeds up filter + sort operations |
| **CDN / API rate limiting** | Protects backend from abuse |
| **Read replicas** | Scales read traffic horizontally |
| **Pagination limits** | Prevents unbounded result sets |
