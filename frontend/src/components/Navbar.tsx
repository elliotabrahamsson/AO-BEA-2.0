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
    <div>
      <div className="nav-container">
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-400 shadow-md z-10">
          <ul className="flex justify-between items-center m-5">
            {/* #1 Home icon */}
            <Link to={"/"}>
              <li>
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
              </li>
            </Link>

            {/* #2 Cart icon */}
            <Link to={"/shoppingcart"}>
              <li>
                <img
                  src={cartOutline}
                  alt="icon of cart navigation"
                  className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition duration-300 group-hover:hidden"
                />
                <img
                  src={cartSolid}
                  alt="icon of cart navigation"
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
            <Link to={"/profile"}>
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
            {/* #5 User icon */}
            <li>
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
            </li>
            {/* #5 User icon */}
            <Link to={"/create-account"}>
              <li>
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
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}
