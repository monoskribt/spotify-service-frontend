import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import "./Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkIsAuthenticated = () => {
    const refreshToken = Cookies.get("refresh_token");
    if (refreshToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkIsAuthenticated(); 
  }, []);



  const handleLogin = () => {
    fetch("http://localhost:8080/api/login")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to get login URL");
        }
        return res.text();
      })
      .then((loginUrl) => {
        window.location.href = loginUrl;
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("Failed to start Spotify login process.");
      });
  };


  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setIsAuthenticated(false); 
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <header className="custom-header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  Spotify Clone
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
                      <a className="nav-link active" href="/">
                        Home
                      </a>
                    </li>
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
                        <a className="nav-link" href="#" onClick={handleLogin}>
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
