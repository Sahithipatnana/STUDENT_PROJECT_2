import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/db.js';
import { assignmentRouter } from './routes/assignmentRoutes.js';
import { studentRouter } from './routes/studentRoutes.js';
import { submissionRouter } from './routes/submissionRoutes.js';
import { seedDatabase } from './seed/seedData.js';

const app = express();
const port = process.env.PORT || 5000;
const mongoUri =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_assignment_system';
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('CORS blocked for this origin'));
    },
  }),
);
app.use(express.json());

app.get('/', (_request, response) => {
  response.json({
    project: 'Sahithi Student Assignment Submission System API',
    status: 'running',
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api/students', studentRouter);
app.use('/api/assignments', assignmentRouter);
app.use('/api/submissions', submissionRouter);

connectDatabase(mongoUri)
  .then(async () => {
    await seedDatabase();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });
