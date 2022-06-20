import express from 'express';

import Note from '../models/note.js';



const notesRoute = express.Router();



notesRoute.get('/', async function (request, reply) {
  try {
    const notes = await Note.find({});

    reply.status(200).json({
      success: true,
      list: true,
      data: notes,
    });
  } catch (err) {
    reply.status(500).json({
      success: false,
      error: err.toString(),
    });
  }
});



notesRoute.get('/:id', async function (request, response) {
  try {
    const notes = await Note.findById(request.params.id);

    return response.status(200).json({
      status: 'success',
      data: notes,
    });
  } catch (err) {
    return response.status(404).json({
      status: 'fail',
      error: err.toString(),
    });
  }
});



export default notesRoute;
