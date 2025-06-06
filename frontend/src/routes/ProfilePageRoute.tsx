import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../utils/auth";
import PlaceholderImg from "/profile-page/profile-img-placeholder.svg";
import "../css/ProfilePageRoute.css";

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
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <h1>PROFIL</h1>
      <p>{user ? `Välkommen ${user.name}` : "Laddar..."}</p>

      <div>
        <div className="profile-avatar">
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

        <p className="profile-email">{user?.email}</p>
      </div>

      <div className="profile-buttons">
        <button onClick={() => navigate("/favorites")}> FAVORITER</button>
        <button onClick={() => navigate("/orderhistory")}>ORDERHISTORIK</button>
        <button onClick={handleLogout}>LOGGA UT</button>
      </div>
    </div>
  );
}
