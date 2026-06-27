import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-shell not-found">
      <p className="eyebrow">404 page</p>
      <h1>That page is not available.</h1>
      <p className="lead">
        Use the navigation menu to return to the assignment dashboard.
      </p>
      <Link className="button button-primary" to="/">
        Back to dashboard
      </Link>
    </section>
  );
}
