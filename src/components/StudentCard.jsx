export default function StudentCard({ student }) {
  return (
    <article className="record-card">
      <div className="record-head">
        <div className="avatar">{student.name.slice(0, 2).toUpperCase()}</div>
        <div>
          <h3>{student.name}</h3>
          <p>
            {student.course} · {student.year}
          </p>
        </div>
      </div>

      <dl className="mini-details">
        <div>
          <dt>Roll No</dt>
          <dd>{student.rollNumber}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{student.email}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{student.status}</dd>
        </div>
      </dl>
    </article>
  );
}
