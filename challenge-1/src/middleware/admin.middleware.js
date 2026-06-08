/**
 * Authorization middleware — only users with role "admin" may proceed.
 * Must run after authenticate middleware so req.user is available.
 */
const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden. Admin access required.',
    });
  }

  next();
};

module.exports = { authorizeAdmin };
