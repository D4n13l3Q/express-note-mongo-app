import express from 'express';
import Note from '../models/note.js';
import { body, validationResult } from 'express-validator';

const notesRoute = express.Router();

notesRoute.post(
    '/',
    
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
        const nota = new Note({
          user: request.body.user,
          title: request.body.title,
          content: request.body.content,
          date: request.body.date,
        });
        await nota.save();

        return response.status(201).json({
          status: 'success',
          data: nota
        });
      } catch (err) {
        return response.status(404).json({
          status: 'fail',
          error: err.toString()
        });
      }
    }
);

export default notesRoute;
