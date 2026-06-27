import express from 'express';
import { Student } from '../models/Student.js';

export const studentRouter = express.Router();

studentRouter.get('/', async (_request, response) => {
  const students = await Student.find().sort({ createdAt: -1 });
  response.json(students);
});

studentRouter.post('/', async (request, response) => {
  try {
    const student = await Student.create(request.body);
    response.status(201).json(student);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});
