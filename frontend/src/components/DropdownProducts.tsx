import { useEffect, useState } from "react";
// import xMark from "../assets/dropdown/x-mark.svg";
// import arrowDown from "../assets/dropdown/arrow-down.svg";
import { useParams } from "react-router-dom";

function DropdownProducts() {
  interface Product {
    product_id: number;
    product_description: string;
  }

  const [isOpen, setIsOpen] = useState(false);
  const { id, selected_category } = useParams<{
    id: string;
    selected_category: string;
  }>();
  const [product, setProduct] = useState<Product | null>(null);

  const xMark = "/dropdown/x-mark.svg";
  const arrowDown = "/dropdown/arrow-down.svg";

  /*Funktion för toggle dropdownmeny*/
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  /* Fetch av data från databasen */
  useEffect(() => {
    fetch(
      `https://ao-bea-2-0.onrender.com/category/${selected_category}/products/${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Något gick fel med hämtningen");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error(error);
      });
    setIsOpen(false);
  }, [id]);

  return (
    /* dropdown div */
    <div
      className={`dropdown max-w-[400px] min-h-[50px] m-auto mt-5 mb-[20px] ${
        isOpen ? "bg-[var(--buttonActive)]" : " bg-[var(--bright2)]"
      } md:max-w-[85%]`}
    >
      {/* Knapp för dropdown */}
      <button
        className="dropdown-btn w-[100%] flex justify-center items-center cursor-pointer p-[30px] box-border"
        onClick={toggleDropdown}
      >
        {/* Innehåll i dropdownmenyn */}
        <div className="button-content flex justify-around items-center text-[20px] w-[100%]">
          <p className="text-xl">Produktbeskrivning</p>
          <img
            src={isOpen ? xMark : arrowDown}
            alt="Dropdown arrow"
            className={`icon w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition duration-150 transform ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </div>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {/* innehåll */}
        <div className="id-container p-4">
          {/* Rendering */}
          <p className="mb-6">{product?.product_description}</p>
          <span className="id font-bold">
            Produkt-ID: {product?.product_id}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DropdownProducts;
