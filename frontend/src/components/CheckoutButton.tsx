import React from "react";
// import { Link } from "react-router-dom"; // aktivera när Router är på plats

const CheckoutButton: React.FC = () => {
  return (
    <div className="bg-[var(--dark3)] p-4 relative min-w-[190px] m-[1em] h-[44px] flex justify-center items-center">
      {/* <Link to="/cart"> */}
      <a href="#">
        <h3 className="text-white whitespace-nowrap text-[10px]">
          Lägg till i varukorg
        </h3>
      </a>
      {/* </Link> */}
    </div>
  );
};

export default CheckoutButton;
