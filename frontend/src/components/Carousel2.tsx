import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import type { Product } from "../types/Product";

// excludedProducts är de produkter som ska uteslutas från Carousel2 -inhämtade från Carousel1
type Props = {
  allProducts: Product[];
  excludeProducts: Product[];
};

const Carousel2: React.FC<Props> = ({ allProducts, excludeProducts }) => {
  const { id } = useParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Referens till Swiper-instansen
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }

    // Exkludera produkter från Carousel1
    if (excludeProducts.length === 0) return;
    const excludedIds = excludeProducts.map((p) => p.product_id);

    const targetGender = excludeProducts[0].gender.toLowerCase();

    const filtered = allProducts.filter((product) => {
      const sameGender = product.gender.toLowerCase() === targetGender;
      const notCurrent = product.product_id !== Number(id);
      const included = !excludedIds.includes(product.product_id);

      return sameGender && notCurrent && included;
    });

    const shuffled = filtered.sort(() => Math.random() - 0.5).slice(0, 4);
    setFilteredProducts(shuffled);
  }, [allProducts, excludeProducts, id]);

  return (
    <div className="pb-[3vh]">
      <p className="text-center text-2xl mb-4 font-light font-sans">
        Matcha med:
      </p>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        centeredSlides
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
                className="rounded-md w-full h-auto mx-auto block md:w-[85%]"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel2;
