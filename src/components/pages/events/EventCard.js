import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase"; // adjust path if needed
import EventModal from "./EventModal"; // import your modal component
import "bootstrap/dist/css/bootstrap.min.css";

function EventCard({ event }) {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleRegisterClick = () => {
    if (auth.currentUser) {
      // ✅ User already logged in → go directly to register event
      navigate("/register-event", { state: { eventName: event.title } });
    } else {
      // ❌ User not logged in → send to login, keep event info
      navigate("/login", {
        state: { redirectTo: "/register-event", eventName: event.title },
      });
    }
  };

  return (
    <>
      {/* Event Card */}
      <div className="col-md-4 mb-4">
        <div className="card shadow-sm h-100">
          {/* Event type badge (top-right) */}
          <div className="position-absolute top-0 end-0 p-2">
            <span className="badge bg-primary">{event.type}</span>
          </div>

          <div className="card-body d-flex flex-column">
            {/* Title */}
            <h5 className="card-title">{event.title}</h5>

            {/* Date */}
            <p className="card-text text-muted">
              {event.startDate} - {event.endDate}
            </p>

            {/* Small Description */}
            <p className="card-text">
              {event.description.length > 80
                ? event.description.slice(0, 80) + "..."
                : event.description}
            </p>

            {/* Buttons */}
            <div className="mt-auto d-flex justify-content-between">
              {/* Show More → opens modal */}
              <button
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#eventModal"
                onClick={() => setSelectedEvent(event)}
              >
                Show More
              </button>

              {/* Register Button */}
              <button className="btn btn-primary" onClick={handleRegisterClick}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal (reused for this card) */}
      <EventModal selectedEvent={selectedEvent} />
    </>
  );
}

export default EventCard;
