require('dotenv').config();

const net = require('net');
const app = require('./app');
const connectDB = require('./config/db');

const PREFERRED_PORT = parseInt(process.env.PORT, 10) || 3000;
const MAX_PORT_ATTEMPTS = 20;

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const tester = net
      .createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        tester.close(() => resolve(true));
      })
      .listen(port);
  });
}

async function findAvailablePort(startPort) {
  for (let i = 0; i < MAX_PORT_ATTEMPTS; i++) {
    const port = startPort + i;
    if (await isPortAvailable(port)) {
      return port;
    }
  }

  throw new Error(
    `No available port found between ${startPort} and ${startPort + MAX_PORT_ATTEMPTS - 1}`
  );
}

const startServer = async () => {
  try {
    await connectDB();

    const port = await findAvailablePort(PREFERRED_PORT);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);

      if (port !== PREFERRED_PORT) {
        console.log(
          `Port ${PREFERRED_PORT} was in use — switched to ${port}`
        );
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
