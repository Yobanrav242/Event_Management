import React, { useState } from "react";
import TechnicalEvents from "./TechnicalEvents";
import NonTechnicalEvents from "./NonTechnicalEvents";
import "../../styles/Events.css";

function Events() {
  const [activeTab, setActiveTab] = useState("technical");

  return (
    <div className="events-container container py-4">
      <ul className="nav nav-tabs justify-content-center mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "technical" ? "active" : ""}`}
            onClick={() => setActiveTab("technical")}
          >
            Technical
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "nonTechnical" ? "active" : ""}`}
            onClick={() => setActiveTab("nonTechnical")}
          >
            Non-Technical
          </button>
        </li>
      </ul>

      <div className="events-content">
        {activeTab === "technical" ? <TechnicalEvents /> : <NonTechnicalEvents />}
      </div>
    </div>
  );
}

export default Events;
