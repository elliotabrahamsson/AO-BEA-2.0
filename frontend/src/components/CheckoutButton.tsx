// Säkerställ så cart är korrekt definierad i app.tsx //

import React from "react";
import { Link } from "react-router-dom";

const CheckoutButton: React.FC = () => {
  return (
    <Link to="/#/shoppingcart">
      <div className="bg-[var(--dark3)] p-4 relative min-w-[190px] m-[1em] h-[44px] flex justify-center items-center">
        <h3 className="text-white whitespace-nowrap text-[10px]">
          Lägg till i varukorg
        </h3>
      </div>
    </Link>
  );
};

export default CheckoutButton;
