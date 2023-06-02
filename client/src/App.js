import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfilePageComponents/ProfilePage";
import LoginPage from "./components/LoginPageComponents/LoginPage";
import SignupPage from "./components/SignupPageComponents/SignupPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/:profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
