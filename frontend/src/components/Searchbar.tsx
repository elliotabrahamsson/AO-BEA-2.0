// Testade lite att använda styled components i denna map men tyckte tailwind var bekvämare så började använda det istället.
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// $-tecknet innan menuStatus används inom styled-components för att signalera till React att prop:en enbart kommer användas för styling inom komponenten (den skickas alltså inte vidare till HTML:n).
interface StyledContainerSettings {
  $menuStatus: boolean;
}

// När man sökt efter items kommer man se dem här.
const SearchedItemsContainer = styled.div<StyledContainerSettings>`
  min-height: 20vh;
  width: 100%;
  padding: 1em;

  display: ${(props) => (props.$menuStatus ? "block" : "none")};

  color: var(--bright1);
  background-color: var(--dark3);
`;

export default function Searchbar() {
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

  const location = useLocation();
  const navigate = useNavigate();

  // Detta används för form:ens routing istället för action="".
  const [menuStatus, setMenuStatus] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [store_type, setStoreType] = useState<string>("båda");
  const [userInput, setUserInput] = useState<string>("");

  const makeUniqueCategoryArr = (products: Product[], store_type: string) => {
    let uniqueProductArr: Product[] = [];
    if (store_type === "båda") {
      products.forEach((product) => {
        if (
          !uniqueProductArr.find(
            (existingCategory) =>
              existingCategory.category_type === product.category_type
          )
        ) {
          uniqueProductArr.push(product);
          return;
        }
      });
    } else if (store_type === "dammode") {
      products
        .filter((product) => product.gender === "Woman")
        .forEach((product) => {
          if (
            !uniqueProductArr.find(
              (existingCategory) =>
                existingCategory.category_type === product.category_type
            )
          ) {
            uniqueProductArr.push(product);
            return;
          }
        });
    } else if (store_type === "herrmode") {
      products
        .filter((product) => product.gender === "Man")
        .forEach((product) => {
          if (
            !uniqueProductArr.find(
              (existingCategory) =>
                existingCategory.category_type === product.category_type
            )
          ) {
            uniqueProductArr.push(product);
            return;
          }
        });
    }
    return uniqueProductArr;
  };

  const makeCategoryStringArr = (products: Product[]) => {
    let categoryStringtArr: string[] = [];

    products.forEach((product) => {
      if (
        !categoryStringtArr.find(
          (categoryStringtArr) => categoryStringtArr === product.category_type
        )
      ) {
        categoryStringtArr.push(product.category_type);
        return;
      }
    });

    return categoryStringtArr;
  };

  const updateCategoryStringArr = (clickedCategory: string) => {
    let updatedCategoryStringArr: string[] = [];

    if (categories.includes(clickedCategory)) {
      updatedCategoryStringArr = categories.filter((category) => {
        return category !== clickedCategory;
      });
      setCategories(updatedCategoryStringArr);
    } else {
      setCategories([...categories, clickedCategory]);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  // Denna use effect "reset:ar" alla checkboxes till checked när man byter store_type (dvs. byter mellan "båda", "dammode" och "herrmode")
  useEffect(() => {
    setCategories([]);
  }, [store_type]);

  // Gör att searchbaren stängs när man re-routas till en annan route.
  useEffect(() => {
    setMenuStatus(false);
  }, [location]);

  // console.log("Categories: " + categories);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Detta ska användas för att stoppa in query paramterar i vår URL. På så sätt kan vi få tillgång till kategorier och annat när vi re-routat till den nya routen via navigate().
    const searchParams = new URLSearchParams();
    searchParams.set("shop", store_type);
    // .join(",") behövs eftersom att categories är en array. .join(",") gör t.ex att [hej, då] blir en sträng "hej, då".
    if (categories.length !== 0) {
      searchParams.set("categories", categories.join(","));
    } else {
      searchParams.set(
        "categories",
        makeCategoryStringArr(makeUniqueCategoryArr(products, store_type)).join(
          ","
        )
      );
    }

    if (searchParams) {
      searchParams.set("searchTerm", userInput);
    }
    navigate(`/searchedResult?${searchParams.toString()}`);

    setMenuStatus(!menuStatus);
  };

  return (
    <>
      <section id="SearchbarContainer">
        <form
          onSubmit={handleSubmit}
          className="h-[10vh] w-full flex flex-col justify-center items-center bg-[var(--bright2)]"
        >
          <input
            type="text"
            placeholder="Sök"
            onClick={() => setMenuStatus(!menuStatus)}
            onChange={(event) => {
              setMenuStatus(true);
              setUserInput(event.target.value);
            }}
            className="h-[60%] w-[90%] px-[3em] rounded-full text-[var(--bright1)] bg-[var(--dark3)] bg-no-repeat bg-left bg-[url(/src/assets/Searchbar/magnifyingglas.png)]"
          />
        </form>
      </section>
      <SearchedItemsContainer $menuStatus={menuStatus}>
        {/* Osäker på om man ska använda ett form element här men nu blev det så */}
        <form onSubmit={handleSubmit}>
          <fieldset className="flex flex-col items-start">
            <legend className="text-3xl font-bold text-center mb-5">
              Avancerad filtering
            </legend>

            <section
              id="store_type_section"
              className="grid grid-cols-1 text-[1.2rem] items-center my-3"
            >
              <h3>Butikstyp</h3>
              <label
                htmlFor="store_type"
                className="flex items-center"
                onClick={() => setStoreType("båda")}
              >
                <input
                  type="radio"
                  id="båda"
                  name="store_type"
                  value={"båda"}
                  className="h-[20px] w-[20px] mr-2"
                  onChange={(event) => setStoreType(event.target.value)}
                  checked={store_type === "båda"}
                />
                Båda
              </label>

              <label
                htmlFor="store_type"
                className="flex items-center"
                onClick={() => setStoreType("dammode")}
              >
                <input
                  type="radio"
                  id="dammode"
                  name="store_type"
                  value={"dammode"}
                  className="h-[20px] w-[20px] mr-2"
                  onChange={(event) => setStoreType(event.target.value)}
                  checked={store_type === "dammode"}
                />
                Enbart dammode
              </label>
              <label
                htmlFor="store_type"
                className="flex items-center"
                onClick={() => setStoreType("herrmode")}
              >
                <input
                  type="radio"
                  id="herrmode"
                  name="store_type"
                  value={"herrmode"}
                  className="h-[20px] w-[20px] mr-2"
                  onChange={(event) => setStoreType(event.target.value)}
                  checked={store_type === "herrmode"}
                />
                Enbart herrmode
              </label>
            </section>

            <section
              id="Category_selector_section"
              className="text-[1.2rem] my-3"
            >
              <h3>Kategorier</h3>

              {makeUniqueCategoryArr(products, store_type).map((product) => {
                return (
                  <label
                    htmlFor="category"
                    key={product.id}
                    onClick={() =>
                      updateCategoryStringArr(product.category_type)
                    }
                    className="flex items-center py-2"
                  >
                    <input
                      type="checkbox"
                      name="category"
                      value={product.category_type}
                      checked={categories.includes(product.category_type)}
                      onChange={() =>
                        updateCategoryStringArr(product.category_type)
                      }
                      className="h-[20px] w-[20px] mr-2"
                    />
                    {product.category_type}
                  </label>
                );
              })}
            </section>

            <button
              type={"submit"}
              className="bg-[var(--bright1)] relative min-w-[230px] m-[1em] min-h-[44px] text-[var(--dark1)] whitespace-nowrap font-bold text-[24px] self-center"
            >
              SÖK
            </button>
          </fieldset>
        </form>
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
