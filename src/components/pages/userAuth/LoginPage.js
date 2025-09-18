import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const redirectTo = location.state?.redirectTo || "/";
  const eventName = location.state?.eventName || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // redirect back to event registration if provided
      if (redirectTo === "/register-event") {
        navigate(redirectTo, { state: { eventName } });
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container py-5 text-center">
      <h2>Login</h2>
      <form className="mx-auto" style={{ maxWidth: "400px" }} onSubmit={handleLogin}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
