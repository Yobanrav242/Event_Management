import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase";
import "../../styles/RegisterPage.css"; // you can rename this to RegisterEventPage.css if needed

function RegisterEventPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const prefilledEvent = location.state?.eventName || "";



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eventName, setEventName] = useState(prefilledEvent);
  const [teamSize, setTeamSize] = useState(1);
  const [members, setMembers] = useState([{ name: "", email: "", phone: "" }]);
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  // Detect logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(user);
        setEmail(user.email); // autofill
      } else {
        setUserLoggedIn(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle team size change
  const handleTeamSizeChange = (size) => {
    setTeamSize(size);
    const newMembers = [...members];
    while (newMembers.length < size) {
      newMembers.push({ name: "", email: "", phone: "" });
    }
    while (newMembers.length > size) {
      newMembers.pop();
    }
    setMembers(newMembers);
  };

  // Handle member field update
  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventName) {
      alert("Please select an event.");
      return;
    }

    try {
      let userId;

      if (!userLoggedIn) {
        // If not logged in, create user
        if (!email || !password) {
          alert("Please provide email & password.");
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        userId = userCredential.user.uid;
      } else {
        // Already logged in
        userId = userLoggedIn.uid;
      }

      // Save registration details in Firestore
      await addDoc(collection(db, "registered_students"), {
        userId,
        email,
        eventName,
        teamSize,
        members,
        createdAt: serverTimestamp(),
      });

      alert("Event registration successful!");
      navigate("/"); // redirect to homepage
    } catch (error) {
      console.error("Error saving registration:", error);
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2 className="text-center mb-4">Event Registration</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            disabled={!!userLoggedIn} // disable if logged in
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password (only if new user) */}
        {!userLoggedIn && (
          <div className="mb-3">
            <label className="form-label">Create Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="form-text">Minimum 6 characters required.</div>
          </div>
        )}

        {/* Event Name */}
        <div className="mb-3">
          <label className="form-label">Event Name</label>
          <input
            type="text"
            className="form-control"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>

        {/* Team Size */}
        <div className="mb-3">
          <label className="form-label">Team Size</label>
          <input
            type="number"
            min="1"
            max="10"
            className="form-control"
            value={teamSize}
            onChange={(e) => handleTeamSizeChange(Number(e.target.value))}
            required
          />
        </div>

        {/* Team Members */}
        {members.map((member, index) => (
          <div key={index} className="card p-3 mb-3">
            <h6>Member {index + 1}</h6>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Name"
              value={member.name}
              onChange={(e) =>
                handleMemberChange(index, "name", e.target.value)
              }
              required
            />
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={member.email}
              onChange={(e) =>
                handleMemberChange(index, "email", e.target.value)
              }
              required
            />
            <input
              type="tel"
              className="form-control"
              placeholder="Phone"
              value={member.phone}
              onChange={(e) =>
                handleMemberChange(index, "phone", e.target.value)
              }
              required
            />
          </div>
        ))}

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterEventPage;
