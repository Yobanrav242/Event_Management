import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

function RegisterPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const redirectTo = location.state?.redirectTo || "/";
    const eventName = location.state?.eventName || "";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            // ✅ After successful registration → redirect to event registration if needed
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
            <h2>Create Account</h2>
            <form
                className="mx-auto"
                style={{ maxWidth: "400px" }}
                onSubmit={handleRegister}
            >
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
                <button className="btn btn-success w-100" type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;
