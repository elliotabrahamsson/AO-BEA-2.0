// Hjälper oss att hålla koll på om en användare är inloggad eller inte.
// Kollar localStorage, hämtar användaren eller loggar ut.

// Om "user" finns i localStorage returneras true, annars false.
export const isLoggedIn = (): boolean => {
  const user = localStorage.getItem("user");
  // !!user gör om värdet till true eller false
  return !!user;
};

// Hämtar aktuell användare från localStorage.
// Returnerar användarobjektet om det finns, annars null.
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : false;
};

// Raderar användaren från localStorage
export const logoutUser = () => {
  localStorage.removeItem("user");
};

// Importera funktionerna där du behöver dem, t.ex:
// import { isLoggedIn, getCurrentUser, logoutUser } from "../utils/auth";
