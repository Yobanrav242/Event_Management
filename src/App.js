import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import RegisterEventPage from "./components/pages/events/RegisterEventPage";
import LoginPage from "./components/pages/userAuth/LoginPage";
import Header from "./components/layouts/Header";
import RegisterPage from "./components/pages/userAuth/RegisterPage" 
import Dashboard from "./components/pages/LandingPage";

function App() {
  return (
    <Router>
      {/* Headerr */}
        <Header />
      <main >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<RegisterPage />} />
         <Route path="/register-event" element={<RegisterEventPage />} />
        <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
