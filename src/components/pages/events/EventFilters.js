import React from "react";

function EventFilters({ activeType, setActiveType }) {
  return (
    <div className="mb-4 text-center">
      <button
        className={`btn m-2 ${
          activeType === "all" ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => setActiveType("all")}
      >
        All
      </button>
      <button
        className={`btn m-2 ${
          activeType === "technical" ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => setActiveType("technical")}
      >
        Technical
      </button>
      <button
        className={`btn m-2 ${
          activeType === "nontechnical" ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => setActiveType("nontechnical")}
      >
        Non-Technical
      </button>
      <button
        className={`btn m-2 ${
          activeType === "workshop" ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => setActiveType("workshop")}
      >
        Workshop
      </button>
    </div>
  );
}

export default EventFilters;
