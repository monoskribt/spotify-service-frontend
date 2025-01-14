import { useEffect, useState } from "react";
import Cookies from "js-cookie";


export const useHandleAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const refreshToken = Cookies.get("refresh_token");
        setIsAuthenticated(!!refreshToken);
    }, []);


    const login = () => {
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


      const logout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        setIsAuthenticated(false);
      };


    return {isAuthenticated, login, logout};
}

