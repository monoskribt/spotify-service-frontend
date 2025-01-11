import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import WelcomePage from "./welcome-page/WelcomePage";
import UserPage from "./user-page/UserPage";
import Cookies from "js-cookie";


const PrivateRoute = ({ element: Element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    const refreshToken = Cookies.get("refresh_token");
    setIsAuthenticated(!!refreshToken);
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading</div>; 
  }

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/user"
          element={<PrivateRoute element={UserPage} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
