import { useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuthToken } from '../../utils/authContext';

export default function Navbar() {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);
  const dropdown = useRef(null);
  const token = useAuthToken();

  function handleMobileNavDropdownClick() {
    if (isMobileNavActive) {
      const { classList } = dropdown.current;
      if (classList[0] === 'dropdown-active') {
        classList.remove('dropdown-active');
      } else {
        classList.add('dropdown-active');
      }
    }
  }
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo">
          <NavLink to="/">DevForms</NavLink>
        </h1>

        <nav id="navbar" className={`navbar ${isMobileNavActive && 'navbar-mobile'}`}>
          <ul>
            <li><NavLink className="nav-NavLink scrollto" to="/">Home</NavLink></li>
            <li><NavLink className="nav-NavLink scrollto" to="/pricing">Pricing</NavLink></li>
            <li><NavLink className="nav-NavLink scrollto" to="/api">API</NavLink></li>
            {
              token ? (
                <>
                  <li className="dropdown">
                    <Link to="/settings" className="nav-NavLink">
                      <span>Settings</span>
                      <i style={{ cursor: 'pointer' }} aria-hidden="true" onClick={handleMobileNavDropdownClick} className="fa-solid fa-angle-down" />
                    </Link>
                    <ul ref={dropdown}>
                      <li><NavLink to="/add-form">Add Form</NavLink></li>
                      <li><NavLink to="/settings">Payment & API</NavLink></li>
                      <li><NavLink to="/change-password">Change Password</NavLink></li>
                      <li><NavLink to="/logout">Logout</NavLink></li>
                    </ul>
                  </li>
                  <li><NavLink className="getstarted scrollto" to="/forms">Your Forms</NavLink></li>
                </>
              )
                : (
                  <>
                    <li><NavLink className="nav-NavLink scrollto" to="/login">Login</NavLink></li>
                    <li><NavLink className="getstarted scrollto" to="/register">Register</NavLink></li>
                  </>
                )
            }
          </ul>
          <i
            className={`mobile-nav-toggle ${isMobileNavActive ? 'fa-solid fa-xmark text-white mt-3' : 'fa-solid fa-bars'}`}
            onClick={() => setIsMobileNavActive(!isMobileNavActive)}
            aria-hidden="true"
          />
        </nav>
      </div>
    </header>
  );
}
