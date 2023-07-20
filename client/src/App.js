import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import PageNotFound from "./components/PageNotFound";

function App() {
  const loginStatusAPI = process.env.REACT_APP_CHECK_LOGIN_STATUS_API;



  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/profile/:profile"
          element={<ProfilePage checkLoginStatus={checkLoginStatus} />}
        />
        <Route path="*" component={PageNotFound} />
      </Routes>
    </div>
  );
}

export default App;
