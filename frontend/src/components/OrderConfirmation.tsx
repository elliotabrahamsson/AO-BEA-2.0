import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation: React.FC = () => {
    const location = useLocation(); //Hämtar och återger URLen som ett objekt
    const queryParams = new URLSearchParams(location.search); //Läser URL-paramtetrar
    const orderNumber = queryParams.get('orderNumber'); //Hämtar det som står bakom orderNumber i URL:en
    return (
        <div className="flex flex-col items-center justify-center pt-4 mt-7">
            <img
                className="w-1/4 h-1/4"
                src="/footer/Icons/Ao-bea-icon2.png"
                alt="Ao Bea logotype"
            />

            <div className="text-center mt-10">
                <h3 className="font-bold text-xl">Tack för din beställning</h3>
                <p className="mt-5 text-[20px]">
                    Ditt ordernummer:
                    <br />
                    {orderNumber}
                </p>
                <p className="mt-5 text-[20px]">
                    Har skickats till :<br />
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
