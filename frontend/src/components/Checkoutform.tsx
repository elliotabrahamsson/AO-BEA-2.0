import { useState } from 'react';
import styled from 'styled-components';

//Interface
interface PaymentMethod {
    id: string; // Unique identifier for the payment method ( 'credit', 'klarna')
    label: string; // Display label shown to the user ('Kredit', 'Klarna')
    icons: string[]; // Array of icon file paths associated with the payment method
}

// Array of available payment methods, each with an ID, label, and icons associated with it.
const paymentMethods: PaymentMethod[] = [
    {
        id: 'credit',
        label: 'Kredit',
        icons: ['/visa.png', '/mastercard.png']
    },
    {
        id: 'klarna',
        label: 'Klarna',
        icons: ['/klarna.png']
    },
    {
        id: 'swish',
        label: 'Swish',
        icons: ['/swish.png']
    }
];
interface PaymentMethodName {
    name: string; // Name of the payment method ( 'mastercard', 'visa')
}

const paymentMethodNames: PaymentMethodName[] = [
    { name: 'mastercard' },
    { name: 'visa' },
    { name: 'Klarna' },
    { name: 'GooglePay' },
    { name: 'Paypal' },
    { name: 'ApplePay' }
];

// Styled section component
const Section = styled.section`
    font-family: 'Merriweather Sans', sans-serif;

    h1,
    h3 {
        font-size: 20px;
        padding: 0.5rem;
    }

    h2 {
        font-size: medium;
    }

    input {
        height: 44px;
    }

    .form-container,
    .pay-method-container {
        padding: 2rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .icon-container {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
    }

    .first-row-container,
    .third-row-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
`;

const CheckoutForm = () => {
    // Initial value: false = the payment section is hidden when the component first loads.
    const [showPaymentSection, setShowPaymentSection] =
        useState<boolean>(false);
    const [selectedMethod, setSelectedMethod] = useState<string>('klarna'); // Stores the selected payment method; default is Klarna and the type to string for type safety.

    return (
        <Section>
            {/* Leverans */}
            <h1 className="ml-6 mt-4">LEVERANS</h1>
            <div className="form-container">
                <form>
                    <div className="mb-5">
                        <div className="first-row-container">
                            <div className="form-group">
                                <label // htmlFor associates the label with an input field so that clicking the text
                                    // activates the corresponding field. This makes the form easier to use,
                                    // especially for people using keyboards or assistive technologies.
                                    htmlFor="firstName"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Förnamn
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="lastName"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Efternamn
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                                />
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label
                                htmlFor="street"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Gatunamn och nummer
                            </label>
                            <input
                                type="text"
                                id="street"
                                className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                            />
                        </div>

                        <div className="third-row-container mt-3">
                            <div className="form-group">
                                <label
                                    htmlFor="zipcode"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Postnummer
                                </label>
                                <input
                                    type="text"
                                    id="zipcode"
                                    placeholder="112 12"
                                    className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="city"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Stad
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                                />
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label
                                htmlFor="phone"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Telefonnummer
                            </label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="+46"
                                className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                E-postadress
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowPaymentSection(true)} // When the button is clicked, the payment section becomes visible by setting 'showPaymentSection' to true.
                            className="text-white bg-[#403d37] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[4px] text-sm w-full sm:w-auto px-5 py-2.5 mt-8 h-[44px]"
                        >
                            <h2>Fortsätt till betalning</h2>
                        </button>
                    </div>
                </form>
            </div>

            {/* Betalningsmetod */}
            {showPaymentSection && (
                <>
                    <h3 className="ml-6 mt-6">Välj Betalningsmetod</h3>
                    <div className="pay-method-container">
                        <ul className="space-y-2">
                            {paymentMethods.map(
                                (
                                    method //Creates a li element for each payment method in the 'paymentMethods' array
                                ) => (
                                    <li key={method.id} className="w-full">
                                        <div className="flex items-center p-2 ps-3">
                                            <input
                                                id={method.id}
                                                type="radio"
                                                value={method.id}
                                                checked={
                                                    selectedMethod === method.id
                                                }
                                                name="payment"
                                                onChange={() =>
                                                    // When the user changes their selection, the state is updated to the selected payment method's ID
                                                    setSelectedMethod(method.id)
                                                }
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2"
                                            />
                                            <label
                                                htmlFor={method.id}
                                                className="w-full py-3 ms-2 font-semibold text-[16px]"
                                            >
                                                {method.label}
                                            </label>
                                            <div className="icon-container">
                                                {method.icons.map((icon) => (
                                                    <img
                                                        key={icon}
                                                        src={`/src/assets/checkout-icons${icon}`}
                                                        alt={`icon of ${method.label}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>

                        {/* Klarna specific inputs */}
                        {selectedMethod === 'klarna' && (
                            <div className="klarna-container mt-6">
                                <h4>Dina uppgifter:</h4>
                                <div className="form-group mt-3">
                                    <input
                                        type="email"
                                        placeholder="Ange din E-post"
                                        className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <input
                                        type="text"
                                        placeholder="Postnummer"
                                        className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="payment-methods-bar-container flex flex-row mt-12 mb-6 gap-4">
                            {paymentMethodNames.map((method) => (
                                <img
                                    key={method.name}
                                    src={`/src/assets/checkout-icons/payment-bar/${method.name}.png`} // Dynamically sets the image source and alt text based on the payment method name.
                                    alt={`icon of ${method.name}`}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="text-white bg-[#403d37] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[4px] text-sm w-full sm:w-auto px-5 py-2.5 mt-8 h-[44px]"
                        >
                            <h2>Slutför köp</h2>
                        </button>
                    </div>
                </>
            )}
        </Section>
    );
};

export default CheckoutForm;
