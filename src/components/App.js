import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./welcome-page/WelcomePage";
import UserPage from "./user-page/UserPage";
import {useHandleAuth} from "./authentication/HandleAuthenticaion";
import {PrivateRoute} from "./route/PrivateRoutes";

function App() {
  const { isAuthenticated } = useHandleAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/user"
          element = {<PrivateRoute checkIsAuthenticated={isAuthenticated} element={UserPage} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
