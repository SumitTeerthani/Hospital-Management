import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import Appointments from './componenets/appointment';
import Doctors from './componenets/doctor';
import Patients from './componenets/patients';
import './App.css';

// Navbar component to handle navigation and active link styles
const Navbar = () => {
  const location = useLocation();

  const isLinkActive = (path) => location.pathname === path;

  return (
    <nav>
      <ul>
        <li className={isLinkActive('/appointments') ? 'active' : ''}>
          <Link to="/appointments">Appointments</Link>
        </li>
        <li className={isLinkActive('/doctors') ? 'active' : ''}>
          <Link to="/doctors">Doctors</Link>
        </li>
        <li className={isLinkActive('/patients') ? 'active' : ''}>
          <Link to="/patients">Patients</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1 style={{ color: 'green' }}> Hospital Management App</h1>
        <Navbar />
        <Routes>
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/" element={<Appointments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
