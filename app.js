import express from 'express';
import 'dotenv/config';

import logMiddleware from './middlewares/log.middleware.js';
import admins from './routes/admins.route.js';
import notes from './routes/notes.route.js';

import atlasConnection from './database/mongo-connection.js';



await atlasConnection();

const port = process.env.PORT;
const app = express();



// Logs middleware
app.use(logMiddleware);

// Json-parser middleware
app.use(express.json());

app.use(admins);

app.use(notes);

// Default error for non existent/implemented paths
app.use(
    //'/',
    function (request, reply) {
        reply.status(500).json({
            success: false,
            code: 1001,
            error: 'Resource not found'
        });
    }
);




if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
}

export default app;
