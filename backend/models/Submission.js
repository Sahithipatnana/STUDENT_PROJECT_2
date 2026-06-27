import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required: true,
    },
    assignmentTitle: { type: String, required: true, trim: true },
    submittedAt: { type: Date, required: true },
    score: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['Pending Review', 'Reviewed', 'Resubmission Needed'],
      default: 'Pending Review',
    },
    feedback: { type: String, default: '' },
  },
  { timestamps: true },
);

export const Submission = mongoose.model('Submission', submissionSchema);
