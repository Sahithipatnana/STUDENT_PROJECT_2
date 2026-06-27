import { useEffect, useState } from 'react';
import { api } from '../api.js';

const initialForm = {
  studentName: '',
  assignmentId: '',
  submittedAt: '',
  score: 0,
  status: 'Pending Review',
  feedback: '',
};

export default function Submissions() {
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function loadData() {
    try {
      const [studentRecords, assignmentRecords, submissionRecords] = await Promise.all([
        api.listStudents(),
        api.listAssignments(),
        api.listSubmissions(),
      ]);
      setStudents(studentRecords);
      setAssignments(assignmentRecords);
      setSubmissions(submissionRecords);
      setError('');
    } catch (loadError) {
      setError(loadError.message);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const assignment = assignments.find((item) => item._id === form.assignmentId);

    try {
      setSaving(true);
      await api.createSubmission({
        ...form,
        assignmentTitle: assignment?.title || '',
      });
      setForm(initialForm);
      await loadData();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(id, status) {
    try {
      await api.updateSubmissionStatus(id, status);
      await loadData();
    } catch (updateError) {
      setError(updateError.message);
    }
  }

  return (
    <section className="page-shell page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Submission center</p>
          <h1>Review student submissions</h1>
        </div>
        <span className="pill">{submissions.length} submissions</span>
      </div>

      {error && <p className="status-text error-text">{error}</p>}

      <div className="content-grid">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Add submission</h2>
          <div className="form-grid">
            <label>
              <span>Student</span>
              <select
                value={form.studentName}
                onChange={(event) =>
                  setForm({ ...form, studentName: event.target.value })
                }
                required
              >
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student._id || student.rollNumber} value={student.name}>
                    {student.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Assignment</span>
              <select
                value={form.assignmentId}
                onChange={(event) =>
                  setForm({ ...form, assignmentId: event.target.value })
                }
                required
              >
                <option value="">Select an assignment</option>
                {assignments.map((assignment) => (
                  <option key={assignment._id || assignment.title} value={assignment._id}>
                    {assignment.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Submitted on</span>
              <input
                type="date"
                value={form.submittedAt}
                onChange={(event) =>
                  setForm({ ...form, submittedAt: event.target.value })
                }
                required
              />
            </label>
            <label>
              <span>Score</span>
              <input
                type="number"
                min="0"
                value={form.score}
                onChange={(event) =>
                  setForm({ ...form, score: Number(event.target.value) })
                }
                required
              />
            </label>
            <label>
              <span>Status</span>
              <select
                value={form.status}
                onChange={(event) => setForm({ ...form, status: event.target.value })}
              >
                <option>Pending Review</option>
                <option>Reviewed</option>
                <option>Resubmission Needed</option>
              </select>
            </label>
            <label className="full-span">
              <span>Feedback</span>
              <textarea
                rows="4"
                value={form.feedback}
                onChange={(event) =>
                  setForm({ ...form, feedback: event.target.value })
                }
              />
            </label>
          </div>
          <button className="button button-primary" disabled={saving} type="submit">
            {saving ? 'Saving...' : 'Save submission'}
          </button>
        </form>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Assignment</th>
                <th>Submitted</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission._id}>
                  <td>{submission.studentName}</td>
                  <td>{submission.assignmentTitle}</td>
                  <td>{new Date(submission.submittedAt).toLocaleDateString()}</td>
                  <td>{submission.score}</td>
                  <td>
                    <select
                      value={submission.status}
                      onChange={(event) =>
                        handleStatusChange(submission._id, event.target.value)
                      }
                    >
                      <option>Pending Review</option>
                      <option>Reviewed</option>
                      <option>Resubmission Needed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
