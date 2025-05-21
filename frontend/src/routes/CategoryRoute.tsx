import React from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";

export default function CategoryRoute() {
  const { store_type } = useParams();
  return (
    <>
      <section className="bg-amber-100 p-[1em]">
        {store_type === "dammode" ? (
          <h1 className="text-center">Dammode</h1>
        ) : (
          <h1 className="text-center">Herrmode</h1>
        )}

        <section id="categories_section">
          <h2 className="text-center">KATEGORIER</h2>

          <div className="grid grid-cols-2 justify-items-center">
            {/* Dessa ska bytas ut mot CategoryCard:s som ska genereras utifrån datan från databasen */}
            <CategoryCard
              category="Kategori"
              clothingImage="Bild"
              shopType="Shoptyp"
            />
            <CategoryCard
              category="Kategori"
              clothingImage="Bild"
              shopType="Shoptyp"
            />
            <CategoryCard
              category="Kategori"
              clothingImage="Bild"
              shopType="Shoptyp"
            />
            <CategoryCard
              category="Kategori"
              clothingImage="Bild"
              shopType="Shoptyp"
            />
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
