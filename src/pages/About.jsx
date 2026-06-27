import { siteConfig } from '../siteConfig.js';

const features = [
  'Student registration with MongoDB persistence',
  'Assignment creation and due-date management',
  'Submission tracking with review status updates',
  'React dashboard that consumes REST APIs from Express',
];

export default function About() {
  return (
    <section className="page-shell narrow-page">
      <p className="eyebrow">About this project</p>
      <h1>{siteConfig.productName} is a full-stack student workflow portal.</h1>
      <p className="lead">
        This second project is intentionally different from the first dashboard-only
        project. It adds backend APIs, MongoDB collections, and data entry forms for
        a more complete academic management system.
      </p>

      <div className="feature-list">
        {features.map((feature, index) => (
          <article key={feature}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{feature}</h2>
            <p>
              Suitable for college mini-project demonstration, CRUD explanation,
              and database flow presentation.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
