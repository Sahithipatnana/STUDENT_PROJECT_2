import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    dueDate: { type: Date, required: true },
    maxScore: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ['Open', 'Closed', 'Reviewing'],
      default: 'Open',
    },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Assignment = mongoose.model('Assignment', assignmentSchema);
