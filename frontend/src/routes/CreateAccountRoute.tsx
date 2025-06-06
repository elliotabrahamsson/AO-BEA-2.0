import React, { useState, useEffect } from "react";
import PrivacyModal from "../components/PrivacyModal";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import "../css/CreateAccountRoute.css";

export default function CreateAccountRoute() {
  const navigate = useNavigate();

  // Redan inloggad - navigera till profilen istället.
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/profilePage");
    }
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDisabledMessage, setShowDisabledMessage] = useState(false);

  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  // Email validity check (checks for "@" and ".")
  useEffect(() => {
    setEmailValid(email.includes("@") && email.includes("."));
  }, [email]);

  // Password validity state and effect
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  useEffect(() => {
    setPasswordValid({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
    });
  }, [password]);

  // Hanterar formulärets inlämning om alla villkor är uppfyllda
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted || !matchPasswords || !isPasswordValid()) return;

    if (formNotReady) {
      e.preventDefault(); // hindra submit
      setShowDisabledMessage(true);
      setTimeout(() => setShowDisabledMessage(false), 3000); // dölj efter 3 sek
    }

    setErrorMessage(""); // Nollställ felmeddelandet

    let userId = 0; // Placeholder för användar-ID
    const created = new Date();
    const createdWithZone = created
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); // Formatera datumet till YYYY-MM-DD HH:MM:SS

    try {
      const getId = await fetch("https://ao-bea-2-0.onrender.com/usersId");
      const users: { id: number; email: string }[] = await getId.json();

      if (users.some((user) => user.email === email)) {
        setErrorMessage("E-postadressen är redan registrerad");
        console.error("E-postadressen är redan registrerad");
        return;
      }
    } catch (error) {
      console.error("Fel vid hämtning av användar-ID:", error);
      return;
    }

    try {
      const response = await fetch(
        "https://ao-bea-2-0.onrender.com/createUser",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            name: fullName,
            email,
            password,
            newsletter,
            created: createdWithZone,
          }),
        }
      );

      const data = await response.json();

      const token = data.token;

      // Om svaret är OK, spara användardata i localStorage och navigera till profilen
      if (response.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: userId,
            name: fullName,
            email,
            token: token,
          })
        );
        navigate("/profilePage");
      }
      // Om svaret inte är OK, kasta ett fel
      if (!response.ok) {
        throw new Error("Något gick fel vid skapandet av kontot");
      }
    } catch (error) {
      console.error("Fel vid skapande av konto:", error);
    }
  };

  // Kontrollera om lösenordet är giltigt
  const isPasswordValid = () => {
    return (
      passwordValid.length && passwordValid.uppercase && passwordValid.number
    );
  };

  // Kontrollera om lösenordet matchar i båda fälten
  const matchPasswords = password === confirmPassword;

  const formNotReady = !termsAccepted || !isPasswordValid || !matchPasswords;

  // Meddelar användaren att submit-knapp inaktiv tills allt är ifyllt

  return (
    <form onSubmit={handleSubmit} className="create-account-form">
      <h1>SKAPA KONTO</h1>

      {/* För- & Efternamn */}
      <input
        type="text"
        placeholder="Förnamn"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className="create-input"
      />
      <input
        type="text"
        placeholder="Efternamn"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        className="create-input"
      />
      {/* Emailadress */}
      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="create-input"
      />
      {/* Validering av e-postadress */}
      {!emailValid && email && (
        <p className="create-validation-msg red">Ange en giltig e-postadress</p>
      )}
      {errorMessage && (
        <p className="create-validation-msg red">{errorMessage}</p>
      )}

      {/* Lösenord */}
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="create-input"
      />

      <ul className="requirements-list">
        <li className={passwordValid.length ? "green" : ""}>Minst 6 tecken</li>
        <li className={passwordValid.uppercase ? "green" : ""}>
          En stor bokstav
        </li>
        <li className={passwordValid.number ? "green" : ""}>En siffra</li>
      </ul>

      <input
        type="password"
        placeholder="Bekräfta lösenord"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="create-input"
      />
      {!matchPasswords && confirmPassword && (
        <p className="create-validation-msg red">Lösenorden matchar inte</p>
      )}

      {/* Newsletter */}
      <div className="checkbox-group">
        <input
          type="checkbox"
          checked={newsletter}
          onChange={() => setNewsletter(!newsletter)}
        />
        <p>
          Anmäl mig till nyhetsbrevet för att få exklusiva erbjudanden och
          uppdateringar. (Valfritt)
        </p>
      </div>

      {/* Terms and Conditions */}
      <div className="checkbox-group">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={() => setTermsAccepted(!termsAccepted)}
        />
        <p>
          Jag godkänner{" "}
          <span onClick={() => setShowModal(true)} className="policy-link">
            användarvillkoren och integritetspolicyn
          </span>{" "}
          och bekräftar att jag läst och förstått integritetspolicyn
          <span className="font-bold"> (Obligatorisk)</span>
        </p>
      </div>

      {showModal && (
        <PrivacyModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}

      <div className="btn-wrapper" style={{ position: "relative" }}>
        <button type="submit" disabled={formNotReady} className="create-btn">
          SKAPA KONTO
        </button>

        {formNotReady && (
          <div
            className="btn-overlay"
            onClick={() => {
              setShowDisabledMessage(true);
              setTimeout(() => setShowDisabledMessage(false), 3000);
            }}
          ></div>
        )}
      </div>

      {showDisabledMessage && (
        <p className="create-validation-msg red text-center">
          Vänligen fyll i alla fält och acceptera användarvillkoren
        </p>
      )}
      <p className="already-account">
        Har du redan ett konto?{" "}
        <span onClick={() => navigate("/login")}>Logga in här</span>
      </p>
    </form>
  );
}
