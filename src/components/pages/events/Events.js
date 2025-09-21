import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import EventCard from "./EventCard";
import EventModal from "./EventModal";
import EventFilters from "./EventFilters";

function Events() {
  const [events, setEvents] = useState([]);
  const [activeType, setActiveType] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents =
    activeType === "all"
      ? events
      : events.filter((event) => event.type === activeType);

  const getBadgeClass = (type) => {
    switch (type) {
      case "technical":
        return "bg-primary";
      case "nontechnical":
        return "bg-warning text-dark";
      case "workshop":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container py-4">
      <EventFilters activeType={activeType} setActiveType={setActiveType} />

      <div className="row">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            getBadgeClass={getBadgeClass}
            setSelectedEvent={setSelectedEvent}
          />
        ))}

        {filteredEvents.length === 0 && (
          <p className="text-center text-muted">No events found.</p>
        )}
      </div>

      <EventModal selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
    </div>
  );
}

export default Events;
