import React from "react";
import logo from "./image/spotify-logo.png";
import "./Login.css";

const WelcomeContent = ({ onLogin }) => {
  return (
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
        <button onClick={onLogin}>Log In</button>
      </div>
    </div>
  );
};

export default WelcomeContent;
