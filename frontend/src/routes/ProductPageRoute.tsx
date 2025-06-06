import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Carousel1 from "../components/Carousel1";
import Carousel2 from "../components/Carousel2";
import Dropdowncolors from "../components/Dropdowncolors";
import DropdownProducts from "../components/DropdownProducts";
import DropdownCare from "../components/DropdownCare";
import { useContext } from "react";
import { ShoppingCartContext } from "../components/ShoppingCartContext";

export default function ProductPageRoute() {
  const navigate = useNavigate();
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
  const { addItemToCart } = useContext(ShoppingCartContext);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    fetch(
      `https://ao-bea-2-0.onrender.com/category/${selected_category}/products/${id}`
    )
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
        const res = await fetch("https://ao-bea-2-0.onrender.com/products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <div>

      <div className="main-container md:flex md:flex-1/2">
        <div className="img-container p-5 w-full md:w-1/2 md:flex md:justify-center md:items-center">
          <img src={product?.product_img} alt="Main" className="md:w-[70%] " />
        </div>
        {/* högerkolumnen */}
        <div className="right-container md:flex md:flex-col md:flex-1/2 md:justify-around md:items-center">
          <h3 className="flex justify-center items-center text-center p-2 mt-2 mb-2">
            {product?.product_name}
          </h3>
           <h5 className="text-center text-2xl">{product?.price} kr</h5>
          <div className="dropdowncolors">
            <Dropdowncolors
              colors={product?.color ?? []}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </div>
          {/* Props till Dropdowncolors */}
          <div className="flex flex-wrap text-center justify-center items-center gap-3 p-1 ">
            {product?.size.map((size) => (
              <p
                key={size}
                className={`border w-[4.3rem] h-[2rem] p-1 min-w-max ${
                  selectedSize === size ? "bg-[var(--bg-women)]" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
          <div className="p-1">
            <div className="bg-[var(--dark3)] p-8 relative min-w-[190px] m-[1em] h-[44px] flex justify-center items-center">
              <button
                className="text-white whitespace-nowrap text-[10px]"
                onClick={() => {
                  if (product && selectedColor && selectedSize) {
                    addItemToCart(
                      product.product_id,
                      product.product_name,
                      selectedColor,
                      selectedSize,
                      product.price,
                      product.product_img
                    );
                    navigate("/shoppingcart");
                  }
                }}
              >
                <h3 className="text-white whitespace-nowrap text-[10px]">
                  Lägg till i varukorg
                </h3>
              </button>
            </div>
          </div>
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
