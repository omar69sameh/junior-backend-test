const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByUsername } = require('../data/users');

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = findUserByUsername(username);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password.',
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password.',
    });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    },
  });
};

module.exports = { login };
