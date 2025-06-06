import homeOutline from "/navbar/home_outline.svg";
import homeSolid from "/navbar/home_solid.svg";
import cartOutline from "/navbar/cart_outline.svg";
import cartSolid from "/navbar/cart_solid.svg";
import logo from "/navbar/ao_bea_logo.svg";
import favoritesOutline from "/navbar/heart_outline.svg";
import favoritesSolid from "/navbar/heart_solid.svg";
import userOutline from "/navbar/user_outline.svg";
import userSolid from "/navbar/user_solid.svg";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser, isLoggedIn } from "../utils/auth";

export default function Navbar() {
  //
  const location = useLocation();
  const isUserPage = ["/create-account", "/login", "/profilePage"].includes(
    location.pathname
  );

  return (
    <div className="nav-container">
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-400 shadow-md z-100 md:top-0 md:relative md:min-h-19">
        <ul className="flex justify-between items-center m-2 md:gap-x-6">
          {/* Desktop logo */}
          <li className="hidden md:block md:mr-auto">
            <Link to="/" className="hidden md:block">
              <img
                src={logo}
                alt="icon of AO BEA logo"
                className="h-14 w-auto"
              />
            </Link>
          </li>

          <li className="hidden md:block">
            {getCurrentUser().isAdmin ? (
              <>
                <Link to="/admin">
                  <p className="text-5xl">+</p>
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link to="/">
                  <img
                    src={logo}
                    alt="icon of AO BEA logo"
                    className="h-14 w-auto md:hidden"
                  />
                </Link>
              </>
            )}
          </li>

          {/* #1 Home icon */}
          <li className="">
            <Link to="/" className="flex flex-col items-center">
              <img
                src={location.pathname === "/" ? homeSolid : homeOutline}
                alt="home"
                className="w-8 h-8"
              />
              {/* <p className="md:text-[8px] md:text-center mt-1">Home</p> */}
            </Link>
          </li>

          {/* #2 Cart icon */}
          <li className="">
            <Link to="/shoppingcart">
              <img
                src={cartOutline}
                alt="icon of cart navigation"
                className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition duration-300 group-hover:hidden"
              />
              <img
                src={cartSolid}
                alt="icon of cart navigation"
                className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition duration-300 hidden group-hover:block"
              />
              {/* <p className="md:text-[8px] md:text-center">Cart</p> */}
            </Link>
          </li>

          {/* #4 AO BEA Logo */}
          {/*     <li className="block md:hidden">
            <Link to="/">
              <img
                src={logo}
                alt="icon of AO BEA logo"
                className="h-14 w-auto"
              />
            </Link>
          </li> */}

          <li className="block md:hidden">
            {getCurrentUser().isAdmin ? (
              <>
                <Link to="/admin">
                  <p className="text-5xl">+</p>
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link to="/">
                  <img
                    src={logo}
                    alt="icon of AO BEA logo"
                    className="h-14 w-auto md:hidden"
                  />
                </Link>
              </>
            )}
          </li>

          {/* #5 Favorites icon */}
          <li className="">
            <Link to="/">
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
              {/* <p className="md:text-[8px] md:text-center">Favorites</p> */}
            </Link>
          </li>

          {/* #6 User icon */}
          <li>
            <Link to={isLoggedIn() ? "/profilePage" : "/login"}>
              <img
                src={isUserPage ? userSolid : userOutline}
                alt="user icon"
                className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10"
              />
              {/*  <p className="md:text-[8px] md:text-center">Profile</p> */}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
