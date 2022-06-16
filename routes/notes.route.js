import express from 'express';

import Note from '../models/note.js';



const notesRoute = express.Router();



notesRoute.get(
    '/notes',
    async function (request, reply) {

        try {

            const notes = await Note.find({});

            reply.status(200).json({
                success: true,
                list: true,
                data: notes
            });

        } catch (err) {

            reply.status(500).json({
                success: false,
                error: err.toString()
            });

        }

    }
);



export default notesRoute;
