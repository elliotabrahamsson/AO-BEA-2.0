import homeOutline from "../assets/navbar/home_outline.svg";
import homeSolid from "../assets/navbar/home_solid.svg";
import searchOutline from "../assets/navbar/search_outline.svg";
import searchSolid from "../assets/navbar/search_solid.svg";
import logo from "../assets/navbar/ao_bea_logo.svg";
import favoritesOutline from "../assets/navbar/heart_outline.svg";
import favoritesSolid from "../assets/navbar/heart_solid.svg";
import userOutline from "../assets/navbar/user_outline.svg";
import userSolid from "../assets/navbar/user_solid.svg";
import { Link, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function Navbar() {
  //
  const location = useLocation();
  const isUserPage = ["/create-account", "/login", "/profile"].includes(
    location.pathname
  );

  return (
    <div>
      <div className="nav-container">
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-400 shadow-md z-10">
          <ul className="flex justify-between items-center m-5">
            {/* #1 Home icon */}
            <Link to="/">
              <li>
                <img
                  src={location.pathname === "/" ? homeSolid : homeOutline}
                  alt="home"
                  className="w-8 h-8"
                />
              </li>
            </Link>

            {/* #2 Search icon */}
            <li>
              <img
                src={searchOutline}
                alt="icon of search navigation"
                className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition duration-300 group-hover:hidden"
              />
              <img
                src={searchSolid}
                alt="icon of search navigation"
                className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition duration-300 hidden group-hover:block"
              />
            </li>

            {/* #3 Icon of AO BEA */}
            <Link to={"/"}>
              <li>
                <img
                  src={logo}
                  alt="icon of AO BEA logo"
                  className="h-14 w-auto"
                />
              </li>
            </Link>

            {/* #4 Favorites icon */}
            <Link to={"/"}>
              <li>
                <img
                  src={favoritesOutline}
                  alt="icon to navigate to favorites"
                  className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition duration-300 group-hover:hidden"
                />
                <img
                  src={favoritesSolid}
                  alt="icon to navigate to favorites"
                  className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition duration-300 hidden group-hover:block"
                />
              </li>
            </Link>

            {/* #5 User icon */}
            <Link to={isLoggedIn() ? "/profile" : "/create-account"}>
              <li>
                <img
                  src={isUserPage ? userSolid : userOutline}
                  alt="user icon"
                  className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10"
                />
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}
