const bcrypt = require('bcryptjs');

// Demo users — passwords are hashed at startup
const users = [
  {
    id: '1',
    username: 'admin',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
  },
  {
    id: '2',
    username: 'user',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
  },
];

function findUserByUsername(username) {
  return users.find((u) => u.username === username);
}

module.exports = { findUserByUsername };
