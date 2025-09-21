import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function RegisterEventPage() {
  const location = useLocation();
  // Use the entire event object if possible
  const event = location.state?.event;
  const eventName = event?.title || "No event selected";

  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(auth.currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [teamSize, setTeamSize] = useState(1);
  const [teamMembers, setTeamMembers] = useState([{ name: "", email: "" }]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleTeamSizeChange = (size) => {
    const newSize = Math.max(1, Number(size));
    setTeamSize(newSize);
    const members = [...teamMembers];
    while (members.length < newSize) members.push({ name: "", email: "" });
    while (members.length > newSize) members.pop();
    setTeamMembers(members);
  };

  const handleTeamMemberChange = (index, field, value) => {
    const members = [...teamMembers];
    members[index][field] = value;
    setTeamMembers(members);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    try {
      await addDoc(collection(db, "registered_students"), {
        eventName,
        fullName,
        email,
        phone,
        teamSize,
        teamMembers,
        userId: auth.currentUser?.uid || null,
        registeredAt: Timestamp.now(),
      });

      setSuccessMsg(`🎉 Successfully registered for ${eventName}`);
      setFullName("");
      setPhone("");
      setTeamSize(1);
      setTeamMembers([{ name: "", email: "" }]);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      alert("Error registering: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 text-center">
      <h2>Register for {eventName}</h2>
      <form className="mx-auto" style={{ maxWidth: "500px" }} onSubmit={handleRegister}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={!!auth.currentUser?.email}
        />
        <input
          type="tel"
          className="form-control mb-3"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Team Size"
          value={teamSize}
          min="1"
          onChange={(e) => handleTeamSizeChange(e.target.value)}
          required
        />
        {teamMembers.map((member, index) => (
          <div key={index} className="border p-2 mb-2 rounded">
            <h6>Member {index + 1}</h6>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Member Name"
              value={member.name}
              onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
              required
            />
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Member Email"
              value={member.email}
              onChange={(e) => handleTeamMemberChange(index, "email", e.target.value)}
              required
            />
          </div>
        ))}
        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Confirm Registration"}
        </button>
      </form>
      {successMsg && <p className="mt-3 text-success">{successMsg}</p>}
    </div>
  );
}

export default RegisterEventPage;
