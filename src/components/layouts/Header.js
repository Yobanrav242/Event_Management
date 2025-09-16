import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from '../../assets/clg_logo.png'

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        {/* 1. Logo + College Name */}
        <a className="navbar-brand d-flex align-items-center" href="#home">
          <img
            src={Logo}
            alt="Logo"
            className="me-3 rounded-circle"
            height="80px"
            width="30px"
          />
          <span>St.Joseph's College</span>
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon bg-light rounded"></span>
        </button>

        {/* 2. Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#events">
                Events
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </li>
          </ul>

          {/* 3. Login Button (separate route) */}
          <Link to="/login" className="btn btn-outline-light ms-lg-3">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
