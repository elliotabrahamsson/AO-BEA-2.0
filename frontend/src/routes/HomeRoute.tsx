/* import styled from "styled-components"; */
import "../css/HomeRoute.css";
import { Link } from "react-router-dom";

export default function HomeRoute() {
  return (
    <>
      <Link to="/shop/dammode">
        <div className="women-section">
          <h2>Dammode</h2>
        </div>
      </Link>

      <div className="main-container">
        <img
          src="/footer/Icons/Ao-bea-icon2.png"
          alt="Ao Bea logotype"
          className="logo"
        />
      </div>
      <Link to="/shop/herrmode">
        <div className="men-section">
          <h2>Herrmode</h2>
        </div>
      </Link>
    </>
  );
}
