import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

type Product = {
  product_id: number;
  product_name: string;
  product_img: string;
  category_type: string;
};

type Carousel2Props = {
  category: string;
};

const Carousel2: React.FC<Carousel2Props> = ({ category }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // State för att lagra de filtrerade produkterna

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetcha produkterna som json från servern
      try {
        const res = await fetch("http://localhost:3000/products");
        // Kontrollera om fetchen lyckades
        console.log("Fetch status:", res.status);

        const products: Product[] = await res.json();
        // Kontrollera om produkterna hämtades korrekt
        console.log("Fetched products:", products);

        // Hämta produkterna från servern
        const byCategory = products.filter(
          (product) =>
            product.category_type.toLowerCase() === category.toLowerCase()
        );
        // Shuffla produkterna och ta de första 4
        const shuffled = byCategory.sort(() => Math.random() - 0.5).slice(0, 4);

        // Uppdatera state med de shufflade produkterna
        setFilteredProducts(shuffled);
      } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
      }
    };

    fetchProducts();
  }, [category]);
  // Anropa fetchProducts när komponenten laddas eller category ändras

  return (
    <div className="pb-[3vh]">
      <p className="text-center text-2xl mb-4 font-light font-sans">
        Du kanske även gillar
      </p>

      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={10}
        breakpoints={{
          640: { slidesPerView: 2.2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        navigation
        pagination={{ clickable: true }}
        className="swiper-container"
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product.product_id}>
            <Link to={`/product/${product.product_id}`}>
              <img
                src={product.product_img}
                alt={product.product_name}
                className="rounded-md w-full h-auto max-w-[90%] mx-auto block"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Carousel2;
