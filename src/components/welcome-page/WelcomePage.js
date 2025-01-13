import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import logo from "./image/spotify-logo.png";
import "./WelcomePage.css";
import { useHandleAuth } from "../authentication/HandleAuthenticaion";

const WelcomePage = () => {
  const { isAuthenticated } = useHandleAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user"); 
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 d-flex flex-column align-items-center custom-container-info">
            <div className="py-4"></div>
            <div className="col-md-2">
              <img
                src={logo}
                alt="Logo"
                className="img-fluid rounded mb-3"
              />
            </div>
            <div className="col-md-8 text-center">
              <p>Welcome to the Spotify Clone Application!</p>
              <p>
                Here you can manipulate your own main Spotify account, for
                example: obtain your tracks, playlist, artists, get info as for
                new releases and add them to your own playlist. To get all these
                abilities, you need to login.
              </p>
            </div>
            <div className="py-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
