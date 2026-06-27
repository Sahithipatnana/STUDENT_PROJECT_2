import express from 'express';
import { Submission } from '../models/Submission.js';

export const submissionRouter = express.Router();

submissionRouter.get('/', async (_request, response) => {
  const submissions = await Submission.find().sort({ submittedAt: -1 });
  response.json(submissions);
});

submissionRouter.post('/', async (request, response) => {
  try {
    const submission = await Submission.create(request.body);
    response.status(201).json(submission);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

submissionRouter.patch('/:id/status', async (request, response) => {
  try {
    const submission = await Submission.findByIdAndUpdate(
      request.params.id,
      { status: request.body.status },
      { new: true, runValidators: true },
    );

    if (!submission) {
      return response.status(404).json({ message: 'Submission not found' });
    }

    return response.json(submission);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});
