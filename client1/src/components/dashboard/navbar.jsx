import React from "react";
import { Link } from "react-router-dom";
import "../auth/navbar.css";
import swal from "sweetalert";

export default function navbar() {
  // logout function
  const logout = () => {
    localStorage.clear().then(() => {
      swal("Success", "Logged out successfully", "success").then(() => {
        window.location.href = "/";
      });
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand m-1" href="/">
            MGM's CRM Tool
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item active m-2">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item active m-2">
                <Link className="nav-link" to="/dashboard/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item active m-2">
                <Link className="nav-link" to="/dashboard/segments">
                  Configure Segments
                </Link>
              </li>
              <li className="nav-item active m-2">
                <Link className="nav-link" to="/dashboard/smtpconfig">
                  Configure SMTP
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <button className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
