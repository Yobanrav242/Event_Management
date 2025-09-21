import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";

function EventModal({ selectedEvent, setSelectedEvent }) {
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!selectedEvent) return;

    setSelectedEvent(null); // Close modal

    if (auth.currentUser) {
     navigate("/register-event", { state: { event: selectedEvent } });

    } else {
      navigate("/login", {
        state: {
          redirectTo: "/register-event",
          eventName: selectedEvent.title,
        },
      });
    }
  };

  return (
    <div
      className="modal fade"
      id="eventModal"
      tabIndex="-1"
      aria-labelledby="eventModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {selectedEvent ? (
            <>
              <div className="modal-header">
                <h5 className="modal-title" id="eventModalLabel">
                  {selectedEvent.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setSelectedEvent(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Type:</strong> {selectedEvent.type}
                </p>
                <p>
                  <strong>Registration Date:</strong> {selectedEvent.regDate}
                </p>
                <p>
                  <strong>Event Dates:</strong> {selectedEvent.startDate} - {selectedEvent.endDate}
                </p>
                <p>{selectedEvent.description}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleRegister} data-bs-dismiss="modal">
                  Register
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setSelectedEvent(null)}
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <div className="modal-body">No event selected</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventModal;
