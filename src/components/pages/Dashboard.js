import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "../../styles/Dashboard.css";

function Dashboard() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const docRef = doc(db, "images", "dashboard");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.urls && Array.isArray(data.urls)) {
            setImages(data.urls);
          }
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [images]);

  const goNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (images.length === 0) {
    return <p className="loading-text">Loading images...</p>;
  }

  return (
    <div className="dashboard-container container py-4 d-flex flex-column align-items-center">
      <div className="slider-wrapper d-flex justify-content-center align-items-center">
        {/* Prev Button */}
        <button className="slider-btn btn btn-primary me-2" onClick={goPrev}>
          &#10094;
        </button>

        {/* Image */}
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="slider-image img-fluid rounded shadow"
        />

        {/* Next Button */}
        <button className="slider-btn btn btn-primary ms-2" onClick={goNext}>
          &#10095;
        </button>
      </div>

      <p className="slide-counter mt-3 text-center">
        {currentIndex + 1} of {images.length}
      </p>
    </div>
  );
}

export default Dashboard;
