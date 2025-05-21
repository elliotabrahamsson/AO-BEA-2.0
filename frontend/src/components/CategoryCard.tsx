import { Link } from "react-router-dom";

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
    <Link to={"/shop/" + shopType + "/" + category}>
      <section
        id="card"
        className={`flex justify-center items-center w-[190px] min-h-[240px] m-[1em] bg-cover bg-center`}
        // Eftersom att tailwind sätter all css under build time (inte run time) kan vi inte använda ex. bg-[url(${clothingImage})] eftersom att Tailwind inte kan läsa JavaScript variabler. Därför satte jag bakgrunden i style-attributet.
        style={{ backgroundImage: `url(${clothingImage})` }}
      >
        <h3
          className={
            "bg-[var(--dark3)] text-[var(--bright1)] p-[0.4em] text-[80%]"
          }
          style={{ fontSize: "1.2em" }}
        >
          {category}
        </h3>
      </section>
    </Link>
  );
}

{
  /*
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
