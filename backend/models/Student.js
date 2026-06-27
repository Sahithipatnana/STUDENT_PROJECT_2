import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    course: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    rollNumber: { type: String, required: true, unique: true, trim: true },
    status: {
      type: String,
      enum: ['Active', 'Needs Support', 'Completed'],
      default: 'Active',
    },
  },
  { timestamps: true },
);

export const Student = mongoose.model('Student', studentSchema);
