import React from "react";

const OrderConfirmation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-4 mt-7">
      <img
        className="w-1/2 h-1/2"
        src="/footer/Icons/Ao-bea-icon2.png"
        alt="Ao Bea logotype"
      />

      <div className="text-center mt-10">
        <h3 className="font-bold text-xl">Tack för din beställning</h3>
        <p className="mt-5 text-[20px]">
          Ditt ordernummer:
          <br />
          JFK25521177133L
        </p>
        <p className="mt-5 text-[20px]">
          Har skickat till :<br />
          test@mailto.com
        </p>
      </div>

      <div className="mt-20 text-center">
        <ul>
          <li className="text-base font-semibold">
            <p>Kundservice</p>
          </li>
          <li className="text-base font-semibold">
            <p>FAQ</p>
          </li>
          <li className="text-base font-semibold">
            <p>Retur</p>
          </li>
          <li className="text-base font-semibold">
            <p>Makulera order</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderConfirmation;
