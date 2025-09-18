import React from "react";

function EventModal({ selectedEvent }) {
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
          {selectedEvent && (
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
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Type:</strong> {selectedEvent.type}
                </p>
                <p>
                  <strong>Registration Date:</strong>{" "}
                  {selectedEvent.regDate}
                </p>
                <p>
                  <strong>Event Dates:</strong>{" "}
                  {selectedEvent.startDate} - {selectedEvent.endDate}
                </p>
                <p>{selectedEvent.description}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={() => alert("Register logic here")}
                >
                  Register
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventModal;
