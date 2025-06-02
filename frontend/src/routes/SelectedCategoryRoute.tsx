import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SelectedCategoryCard from "../components/SelectedCategoryCard";

function SelectedCategoryRoute() {
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

  const { store_type, selected_category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://ao-bea-2-0.onrender.com/products")
      .then((response) => response.json())
      .then((data: Product[]) => {
        console.log("Hämtade produkter", data);
        const filteredProducts = data.filter((product) => {
          if (store_type === "herrmode") {
            if (
              product.gender === "Man" &&
              product.category_type === selected_category
            ) {
              return true;
            }
          } else if (store_type === "dammode") {
            if (
              product.gender === "Woman" &&
              product.category_type === selected_category
            ) {
              return true;
            }
          }
          console.log(
            "store_type",
            store_type,
            "selected_category",
            selected_category
          );
          return false;
        });
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error(
          "Något gick fel med hämtningen eller filtreringen",
          error
        );
      });
  }, [store_type, selected_category]);

  return (
    <div>
      <h1 className="text-center mt-4">
        {store_type === "herrmode" ? "Herrmode" : "Dammode"}
      </h1>
      <h2 className="text-center">{selected_category}</h2>
      <section className="product-section-container grid grid-cols-2 min-w-[190px] min-h-[240px] gap-[1rem] m-4">
        {products.length === 0 ? (
          <p className="text-center">Inga produkter hittades.</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product.product_id}>
              <SelectedCategoryCard
                clothingImage={[product.product_img]}
                productName={product.product_name}
                productPrice={product.price}
                product_id={product.product_id}
              />
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default SelectedCategoryRoute;
