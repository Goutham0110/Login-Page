import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfilePageComponents/ProfilePage";
import LoginPage from "./components/LoginPageComponents/LoginPage";
import SignupPage from "./components/SignupPageComponents/SignupPage";
import { useState } from "react";

function App() {
  const loginStatusAPI = "http://localhost:5000/login/status";

  async function checkLoginStatus() {
    const res = await fetch(loginStatusAPI, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const resJson = await res.json();
    return resJson;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          index
          element={<LoginPage checkLoginStatus={checkLoginStatus} />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/:profile"
          element={
            <ProfilePage
              checkLoginStatus={checkLoginStatus}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
