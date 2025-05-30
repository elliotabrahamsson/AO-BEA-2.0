import { Link, useNavigate } from "react-router-dom";
import PlaceholderImg from "../assets/profile-page/profile-img-placeholder.svg";

export default function ProfilePageRoute() {
  // useNavigate hook används för att navigera programatiskt
  const navigate = useNavigate();

  // Placeholder mejl tills backend är synkad
  const email = "placeholder@email.com";

  const handleLogout = () => {
    // Här kommer logiken för att logga ut användaren, localStorage rensas osv
    navigate("/login"); // Navigerar användaren till inloggningssidan efter utloggning
  };

  return (
    <div className="max-w-md mx-auto p-6 flex flex-col items-center text-center min-h-screen">
      <Link to="/" className="text-sm text-left w-full text-gray-600 mb-4">
        ← Startsida
      </Link>

      <h1 className="text-2xl font-bold mb-4">PROFIL</h1>

      <div className="mb-4">
        <img
          src={PlaceholderImg} // placeholder image
          alt="Profilbild"
          className="w-24 h-24 rounded-full object-cover mx-auto mb-8"
        />
        <p className="text-sm text-gray-700 mb-5">{email}</p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={() => navigate("/favorites")}
          className="bg-[#403d37] text-white py-2 rounded mb-5"
        >
          DINA FAVORITER
        </button>
        <button
          onClick={() => navigate("/orderhistory")}
          className="bg-[#403d37] text-white py-2 rounded mb-5"
        >
          ORDERHISTORIK
        </button>
        <button
          onClick={handleLogout}
          className="bg-[#403d37] text-white py-2 rounded mb-5"
        >
          LOGGA UT
        </button>
      </div>
    </div>
  );
}
