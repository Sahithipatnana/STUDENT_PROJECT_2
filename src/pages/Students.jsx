import { useEffect, useState } from 'react';
import { api } from '../api.js';
import StudentCard from '../components/StudentCard.jsx';

const initialForm = {
  name: '',
  email: '',
  course: '',
  year: '',
  rollNumber: '',
  status: 'Active',
};

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function loadStudents() {
    try {
      const records = await api.listStudents();
      setStudents(records);
      setError('');
    } catch (loadError) {
      setError(loadError.message);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      await api.createStudent(form);
      setForm(initialForm);
      await loadStudents();
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
          <p className="eyebrow">Student registry</p>
          <h1>Manage student records</h1>
        </div>
        <span className="pill">{students.length} students</span>
      </div>

      {error && <p className="status-text error-text">{error}</p>}

      <div className="content-grid">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Add student</h2>
          <div className="form-grid">
            <label>
              <span>Name</span>
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                required
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                required
              />
            </label>
            <label>
              <span>Course</span>
              <input
                value={form.course}
                onChange={(event) => setForm({ ...form, course: event.target.value })}
                required
              />
            </label>
            <label>
              <span>Year</span>
              <input
                value={form.year}
                onChange={(event) => setForm({ ...form, year: event.target.value })}
                required
              />
            </label>
            <label>
              <span>Roll number</span>
              <input
                value={form.rollNumber}
                onChange={(event) =>
                  setForm({ ...form, rollNumber: event.target.value })
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
                <option>Active</option>
                <option>Needs Support</option>
                <option>Completed</option>
              </select>
            </label>
          </div>
          <button className="button button-primary" disabled={saving} type="submit">
            {saving ? 'Saving...' : 'Save student'}
          </button>
        </form>

        <div className="cards-grid">
          {students.map((student) => (
            <StudentCard key={student._id || student.rollNumber} student={student} />
          ))}
        </div>
      </div>
    </section>
  );
}
