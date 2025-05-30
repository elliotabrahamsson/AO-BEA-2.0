import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../utils/auth";
import PlaceholderImg from "../assets/profile-page/profile-img-placeholder.svg";

export default function ProfilePageRoute() {
  // useNavigate hook används för att navigera programatiskt
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/create-account");
    } else {
      setUser(user);
    }
  }, []);

  // Funktion för att hämta initialer från användarens namn
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    const initials = parts
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2);
    return initials.join("");
  };

  // useEffect hook för att hämta användardata när komponenten laddas
  // Hämtar användardata från localStorage och sätter den i state (user)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/create-account");
      // Om ingen användare finns, navigera till skapa konto
    }
  }, []);

  // Funktion för att hantera utloggning
  const handleLogout = () => {
    logoutUser();
    navigate("/create-account");
  };

  return (
    <div className="max-w-md mx-auto p-6 flex flex-col items-center text-center min-h-screen">
      <Link to="/" className="text-sm text-left w-full text-gray-600 mb-4">
        ← Startsida
      </Link>

      <h1 className="text-2xl font-bold mb-4">PROFIL</h1>
      <p className="mb-8 text-gray-800">
        {user ? `Välkommen ${user.name}` : "Laddar..."}
      </p>

      {/* Visar användarens profilbild eller initialer */}
      <div className="mb-4">
        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-semibold mx-auto mb-8 overflow-hidden">
          {user?.name ? (
            <span>{getInitials(user.name)}</span>
          ) : (
            <img
              src={PlaceholderImg}
              alt="Profilbild"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Visar användaren e-postadress */}
        <p className="font-bold text-black mb-5">{user?.email}</p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          className="bg-[#403d37] text-white py-2 rounded mb-5"
          onClick={() => navigate("/favorites")}
        >
          DINA FAVORITER
        </button>
        <button
          className="bg-[#403d37] text-white py-2 rounded mb-5"
          onClick={() => navigate("/orderhistory")}
        >
          ORDERHISTORIK
        </button>
        <button
          className="bg-[#403d37] text-white py-2 rounded mb-5"
          onClick={handleLogout}
        >
          LOGGA UT
        </button>
      </div>
    </div>
  );
}
