import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import type { Product } from "../types/Product";

type Props = {
  allProducts: Product[];
  setSelectedProducts: (products: Product[]) => void;
  currentGender: string;
};

const Carousel1: React.FC<Props> = ({
  allProducts,
  setSelectedProducts,
  currentGender,
}) => {
  const { store_type, id } = useParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // State för att lagra de filtrerade produkterna

  const swiperRef = useRef<any>(null);
  // Referens till Swiper-instansen

  useEffect(() => {
    if (!currentGender) return;
    // Varje gång en ändring i useEffect sker, kommer den nollställa swiper slides till 0
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
    const filteredData = allProducts.filter((product) => {
      const matchGender =
        product.gender.toLowerCase() === currentGender?.toLowerCase();

      // Kontrollera att swiper renderar produkter som inte är den aktuella produkten
      const notCurrent = product.product_id !== Number(id);

      return matchGender && notCurrent;
    });
    console.log("Antal produkter som matchar:", filteredData.length);

    const shuffled = filteredData.sort(() => Math.random() - 0.5).slice(0, 4);

    setFilteredProducts(shuffled);
    setSelectedProducts(shuffled);
  }, [allProducts, currentGender, store_type, id]);
  if (!currentGender) return null;

  return (
    <div className="pb-[3vh]">
      <p className="text-center text-2xl mb-4 font-light font-sans">
        Du kanske även gillar
      </p>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
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
              to={`/shop/${product.gender === "Man" ? "herrmode" : "dammode"}/${
                product.category_type
              }/${product.product_id}`}
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
