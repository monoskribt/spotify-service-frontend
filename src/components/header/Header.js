import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import { useHandleAuth } from "../authentication/HandleAuthenticaion";

const Header = () => {
  const {isAuthenticated, login, logout} = useHandleAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container-header">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <header className="custom-header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  Spotify Service
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <a className="nav-link" href="/user">
                        Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      {isAuthenticated ? (
                        <a className="nav-link" href="#" onClick={handleLogout}>
                          Logout
                        </a>
                      ) : (
                        <a className="nav-link" href="#" onClick={login}>
                          Login
                        </a>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </header>
        </div>
      </div>
    </div>
  );
};

export default Header;
