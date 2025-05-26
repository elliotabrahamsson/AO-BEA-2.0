/*import SearchbarComp from "../components/Searchbar";
import BreadCromb from "../components/BreadCromb";
import DropdownColors from "../components/DropdownColors" */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Carousel1 from "../components/Carousel1";
import Carousel2 from "../components/Carousel2";
import { Link } from "react-router-dom";
import Dropdowncolors from "../components/Dropdowncolors";
import DropdownProducts from "../components/DropdownProducts";
import DropdownCare from "../components/DropdownCare";

export default function ProductPageRoute() {
  interface Product {
    product_id: number;
    category_type: string;
    product_name: string;
    brand_name: string;
    product_description: string;
    product_img: string;
    price: number;
    stock: number;
    gender: string;
    color: string[];
    size: string[];
  }
  const { id, selected_category } = useParams<{
    id: string;
    selected_category: string;
  }>();

  const [product, setProduct] = useState<Product>();
  const [products, setProducts] = useState<Product[]>([]);
  // State för att lagra de filtrerade produkterna i Carousel 1
  const [carousel1Products, setCarousel1Products] = useState<Product[]>([]);
  const [currentGender, setCurrentGender] = useState<string | undefined>();

  useEffect(() => {
    fetch(`http://localhost:3000/category/${selected_category}/products/${id}`)
      .then((response) => response.json())
      .then((data: Product) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [id, selected_category]);

  useEffect(() => {
    if (product?.gender) {
      setCurrentGender(product.gender);
    } else {
    }
  }, [product]);
  // Hämtar alla produkter för att använda i Carousel1 och Carousel 2
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    /*<SearchbarComp />
        <BreadCromb /> */

    <div>
      <div className="p-5">
        <img src={product?.product_img} alt="Main" />
      </div>
      <h3 className="flex justify-center items-center text-center p-2 mt-2 mb-2">
        {product?.product_name}
      </h3>
      <Dropdowncolors />

      <div className="flex flex-wrap text-center justify-center items-center gap-3 p-1 ">
        {product?.size.map((size) => (
          <p key={size} className="border w-[4.3rem] h-[2rem] p-1 min-w-max">
            {size}
          </p>
        ))}
      </div>

      <div className="p-1">
        <div className="bg-[var(--dark3)] p-4 relative min-w-[190px] m-[1em] h-[44px] flex justify-center items-center">
          <Link to={"/shoppingcart"}>
            <h3 className="text-white whitespace-nowrap text-[10px]">
              Lägg till i varukorg
            </h3>
          </Link>
        </div>
      </div>

      <div className="p-4">
        <DropdownProducts />
        <DropdownCare />

        {currentGender && (
          <Carousel1
            allProducts={products}
            setSelectedProducts={setCarousel1Products}
            currentGender={currentGender}
          />
        )}
        <Carousel2 allProducts={products} excludeProducts={carousel1Products} />
      </div>
    </div>
  );
}
