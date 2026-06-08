const express = require('express');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Product Inventory API — Challenge 1',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      login: 'POST /auth/login',
      listProducts: 'GET /products?page=1',
      getProduct: 'GET /products/:id',
      createProduct: 'POST /products (admin only)',
      updateProduct: 'PUT /products/:id (admin only)',
      deleteProduct: 'DELETE /products/:id (admin only)',
    },
    demoUsers: {
      admin: { username: 'admin', password: 'admin123', role: 'admin' },
      user: { username: 'user', password: 'user123', role: 'user' },
    },
    docs: 'See challenge-1/README.md for full usage examples',
  });
});

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Internal server error.',
  });
});

module.exports = app;
