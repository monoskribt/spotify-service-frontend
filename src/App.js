import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import UserPage from "./pages/UserPage";
import {useHandleAuth} from "./service/HandleAuthenticaion";
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
