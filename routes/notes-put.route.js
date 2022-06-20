import express from 'express';
import Note from '../models/note.js';
import { body, validationResult } from 'express-validator';

const notesRoute = express.Router();

notesRoute.put(
    '/:id',
    
    body('user').isLength({ min: 1, max: 50 }),
    body('title').isLength({ min: 5, max: 30 }),
    body('content').isLength({ min: 1, max: 100 }),
    body('date').isDate(),
    
    async function (request, response) {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          status: 'fail',
          errors: errors.array()
        });
      }
      
      try {
        const nota = {
          user: request.body.user,
          content: request.body.content,
          title: request.body.title,
          data: request.body.data,
        };
        const note = await Note.findByIdAndUpdate(request.params.id, nota, {
          returnOriginal: false,
        });

        return response.status(200).json({
          status: 'success',
          data: note,
        });
      } catch (err) {
        return response.status(404).json({
          status: 'fail',
          error: err.toString(),
        });
      }
    },
);

export default notesRoute;
