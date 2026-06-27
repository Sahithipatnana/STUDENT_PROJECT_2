export default function AssignmentCard({ assignment }) {
  return (
    <article className="record-card">
      <div className="record-head">
        <div className="avatar accent-avatar">{assignment.subject.slice(0, 2).toUpperCase()}</div>
        <div>
          <h3>{assignment.title}</h3>
          <p>
            {assignment.subject} · Due {new Date(assignment.dueDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <dl className="mini-details">
        <div>
          <dt>Max Score</dt>
          <dd>{assignment.maxScore}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{assignment.status}</dd>
        </div>
        <div>
          <dt>Description</dt>
          <dd>{assignment.description}</dd>
        </div>
      </dl>
    </article>
  );
}
