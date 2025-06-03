import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
/* import { useAuth } from "../context/AuthContext"; //// Hämtar auth-data från vår context */
import { ShoppingCartContext } from "./ShoppingCartContext";

// Interface
interface PaymentMethod {
  id: string;
  label: string;
  icons: string[];
}

const paymentMethods: PaymentMethod[] = [
  { id: "credit", label: "Kredit", icons: ["/visa.png", "/mastercard.png"] },
  { id: "klarna", label: "Klarna", icons: ["/klarna.png"] },
  { id: "swish", label: "Swish", icons: ["/swish.png"] },
];

interface PaymentMethodName {
  name: string;
}

const paymentMethodNames: PaymentMethodName[] = [
  { name: "mastercard" },
  { name: "visa" },
  { name: "Klarna" },
  { name: "GooglePay" },
  { name: "Paypal" },
  { name: "ApplePay" },
];

// Styled component med korrekt syntax
const Section = styled.section`
  font-family: "Merriweather Sans", sans-serif;

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

export default function CheckoutForm() {
  const navigate = useNavigate(); //En funktion från react som hjälper en att navigera programmatiskt
  /* const { user } = useAuth(); //Hämtar den inloggade användaren */
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("Klarna");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [fullname, setFullName] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const { cartItems } = useContext(ShoppingCartContext);
  //Hämtar cartItems, addItemToCart och removeItemFromCart från ShoppingCartContext

  useEffect(() => {
    setFullName(`${firstname} ${lastname}`);
  }, [firstname, lastname]);

  useEffect(() => {
    setAddress(`${street}, ${zipcode}, ${city}`);
  }, [street, zipcode, city]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderNumber = uuidv4();
    const now = new Date();
    now.setHours(now.getHours() + 2);
    const date = now.toISOString().slice(0, 19).replace("T", " "); // Formaterar datumet till YYYY-MM-DD HH:MM:SS
    //Lägg en post här

    let price = cartItems
      .map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b, 0);

    try {
      const makeOrder = await fetch(
        "https://ao-bea-2-0.onrender.com/createOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: orderNumber,
            name: fullname,
            email,
            address,
            date,
            phone,
            price: price,
            products: cartItems.map((item) => ({
              id: item.id,
              name: item.name,
              size: item.size,
              price: item.price,
              color: item.color,
              quantity: item.quantity,
            })),
          }),
        }
      );

      if (!makeOrder.ok) {
        throw new Error("Failed to create order");
      }
      navigate(`/orderconfirmation?orderNumber=${orderNumber}`, {
        state: { email },
      });
      //Navigerar till orderconfirmation samt skickar med det dynamiska uuid numret via URL:en
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  cartItems
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);

  return (
    <>
      <Section>
        <h1 className="ml-6 mt-4">LEVERANS</h1>
        {/* Samma form för både leverans och betalning */}
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            {/* Leveransformulär */}
            <div>
              <div className="first-row-container">
                <div className="form-group">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Förnamn
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                    required
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    required
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
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
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
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
                    required
                    value={zipcode}
                    onChange={(e) => setZipCode(e.target.value)}
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
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
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
                  type="tel"
                  id="phone"
                  placeholder="+46"
                  className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Visa knapp för att gå vidare till betalning */}
              {!showPaymentSection && (
                <button
                  type="button"
                  onClick={() => setShowPaymentSection(true)}
                  className="text-white bg-[#403d37] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[4px] text-sm w-full sm:w-auto px-5 py-2.5 mt-8 h-[44px]"
                >
                  <h2>Fortsätt till betalning</h2>
                </button>
              )}
            </div>

            {/* Betalningsmetod, visas först när man klickat vidare */}
            {showPaymentSection && (
              <div className="pay-method-container">
                <h3 className="ml-6 mt-6">Välj Betalningsmetod</h3>
                <ul className="space-y-2">
                  {paymentMethods.map((method) => (
                    <li key={method.id} className="w-full">
                      <div className="flex items-center p-2 ps-3">
                        <input
                          id={method.id}
                          type="radio"
                          value={method.id}
                          checked={selectedMethod === method.id}
                          name="payment"
                          onChange={() => setSelectedMethod(method.id)}
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
                              src={`/checkout-icons${icon}`}
                              alt={`icon of ${method.label}`}
                            />
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Betalmetodsspecifika fält */}
                {selectedMethod === "klarna" && (
                  <div className="klarna-container mt-6">
                    <h4>Dina uppgifter:</h4>
                    <div className="form-group mt-3">
                      <input
                        type="email"
                        placeholder="Ange din E-post"
                        className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                        required
                      />
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        placeholder="Postnummer"
                        className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                        required
                      />
                    </div>
                  </div>
                )}

                {selectedMethod === "credit" && (
                  <div className="credit-container mt-6">
                    <h4>Kreditkort - Kortuppgifter</h4>
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        placeholder="Kortnummer"
                        className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                        required
                      />
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                        required
                      />
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        placeholder="CVC"
                        className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                        required
                      />
                    </div>
                  </div>
                )}

                {selectedMethod === "swish" && (
                  <div className="swish-container mt-6">
                    <h4>Swish - Telefonnummer</h4>
                    <div className="form-group mt-3">
                      <input
                        type="tel"
                        placeholder="+46"
                        className="bg-gray-50 border border-black text-sm rounded-[4px] block w-full p-2.5"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Ikoner för betalmetoder längst ner */}
                <div className="payment-methods-bar-container flex flex-wrap justify-center items-center mt-8">
                  {paymentMethodNames.map((method) => (
                    <img
                      key={method.name}
                      src={`/checkout-icons/payment-bar/${method.name}.png`}
                      alt={`icon of ${method.name}`}
                    />
                  ))}
                </div>

                {/* Slutför köp-knapp */}
                <button
                  type="submit"
                  className="text-white bg-[#403d37]  hover:bg-blue-800 font-medium rounded-[4px] text-sm w-full sm:w-auto px-5 py-2.5 mt-8 h-[44px]"
                >
                  <h2>Slutför köp</h2>
                </button>
              </div>
            )}
          </div>
        </form>
      </Section>
    </>
  );
}
