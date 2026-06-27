import { useEffect, useState } from 'react';
import { api } from '../api.js';

const initialForm = {
  title: '',
  subject: '',
  dueDate: '',
  maxScore: 100,
  status: 'Open',
  description: '',
};

export default function Assignments({ Card }) {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function loadAssignments() {
    try {
      const records = await api.listAssignments();
      setAssignments(records);
      setError('');
    } catch (loadError) {
      setError(loadError.message);
    }
  }

  useEffect(() => {
    loadAssignments();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      await api.createAssignment(form);
      setForm(initialForm);
      await loadAssignments();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page-shell page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Assignment board</p>
          <h1>Publish and track assignments</h1>
        </div>
        <span className="pill">{assignments.length} assignments</span>
      </div>

      {error && <p className="status-text error-text">{error}</p>}

      <div className="content-grid">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Create assignment</h2>
          <div className="form-grid">
            <label>
              <span>Title</span>
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                required
              />
            </label>
            <label>
              <span>Subject</span>
              <input
                value={form.subject}
                onChange={(event) => setForm({ ...form, subject: event.target.value })}
                required
              />
            </label>
            <label>
              <span>Due date</span>
              <input
                type="date"
                value={form.dueDate}
                onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
                required
              />
            </label>
            <label>
              <span>Max score</span>
              <input
                type="number"
                min="1"
                value={form.maxScore}
                onChange={(event) =>
                  setForm({ ...form, maxScore: Number(event.target.value) })
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
                <option>Open</option>
                <option>Closed</option>
                <option>Reviewing</option>
              </select>
            </label>
            <label className="full-span">
              <span>Description</span>
              <textarea
                rows="4"
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                required
              />
            </label>
          </div>
          <button className="button button-primary" disabled={saving} type="submit">
            {saving ? 'Saving...' : 'Publish assignment'}
          </button>
        </form>

        <div className="cards-grid">
          {assignments.map((assignment) => (
            <Card key={assignment._id || assignment.title} assignment={assignment} />
          ))}
        </div>
      </div>
    </section>
  );
}
