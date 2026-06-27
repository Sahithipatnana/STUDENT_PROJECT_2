import { Assignment } from '../models/Assignment.js';
import { Student } from '../models/Student.js';
import { Submission } from '../models/Submission.js';

export async function seedDatabase() {
  const studentCount = await Student.countDocuments();

  if (studentCount > 0) {
    return;
  }

  const students = await Student.insertMany([
    {
      name: 'Ananya Rao',
      email: 'ananya.rao@example.com',
      course: 'BCA',
      year: 'Third Year',
      rollNumber: 'AS101',
      status: 'Active',
    },
    {
      name: 'Sanjana Devi',
      email: 'sanjana.devi@example.com',
      course: 'B.Sc Data Science',
      year: 'Second Year',
      rollNumber: 'AS102',
      status: 'Active',
    },
    {
      name: 'Meghana Priya',
      email: 'meghana.priya@example.com',
      course: 'MCA',
      year: 'First Year',
      rollNumber: 'AS103',
      status: 'Needs Support',
    },
  ]);

  const assignments = await Assignment.insertMany([
    {
      title: 'UI Prototype Report',
      subject: 'Web Technology',
      dueDate: new Date('2026-07-05'),
      maxScore: 100,
      status: 'Open',
      description: 'Prepare screens and explanation for the student portal interface.',
    },
    {
      title: 'MongoDB Schema Draft',
      subject: 'Database Systems',
      dueDate: new Date('2026-07-09'),
      maxScore: 50,
      status: 'Reviewing',
      description: 'Design collections for students, assignments, and submissions.',
    },
  ]);

  await Submission.insertMany([
    {
      studentName: students[0].name,
      assignmentId: assignments[0]._id,
      assignmentTitle: assignments[0].title,
      submittedAt: new Date('2026-07-03'),
      score: 88,
      status: 'Reviewed',
      feedback: 'Clear layout and strong explanation.',
    },
    {
      studentName: students[2].name,
      assignmentId: assignments[1]._id,
      assignmentTitle: assignments[1].title,
      submittedAt: new Date('2026-07-04'),
      score: 0,
      status: 'Pending Review',
      feedback: 'Waiting for faculty review.',
    },
  ]);
}
