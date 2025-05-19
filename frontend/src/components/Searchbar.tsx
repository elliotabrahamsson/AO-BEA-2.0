import styled from "styled-components";
import React, { useState } from "react";

// v INTERFACES v
// $-tecknet innan menuStatus används inom styled-components för att signalera till React att prop:en enbart kommer användas för styling inom komponenten (den skickas alltså inte vidare till HTML:n).
interface StyledContainerSettings {
  $menuStatus: boolean;
}

// v CSS v
// Searchbarens container.
const SearchbarContainer = styled.section`
  height: 10vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: var(--bright2);
`;
// Själva searchbaren.
const SearchbarInput = styled.input`
  height: 60%;
  width: 90%;

  padding-left: 3em;
  padding-right: 3em;

  border-radius: 25px;

  color: var(--bright1);
  background-color: var(--dark3);
  background-image: url(/src/assets/Searchbar/magnifyingglas.png);
  background-repeat: no-repeat;
  background-position: left center;
`;
// När man sökt efter items kommer man se dem här.
const SearchedItemsContainer = styled.div<StyledContainerSettings>`
  min-height: 20vh;
  width: 100%;

  display: ${(props) => (props.$menuStatus ? "block" : "none")};

  background-color: var(--dark3);
`;

export default function Searchbar() {
  // v FUNKTIONER & VARIABLER v
  const [menuStatus, setMenuStatus] = useState(false);

  const exampleArr = [
    "Klädesplagg1",
    "Klädesplagg2",
    "Byxor1",
    "Byxor2",
    "Skjorta",
  ];
  let searchedArr = [];

  const filterItems = (itemArr: string[], userInput: string) => {
    itemArr.forEach((item) => {
      if (item.toLocaleLowerCase().includes(userInput.toLocaleLowerCase())) {
        searchedArr.push(item);
      }
    });
  };

  return (
    <>
      <SearchbarContainer id="SearchbarContainer">
        <SearchbarInput
          type="text"
          placeholder="Sök"
          onClick={() => setMenuStatus(!menuStatus)}
          onChange={() => setMenuStatus(true)}
        />
      </SearchbarContainer>
      <SearchedItemsContainer $menuStatus={menuStatus}>
        <h1>Filler content</h1>
      </SearchedItemsContainer>
    </>
  );
}

// Vue version --- TA BORT SEN
{
  /* <script setup>
import { ref, watch } from "vue";
import { useUserstore } from "../../stores/userStore.js";
import { RouterLink } from "vue-router";

const userInput = ref("");
const menuStatus = ref("display: none");
const userStore = useUserstore();

const GetShopCategories = () => {
  let shopCategoriesArr = [];
  let mensCategories = [];
  let womensCategories = [];

  userStore.data?.mens_fashion.forEach((item) => {
    if (!mensCategories.includes(item.Category)) {
      mensCategories.push(item.Category);
    }
  });

  userStore.data?.womens_fashion.forEach((item) => {
    if (!womensCategories.includes(item.Category)) {
      womensCategories.push(item.Category);
    }
  });

  shopCategoriesArr.push(mensCategories);
  shopCategoriesArr.push(womensCategories);

  return shopCategoriesArr;
  // console.log(shopCategoriesArr);
};

const shopCategories = ref(null);

watch(userInput, (input) => filterSearchInput(input));

const filterSearchInput = (input) => {
  menuStatus.value = "";
  shopCategories.value = GetShopCategories();
  // console.log("Körs");
  shopCategories.value.forEach((arr, index) => {
    shopCategories.value[index] = arr.filter((category) =>
      category.toLowerCase().includes(input.toLowerCase())
    );
  });
};

const showSearchMenu = () => {
  shopCategories.value = GetShopCategories();
  if (menuStatus.value === "display: none") {
    menuStatus.value = "";
  } else {
    menuStatus.value = "display: none";
  }
};
</script>

<template>
  <section
    class="flex justify-center items-center flex-col w-full text-white bg-[#f6f4f0]"
  >
    <div
      id="searchbar"
      class="flex items-center justify-between h-14 w-9/10 rounded-full"
    >
      <input
        type="text"
        placeholder="Sök produktkategori"
        class="w-full"
        v-model="userInput"
        @click="showSearchMenu"
      />
      <img src="../assets/Searchbar/magnifyingglas.png" alt="Magnifying glas" />
    </div>
    <div id="searchOptions" :style="menuStatus">
      <div v-if="shopCategories">
        <RouterLink to="/shop/mens_fashion"><h4>Herrmode</h4></RouterLink>
        <p v-if="shopCategories[0].length === 0">Inga matchande kategorier.</p>
        <!-- Ska bytas ut till rätt path -->
        <RouterLink
          class="category"
          :to="'/shop/mens_fashion/' + category"
          v-for="category in shopCategories[0]"
          :key="category"
          ><p>{{ category }}</p></RouterLink
        >
      </div>

      <div v-if="shopCategories">
        <RouterLink to="/shop/womens_fashion"><h4>Dammode</h4></RouterLink>

        <p v-if="shopCategories[1].length === 0">Inga matchande kategorier.</p>
        <!-- Ska bytas ut till rätt path -->
        <RouterLink
          class="category"
          :to="'/shop/womens_fashion/' + category"
          v-for="category in shopCategories[1]"
          :key="category"
        >
          <p>{{ category }}</p>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
input {
  font-family: "Merriweather Sans", sans-serif;
  font-weight: lighter;
}

#searchbar {
  padding: 0em 1em;
  margin: 1em 1em;
}

#searchOptions {
  display: flex;
  justify-content: space-around;

  animation: 3s ease-in 1s;

  width: 100vw;
  padding: 1em;
}

#searchOptions div {
  display: flex;
  flex-direction: column;
}

#searchOptions p {
  max-width: 70%;
}

.category {
  margin: 0.5em;
}

div {
  background-color: var(--dark3);
}

h4 {
  font-family: "Nexa Rust Sans", sans-serif;
  font-weight: 900;
  font-size: 18px;
}

::placeholder {
  color: white;
}
</style> */
}
