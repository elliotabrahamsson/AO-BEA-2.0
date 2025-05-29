import React, { useState, useEffect } from "react";
import PrivacyModal from "../components/PrivacyModal";

export default function CreateAccountRoute() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  /*   const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); */

  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  // useState hantering - E-postadressens giltighet (kontrollera "@” och ".")
  useEffect(() => {
    setEmailValid(email.includes("@") && email.includes("."));
  }, [email]);

  // useState hantering av lösenordets giltighet
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  // När lösenordet ändras, uppdatera giltighetsstatus
  useEffect(() => {
    setPasswordValid({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    });
  }, [password]);

  // Hanterar formulärets inlämning om alla villkor är uppfyllda
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted || !matchPasswords || !isPasswordValid()) return;
    // Lägg till POST logik för att skapa konto

    let userId = 0; // Placeholder för användar-ID
    const created = new Date();
    const createdWithZone = created
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); // Formatera datumet till YYYY-MM-DD HH:MM:SS
    console.log(created);
    console.log(createdWithZone);
    try {
      const getId = await fetch("http://localhost:3000/usersId");
      const users: { id: number; email: string }[] = await getId.json();
      console.log(userId);
      userId =
        users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1; // Enkelt sätt att generera unikt ID
      if (users.some((user) => user.email === email)) {
        console.error("E-postadressen är redan registrerad");
        return;
      }
    } catch (error) {
      console.error("Fel vid hämtning av användar-ID:", error);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/createUser", {
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
      });
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

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">SKAPA KONTO</h1>

      {/* För- & Efternamn */}
      <input
        type="text"
        placeholder="Förnamn"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className="w-full mb-4 px-4 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Efternamn"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        className="w-full mb-4 px-4 py-2 border rounded"
      />

      {/* Emailadress */}
      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full mb-4 px-4 py-2 border rounded"
      />
      {!emailValid && email && (
        <p className="text-red-600 text-sm mb-4">Ange en giltig e-postadress</p>
      )}

      {/* Lösenord */}
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full mb-1 px-4 py-2 border rounded"
      />

      <ul className="text-sm mb-4">
        <li
          className={passwordValid.length ? "text-green-600" : "text-gray-500"}
        >
          Minst 6 tecken
        </li>
        <li
          className={
            passwordValid.uppercase ? "text-green-600" : "text-gray-500"
          }
        >
          En stor bokstav
        </li>
        <li
          className={passwordValid.number ? "text-green-600" : "text-gray-500"}
        >
          En siffra
        </li>
      </ul>
      <input
        type="password"
        placeholder="Bekräfta lösenord"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="w-full mb-4 px-4 py-2 border rounded"
      />
      {!matchPasswords && confirmPassword && (
        <p className="text-red-600 text-sm mb-4">Lösenorden matchar inte</p>
      )}

      {/* Newsletter */}
      <div className="flex items-start text-sm mb-2">
        <input
          type="checkbox"
          checked={newsletter}
          onChange={() => setNewsletter(!newsletter)}
          className="mr-2 mt-1"
          id="newsletter"
        />
        <p>
          Anmäl mig till nyhetsbrevet för att få exklusiva erbjudanden och
          uppdateringar. (Valfritt)
        </p>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start text-sm mb-4">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={() => setTermsAccepted(!termsAccepted)}
          className="mr-2 mt-1"
          id="terms"
        />
        <p className="inline">
          Jag godkänner{" "}
          <span
            onClick={() => setShowModal(true)}
            className="underline cursor-pointer text-blue-700 hover:text-blue-900"
          >
            användarvillkoren och integritetspolicyn
          </span>{" "}
          och bekräftar att jag läst och förstått integritetspolicyn
          <span className="font-bold"> (Obligatorisk)</span>
        </p>
      </div>
      {showModal && (
        <PrivacyModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}

      <button
        type="submit"
        disabled={!termsAccepted || !isPasswordValid() || !matchPasswords}
        className="w-full bg-[#403d37] text-white py-2 rounded disabled:opacity-50"
      >
        SKAPA KONTO
      </button>
    </form>
  );
}
