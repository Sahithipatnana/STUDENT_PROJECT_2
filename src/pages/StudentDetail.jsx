import { Link, useNavigate, useParams } from 'react-router-dom';
import { students } from '../data/students.js';

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = students.find((item) => item.id === Number(id));

  if (!student) {
    return (
      <section className="page-shell narrow-page empty-state">
        <h1>Student not found</h1>
        <p>The student profile you are looking for is not available.</p>
        <Link className="button button-primary" to="/students">
          Back to students
        </Link>
      </section>
    );
  }

  return (
    <section className="page-shell detail-layout">
      <div className="profile-panel">
        <button className="back-button" type="button" onClick={() => navigate(-1)}>
          Back
        </button>
        <span
          className="avatar avatar-large"
          style={{ '--avatar-color': student.color }}
          aria-hidden="true"
        >
          {student.name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .slice(0, 2)}
        </span>
        <p className="eyebrow">{student.status}</p>
        <h1>{student.name}</h1>
        <p className="lead">{student.course}</p>
        <div className="profile-actions">
          <a className="button button-primary" href={`mailto:${student.email}`}>
            Email student
          </a>
          <Link className="button button-secondary" to="/students">
            Student list
          </Link>
        </div>
      </div>

      <div className="detail-stack">
        <article className="detail-card">
          <h2>Academic summary</h2>
          <div className="summary-grid">
            <div>
              <span>Year</span>
              <strong>{student.year}</strong>
            </div>
            <div>
              <span>Attendance</span>
              <strong>{student.attendance}%</strong>
            </div>
            <div>
              <span>Grade</span>
              <strong>{student.grade}</strong>
            </div>
            <div>
              <span>Advisor</span>
              <strong>{student.advisor}</strong>
            </div>
          </div>
        </article>

        <article className="detail-card">
          <h2>Contact details</h2>
          <dl className="info-list">
            <div>
              <dt>Email</dt>
              <dd>{student.email}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{student.phone}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{student.location}</dd>
            </div>
          </dl>
        </article>

        <article className="detail-card">
          <h2>Skills and current project</h2>
          <div className="skill-row">
            {student.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <p className="project-note">{student.recentProject}</p>
        </article>
      </div>
    </section>
  );
}
