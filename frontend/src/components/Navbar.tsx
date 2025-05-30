import homeOutline from "../assets/navbar/home_outline.svg";
import homeSolid from "../assets/navbar/home_solid.svg";
import cartOutline from "../assets/navbar/cart_outline.svg";
import cartSolid from "../assets/navbar/cart_solid.svg";
import searchOutline from "../assets/navbar/search_outline.svg";
import searchSolid from "../assets/navbar/search_solid.svg";
import logo from "../assets/navbar/ao_bea_logo.svg";
import favoritesOutline from "../assets/navbar/heart_outline.svg";
import favoritesSolid from "../assets/navbar/heart_solid.svg";
import userOutline from "../assets/navbar/user_outline.svg";
import userSolid from "../assets/navbar/user_solid.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav-container">
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-400 shadow-md z-10">
        <ul className="flex justify-between items-center m-5">
          {/* #1 Home icon */}
          <li>
            <Link to={"/"}>
              <img
                src={homeOutline}
                alt="icon of home navigation"
                className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition duration-300 group-hover:hidden"
              />
              <img
                src={homeSolid}
                alt="icon of home navigation"
                className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition duration-300 hidden group-hover:block"
              />
            </Link>
          </li>

          {/* #2 Cart icon */}
          <li>
            <Link to={"/shoppingcart"}>
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
            </Link>
          </li>

          {/* #3 Search icon */}
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

          {/* #4 AO BEA Logo */}
          <li>
            <Link to={"/"}>
              <img
                src={logo}
                alt="icon of AO BEA logo"
                className="h-14 w-auto"
              />
            </Link>
          </li>

          {/* #5 Favorites icon */}
          <li>
            <Link to={"/profile"}>
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
            </Link>
          </li>

          {/* #6 User icon */}
          <li>
            <Link to={"/create-account"}>
              <img
                src={userOutline}
                alt="icon of user"
                className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition duration-300 group-hover:hidden"
              />
              <img
                src={userSolid}
                alt="icon of user"
                className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition duration-300 hidden group-hover:block"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
