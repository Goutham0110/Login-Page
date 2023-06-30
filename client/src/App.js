import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

function App() {
  const loginStatusAPI = "http://localhost:5000/login/status";

  async function checkLoginStatus() {
    try {
      const res = await fetch(loginStatusAPI, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const resJson = await res.json();
      return resJson;
    } catch (err) {}
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<LoginPage checkLoginStatus={checkLoginStatus} />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/profile/:profile"
          element={<ProfilePage checkLoginStatus={checkLoginStatus} />}
        />
      </Routes>
    </div>
  );
}

export default App;
