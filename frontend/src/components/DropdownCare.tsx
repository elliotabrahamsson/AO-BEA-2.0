import { useState } from "react";
// import xMark from '/dropdown/x-mark'
// import arrowDown from '/dropdown/arrow-down.svg';

function DropdownCare() {
  const [isOpen, setIsOpen] = useState(false);

  const xMark = "/dropdown/x-mark.svg";
  const arrowDown = "/dropdown/arrow-down.svg";

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`dropdown max-w-[400px] min-h-[50px] m-auto mb-[20px] ${
        isOpen ? "bg-[var(--buttonActive)]" : "bg-[var(--bright2)]"
      } md:max-w-[85%]`}
    >
      <button
        className="dropdown-btn w-[100%] flex justify-center items-center cursor-pointer p-[30px] box-border"
        onClick={toggleDropdown}
      >
        <div className="button-content flex justify-around items-center text-[20px] w-[100%]">
          <p>Material & Skötsel</p>
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
        <div className="product-info p-4">
          <p>
            <strong>Komposition:</strong>
          </p>
          {/* Material renderas */}
          <p>
            <strong>Skötselråd:</strong>
            {/* Rendera skötselråd */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DropdownCare;
