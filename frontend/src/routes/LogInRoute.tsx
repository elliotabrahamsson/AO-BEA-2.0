import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LogIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Enkel hårdkodad kontroll för testsyfte, här ska det läggas in och testas från backend
    /* if (email === 'test2@example.com' && password === '1234567') {
            const fakeUser = { name: 'Testanvändare', email };
            login(fakeUser); // Sparar användaren i context
            navigate('/profilePage');
        } else {
            setError('Fel e-post eller lösenord. Försök igen.');
        } */

    fetch("http://localhost:3000/login", {
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
        return response.json();
      })
      .then((data) => {
        const user = { name: data.name, email: data.email, id: data.id };
        login(user); // Sparar användaren i context
        navigate("/profilePage");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className=" p-4 flex justify-center">
      <div className="bg-white p-8  w-full max-w-md mt-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">Logga in</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              E-post
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-black rounded text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Lösenord
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border border-black rounded text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-600"
              aria-label={showPassword ? "Dölj lösenord" : "Visa lösenord"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <p className="text-center text-sm mb-6">
            Har du glömt ditt lösenord?
          </p>
          <p className="text-center text-sm mb-6">
            Har du inget konto?{" "}
            <Link to="/create-account" className="text-blue-600 underline">
              Registrera dig här!
            </Link>
          </p>
          <button
            type="submit"
            className="w-full bg-[#403d37] hover:bg-[#5a564d] text-white py-2.5 rounded text-sm font-medium transition"
          >
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
