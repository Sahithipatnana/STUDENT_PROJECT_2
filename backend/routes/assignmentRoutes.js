import express from 'express';
import { Assignment } from '../models/Assignment.js';

export const assignmentRouter = express.Router();

assignmentRouter.get('/', async (_request, response) => {
  const assignments = await Assignment.find().sort({ dueDate: 1 });
  response.json(assignments);
});

assignmentRouter.post('/', async (request, response) => {
  try {
    const assignment = await Assignment.create(request.body);
    response.status(201).json(assignment);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});
