import { HashRouter, Route, Routes } from 'react-router-dom';
import AssignmentCard from './components/AssignmentCard.jsx';
import Navbar from './components/Navbar.jsx';
import { siteConfig, themeStyle } from './siteConfig.js';
import About from './pages/About.jsx';
import Assignments from './pages/Assignments.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Students from './pages/Students.jsx';
import Submissions from './pages/Submissions.jsx';

export default function App() {
  return (
    <HashRouter>
      <div className="app-shell" style={themeStyle}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/assignments" element={<Assignments Card={AssignmentCard} />} />
            <Route path="/submissions" element={<Submissions />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <p>
            {siteConfig.productName} for {siteConfig.candidateName}
          </p>
        </footer>
      </div>
    </HashRouter>
  );
}
