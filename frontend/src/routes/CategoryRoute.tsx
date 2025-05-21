import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";

export default function CategoryRoute() {
  interface Product {
    id: number;
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

  const { store_type } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data: Product[]) => {
        // Här kommer alla kategorier hamna. De kommer vara unika och komma från shoptypen som skickas med via params, dvs. herrmode eller dammode.
        let uniqueCategoryData: Product[] = [];
        // Filtrerar databasens data utifrån vilken shoptyp det är, dvs. herrmode eller dammode. Denna array innehåller alla produkter från en viss shoptyp, t.ex alla herrmode produkter.
        const filteredData = data.filter((product) => {
          if (store_type === "herrmode") {
            return product.gender === "Man";
          } else {
            return product.gender === "Woman";
          }
        });
        // Denna forEach kollar om en produkt-kategori finns i uniqueCategoryData, om den inte gör det kommer den läggas till i arrayen via en push. Detta gör att uniqueCategoryData kommer vara en array av objekt som alla har en unik kategori.
        filteredData.forEach((product) => {
          if (
            !uniqueCategoryData.find(
              (existingProduct) =>
                existingProduct.category_type === product.category_type
            )
          ) {
            uniqueCategoryData.push(product);
            return;
          } else {
            if (
              !uniqueCategoryData.find(
                (existingProduct) =>
                  existingProduct.category_type === product.category_type
              )
            ) {
              uniqueCategoryData.push(product);
              return;
            }
          }
          return uniqueCategoryData;
        });
        setProducts(uniqueCategoryData);
      });
  }, []);

  return (
    <>
      <section className="bg-amber-100 p-[1em]">
        {store_type === "dammode" ? (
          <h1 className="text-center">Dammode</h1>
        ) : (
          <h1 className="text-center">Herrmode</h1>
        )}

        <section id="categories_section">
          <h2 className="text-center my-[1.5em]">KATEGORIER</h2>

          <div className="grid grid-cols-2 justify-items-center">
            {products.map((product) => (
              <CategoryCard
                category={product.category_type}
                clothingImage={product.product_img}
                shopType={product.gender}
              />
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

{
  /*
<template>

  <h2 class="text-center">CATEGORIES</h2>

  <div
    v-if="filteredCategories.length"
    class="grid grid-cols-2 justify-items-center"
  >
    <CategoryCard
      v-for="(item, index) in filteredCategories"
      :key="index"
      :category="item.category"
      :clothingImg="item.img"
      :shopType="route.params.shoptype"
    />
  </div>
  <Footer></Footer>
  <Navbar></Navbar>
</template>
<style scoped>
h1 {
  margin: 0.7em;
  text-align: center;
}

li {
  font-size: larger;
}

.upper-pictures-container img {
  min-width: 190px;
  min-height: 240px;
}

.lower-pictures-container img {
  min-width: 190px;
  min-height: 240px;
}
</style> */
}
