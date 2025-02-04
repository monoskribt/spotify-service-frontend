import { useEffect, useState } from "react";
import {login as externalLogin} from "../user-page/user-managment/UserAction"

const getParamsFromUrl = (url) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  return {
    accessToken: urlParams.get('access_token'),
    refreshToken: urlParams.get('refresh_token')
  };
};

export const useHandleAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("access_token") && url.includes("refresh_token")) {
      const { accessToken, refreshToken } = getParamsFromUrl(url);
  
      if (accessToken && refreshToken) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        console.log("My tokens:", accessToken, refreshToken); 
        setIsAuthenticated(true);
      }
    }
  }, []);  

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return { isAuthenticated, externalLogin, logout };
};
