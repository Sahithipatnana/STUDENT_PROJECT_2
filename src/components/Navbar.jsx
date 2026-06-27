import { NavLink } from 'react-router-dom';
import { siteConfig } from '../siteConfig.js';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/students', label: 'Students' },
  { to: '/assignments', label: 'Assignments' },
  { to: '/submissions', label: 'Submissions' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand" aria-label={`${siteConfig.productName} home`}>
        <span className="brand-mark">{siteConfig.brandMark}</span>
        <span>
          <strong>{siteConfig.productName}</strong>
          <small>{siteConfig.tagline}</small>
        </span>
      </NavLink>

      <nav className="nav-links" aria-label="Primary navigation">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
