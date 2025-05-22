import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

type Product = {
  product_id: number;
  product_name: string;
  product_img: string;
  category_type: string;
  gender: string;
};

const Carousel1 = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // State för att lagra de filtrerade produkterna

  const { store_type } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetcha produkterna som json från servern
      try {
        const res = await fetch("http://localhost:3000/products");
        const products: Product[] = await res.json();
        console.log("category-prop:");
        console.log(
          "Alla category_type i produkter:",
          products.map((p) => p.category_type)
        );

        const filteredData = products.filter((product) => {
          if (store_type === "herrmode") {
            return product.gender === "Man";
          } else {
            return product.gender === "Woman";
          }
        });
        const shuffled = filteredData
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        setFilteredProducts(shuffled);
      } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
      }
    };

    fetchProducts();
  }, []);

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
            <Link
              to={`/shop/${store_type}/${product.category_type}/${product.product_id}`}
            >
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
export default Carousel1;
