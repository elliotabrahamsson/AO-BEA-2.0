import React from "react";

type Props = {
  category: string;
  clothingImage: string;
  shopType: string;
};

export default function CategoryCard({
  category,
  clothingImage,
  shopType,
}: Props) {
  return (
    <div>
      {/* Stand-ins för riktiga koden */}
      {category}, {clothingImage}, {shopType}{" "}
    </div>
  );
}

{
  /* <script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  category: String,
  clothingImg: Image,
  shopType: String,
});
</script>

<template>

  <RouterLink :to="'/shop/' + shopType + '/' + category">
    <section id="card">
      <div>
        <h3>{{ category }}</h3>
      </div>
      <img :src="clothingImg" :alt="category" />
    </section>
  </RouterLink>

</template>

<style scoped>
#card {
  min-width: 190px;
  min-height: 240px;

  margin: 1em;

  color: white;
  position: relative;
}

img {
  width: 100%;
  height: 100%;
  display: block;
}

div {
  position: absolute;

  width: 100%;
  height: 100%;
  text-align: center;

  top: 0;
  left: 0;

  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;
}

h3 {
  font-size: 20px;
  background-color: var(--dark3);
  padding: 0.4em;
}
</style> */
}
