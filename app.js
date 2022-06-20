// IMPORTS

// Packages
import express from 'express';
import 'dotenv/config';

// Middlewares
import logMiddleware from './middlewares/log.middleware.js';

// Routes
import admins from './routes/admins.route.js';
import users from './routes/users.route.js';
import notesGet from './routes/notes-get.route.js';
import notesPost from './routes/notes-post.route.js';
import notesPut from './routes/notes-put.route.js';

// Database connection
import atlasConnection from './database/mongo-connection.js';

// SETUP

// Parse env
const port = process.env.PORT;

// Wait for database connection
await atlasConnection();

// Create Express server
const app = express();

// MIDDLEWARE

// Logs middleware
app.use(logMiddleware);

// Json-parser middleware
app.use(express.json());

// ROUTES

// Admins
app.use('/api/admins', admins);

// Users
app.use('/api/users', users);

// Notes
app.use('/api/notes', notesGet);
app.use('/api/notes', notesPost);
app.use('/api/notes', notesPut);

// Default error for non existent/implemented paths
app.use(
  //'/',
  function (request, reply) {
    reply.status(500).json({
      success: false,
      code: 1001,
      error: 'Resource not found',
    });
  },
);

// DEBUG
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

export default app;
