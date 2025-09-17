import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import RegisterPage from "./components/pages/RegisterPage";
import TechnicalEvents from "./components/pages/TechnicalEvents";
import NonTechnicalEvents from "./components/pages/NonTechnicalEvents";

function App() {
  return (
    <Router>
      <main >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route path="/technical" element={<TechnicalEvents />} />
          <Route path="/non-technical" element={<NonTechnicalEvents />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
