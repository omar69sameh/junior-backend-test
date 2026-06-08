-- Challenge 2: PostgreSQL Query
-- Fetch products with price between $50 and $200,
-- ordered by price ascending, with pagination (10 per page).
--
-- Usage: replace :page with the page number (1-based).
-- Page 1 → OFFSET 0, Page 2 → OFFSET 10, etc.

SELECT
    id,
    name,
    category,
    price,
    quantity,
    created_at,
    updated_at
FROM products
WHERE price BETWEEN 50 AND 200
ORDER BY price ASC
LIMIT 10
OFFSET (:page - 1) * 10;

-- Example for page 1:
-- LIMIT 10 OFFSET 0

-- Example for page 3:
-- LIMIT 10 OFFSET 20

-- Count total matching products (useful for pagination metadata):
SELECT COUNT(*) AS total
FROM products
WHERE price BETWEEN 50 AND 200;
