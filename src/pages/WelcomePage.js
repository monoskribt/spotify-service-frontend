import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleAuth } from "../service/HandleAuthenticaion";
import Login from "../components/welcome-page/Login";

const WelcomePage = () => {
  const { isAuthenticated, externalLogin } = useHandleAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user");
    }
  }, [isAuthenticated, navigate]);

  return <Login onLogin={externalLogin} />;
};

export default WelcomePage;
