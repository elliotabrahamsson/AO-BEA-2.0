/*import SearchbarComp from "../components/Searchbar";
import BreadCromb from "../components/BreadCromb";
import DropdownColors from "../components/DropdownColors" */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Carousel1 from "../components/Carousel1";
import Carousel2 from "../components/Carousel2";

type Product = {
  product_id: number;
  product_name: string;
  product_img: string;
  product_description: string;
  category_type: string;
};

export default function ProductPageRoute() {
  return (
    /*<SearchbarComp />
        <BreadCromb /> */
    <div>
      <div className="p-5">
        <img src={require("../assets/main-img.png")} alt="Main" />
      </div>
      <h3 className="flex justify-center items-center text-center p-2 mt-2 mb-2">
        {/*products.name*/}
      </h3>
      {/*<Dropdowncolors />*/}

      <div className="flex flex.wrap text-center justify-center items-center gap-4.5 p-2 ">
        {/*sizes.map((size) => (
          <p
            key={size.size}
            className="border w-[4.3rem] h-[29px] p-1 min-w-max"
          >
            {size}
          </p>
        ))*/}
      </div>

      <div className="p-1">{/*checkoutbutton*/}</div>

      <div className="p-4">
        {/*DropdownProd*/}
        {/*DropdownCare*/}

        <Carousel1 />
        <Carousel2 />
      </div>
      {/*<Footer />*/}
      {/*<Navbar />*/}
    </div>
  );
}
