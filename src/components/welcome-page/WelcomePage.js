import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./image/spotify-logo.png";
import "./WelcomePage.css";
import { useHandleAuth } from "../authentication/HandleAuthenticaion";

const WelcomePage = () => {
  const { isAuthenticated, externalLogin } = useHandleAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="welcome-container">
        <div className="welcome-container-info">
          <div className="spotify-logo">
            <img src={logo} alt="Spotify Logo" />
            <h1>
              <b className="spotify-text">Spotify</b>
              <span className="service-text">SERVICE</span>
            </h1>
          </div>
          <div className="welcome-text">
            <p>
              Welcome to the Spotify Service Application! Log in to manage your
              playlists, tracks, and artists.
            </p>
          </div>
          <button onClick={externalLogin}>Log In</button>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
