/**
 * Challenge 2: MongoDB Query
 * Retrieve products by category (e.g. "Electronics"),
 * sorted by price descending, 5 products per page.
 *
 * Usage with Mongoose:
 *   const page = 2; // 1-based page number
 *   const products = await getProductsByCategory('Electronics', page);
 */

const PRODUCTS_PER_PAGE = 5;

/**
 * @param {import('mongoose').Model} Product - Mongoose Product model
 * @param {string} category - Category to filter by
 * @param {number} page - Page number (1-based)
 */
async function getProductsByCategory(Product, category, page = 1) {
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * PRODUCTS_PER_PAGE;

  const [products, total] = await Promise.all([
    Product.find({ category })
      .sort({ price: -1 })
      .skip(skip)
      .limit(PRODUCTS_PER_PAGE)
      .lean(),
    Product.countDocuments({ category }),
  ]);

  return {
    products,
    pagination: {
      currentPage: safePage,
      totalPages: Math.ceil(total / PRODUCTS_PER_PAGE),
      totalProducts: total,
      productsPerPage: PRODUCTS_PER_PAGE,
    },
  };
}

// Raw MongoDB shell equivalent:
//
// db.products.find({ category: "Electronics" })
//   .sort({ price: -1 })
//   .skip(0)    // (page - 1) * 5
//   .limit(5)

module.exports = { getProductsByCategory };
