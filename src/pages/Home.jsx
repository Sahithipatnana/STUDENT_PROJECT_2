import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { siteConfig } from '../siteConfig.js';

export default function Home() {
  const [data, setData] = useState({
    students: [],
    assignments: [],
    submissions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const [students, assignments, submissions] = await Promise.all([
          api.listStudents(),
          api.listAssignments(),
          api.listSubmissions(),
        ]);
        setData({ students, assignments, submissions });
        setError('');
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const pendingReviews = data.submissions.filter(
    (submission) => submission.status === 'Pending Review',
  ).length;

  const upcomingAssignments = data.assignments
    .slice()
    .sort((first, second) => new Date(first.dueDate) - new Date(second.dueDate))
    .slice(0, 3);

  return (
    <section className="page-shell dashboard-grid">
      <div className="hero-panel">
        <p className="eyebrow">{siteConfig.heroLabel}</p>
        <h1>{siteConfig.heroTitle}</h1>
        <p className="hero-copy">{siteConfig.heroCopy}</p>

        <div className="stats-row">
          <article>
            <strong>{data.students.length}</strong>
            <span>Registered students</span>
          </article>
          <article>
            <strong>{data.assignments.length}</strong>
            <span>Assignments published</span>
          </article>
          <article>
            <strong>{data.submissions.length}</strong>
            <span>Total submissions</span>
          </article>
          <article>
            <strong>{pendingReviews}</strong>
            <span>Pending reviews</span>
          </article>
        </div>

        {loading && <p className="status-text">Loading dashboard data...</p>}
        {error && (
          <p className="status-text error-text">
            Backend not reachable: {error}
          </p>
        )}
      </div>

      <aside className="panel-stack">
        <article className="side-panel">
          <p className="eyebrow">Upcoming work</p>
          {upcomingAssignments.length > 0 ? (
            <div className="timeline-list">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment._id || assignment.title} className="timeline-item">
                  <strong>{assignment.title}</strong>
                  <span>
                    {assignment.subject} ·{' '}
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted-copy">Assignments will appear here after the API loads.</p>
          )}
        </article>

        <article className="side-panel emphasis-panel">
          <p className="eyebrow">Project stack</p>
          <h2>React + Express + MongoDB</h2>
          <p>
            The frontend consumes REST APIs while MongoDB stores students,
            assignments, and submission reviews.
          </p>
        </article>
      </aside>
    </section>
  );
}
