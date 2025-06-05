import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
/* import { useAuth } from "../context/AuthContext"; */
import { isLoggedIn } from "../utils/auth";
import { getCurrentUser } from "../utils/auth";
import "../css/LoginRoute.css";
import eyeOff from "../assets/password/eye-off.svg";
import eyeOn from "../assets/password/eye-on.svg";

function LogIn() {
  /* const { login } = useAuth(); */
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/profilePage");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("https://ao-bea-2-0.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fel e-post eller lösenord. Försök igen.");
        }
        getCurrentUser(); // Hämtar aktuell användare
        return response.json();
      })
      .then((data) => {
        const user = {
          name: data.name,
          email: data.email,
          id: data.id,
          token: data.token,
        };
        /*  login(user); // Sparar användaren i context */
        localStorage.setItem("user", JSON.stringify(user)); // Sparar användaren i localStorage

        navigate("/profilePage");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Logga in</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="login-label">
              E-post
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <div className="mb-4" style={{ position: "relative" }}>
            <label htmlFor="password" className="login-label">
              Lösenord
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-button"
              aria-label={showPassword ? "Visa lösenord" : "Dölj lösenord"}
            >
              <img
                src={showPassword ? eyeOn : eyeOff}
                alt={showPassword ? "Visa lösenord" : "Dölj lösenord"}
                className="toggle-password-icon"
              />
            </button>
          </div>

          {error && <p className="login-error">{error}</p>}

          <p className="login-hint">Har du glömt ditt lösenord?</p>
          <p className="login-link">
            Har du inget konto?{" "}
            <Link to="/create-account">Registrera dig här!</Link>
          </p>

          <button type="submit" className="login-button">
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
