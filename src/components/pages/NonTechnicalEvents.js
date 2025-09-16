import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../styles/EventCards.css";

function NonTechnicalEvents() {
  const [events, setEvents] = useState([]);
  const [modalEvent, setModalEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "nontechnical_events"));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setEvents(data);
      } catch (error) {
        console.error("Error fetching non-technical events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      <div className="row">
        {events.length === 0 ? (
          <p className="text-center">Loading Non-Technical Events...</p>
        ) : (
          events.map((evt) => (
            <div key={evt.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card event-card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-success">{evt.title}</h5>
                  <p className="card-subtitle mb-2 text-muted">📅 {evt.date}</p>
                  <p className="card-text">
                    {evt.details.length > 100
                      ? evt.details.slice(0, 100) + "..."
                      : evt.details}
                  </p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-outline-success"
                      onClick={() => setModalEvent(evt)}
                    >
                      Show More
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate("/register", { state: { eventName: evt.title } })
                      }
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bootstrap Modal */}
      {modalEvent && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          onClick={() => setModalEvent(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalEvent.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalEvent(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Date:</strong> {modalEvent.date}
                </p>
                <p>{modalEvent.details}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalEvent(null)}
                >
                  Close
                </button>
                <button
                  className="btn btn-success"
                  onClick={() =>
                    navigate("/register", { state: { eventName: modalEvent.title } })
                  }
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NonTechnicalEvents;
