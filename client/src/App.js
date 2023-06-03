import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfilePageComponents/ProfilePage";
import LoginPage from "./components/LoginPageComponents/LoginPage";
import SignupPage from "./components/SignupPageComponents/SignupPage";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <div className="App">
      <Routes>
        <Route index element={<LoginPage setLoggedIn={setLoggedIn} />} />
        <Route
          path="/signup"
          element={<SignupPage setLoggedIn={setLoggedIn} />}
        />
        <Route path="/:profile" element={<ProfilePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
