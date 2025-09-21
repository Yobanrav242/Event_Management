import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import "bootstrap/dist/css/bootstrap.min.css";

function EventCard({ event, getBadgeClass, setSelectedEvent }) {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setSelectedEvent(event);

    if (auth.currentUser) {
      navigate("/register-event", { state: { event } }); // Pass full event object
    } else {
      navigate("/login", {
        state: {
          redirectTo: "/register-event",
          event, // also pass event object for redirect
        },
      });
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <div
          className={`position-absolute top-0 end-0 p-2 ${getBadgeClass(event.type)}`}
          style={{ borderRadius: "0 0 0 0.25rem" }}
        >
          {event.type}
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{event.title}</h5>
          <p className="card-text text-muted">
            {event.startDate} - {event.endDate}
          </p>
          <p className="card-text">
            {event.description.length > 80
              ? event.description.slice(0, 80) + "..."
              : event.description}
          </p>
          <div className="mt-auto d-flex justify-content-between">
            <button
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#eventModal"
              onClick={() => setSelectedEvent(event)}
            >
              Show More
            </button>
            <button className="btn btn-primary" onClick={handleRegisterClick}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
