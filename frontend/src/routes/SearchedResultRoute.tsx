import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import SelectedCategoryCardWithoutParams from "../components/SelectedCategoryCardWithoutParams";

export default function SearchedResultRoute() {
  interface Product {
    product_id: number;
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

  const searchParams = new URLSearchParams(location.search);
  const store_type = searchParams.get("shop");
  const categoriesJoined = searchParams.get("categories");
  // Denna gör om den joinade strängen som kommer via url:en till en array igen.
  const categories = categoriesJoined ? categoriesJoined.split(",") : [];
  const searchTermCheck = searchParams.get("searchTerm");
  const searchTerm = searchTermCheck ? searchTermCheck : "";

  const [womenProducts, setWomenProducts] = useState<Product[]>([]);
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [womensUniqueCategories, setUniqueWomensCategories] = useState<
    string[]
  >([]);
  const [mensUniqueCategories, setUniqueMensCategories] = useState<string[]>(
    []
  );

  useEffect(() => {
    fetch("https://ao-bea-2-0.onrender.com/products")
      .then((response) => response.json())
      .then((data: Product[]) => {
        let products = data;

        // Sets värden måste vara unika.
        const menUniqueCategories = new Set<string>();
        const womenUniqueCategories = new Set<string>();

        if (searchTerm.length > 0) {
          setWomenProducts(
            data.filter(
              (product) =>
                product.gender === "Woman" &&
                categories.includes(product.category_type) &&
                product.product_name
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
            )
          );
        } else {
          setWomenProducts(
            data.filter(
              (product) =>
                product.gender === "Woman" &&
                categories.includes(product.category_type)
            )
          );
        }

        if (searchTerm.length > 0) {
          setMenProducts(
            data.filter(
              (product) =>
                product.gender === "Man" &&
                categories.includes(product.category_type) &&
                product.product_name
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
            )
          );
        } else {
          setMenProducts(
            data.filter(
              (product) =>
                product.gender === "Man" &&
                categories.includes(product.category_type)
            )
          );
        }

        // Dessa skapar set med kategorier (som alltid är unika pga hur set fungerar).
        data
          .filter(
            (product) =>
              product.gender === "Woman" &&
              categories.includes(product.category_type)
          )
          .forEach((product) => {
            womenUniqueCategories.add(product.category_type);
          });
        data
          .filter(
            (product) =>
              product.gender === "Man" &&
              categories.includes(product.category_type)
          )
          .forEach((product) => {
            menUniqueCategories.add(product.category_type);
          });

        // Array.from gör om ett set till en array
        setUniqueMensCategories(Array.from(menUniqueCategories));
        setUniqueWomensCategories(Array.from(womenUniqueCategories));
      });
  }, [searchParams]);

  // console.log("womensUniqueCategories: ", womensUniqueCategories);
  // console.log("mensUniqueCategories: ", mensUniqueCategories);

  // console.log("womens roducts: ", womenProducts);

  return (
    <>
      <section className="bg-[var(--bright1)] p-[1em] text-center">
        <h1>Sökresultat</h1>

        {store_type === "båda" && (
          <>
            <h3
              className={
                womenProducts.length > 0 ? "hidden" : "text-center py-3"
              }
            >
              Inga dammode produkter hittades
            </h3>
            <section
              id="dammode"
              className={womenProducts.length > 0 ? "flex flex-col" : "hidden"}
            >
              <h1 className="py-5">DAMMODE</h1>
              {womensUniqueCategories.map((category) => {
                return (
                  <>
                    <section
                      className={
                        womenProducts.filter(
                          (product) => product.category_type === category
                        ).length > 0
                          ? "py-5"
                          : "hidden"
                      }
                    >
                      <Link to={`/shop/dammode/${category}`}>
                        <h2>{category}</h2>
                      </Link>
                      <div className="product-section-container grid grid-cols-2 min-w-[190px] min-h-[240px] gap-[1rem] m-4">
                        {womenProducts
                          .filter(
                            (product) => product.category_type === category
                          )
                          .map((product) => {
                            return (
                              <>
                                <SelectedCategoryCardWithoutParams
                                  clothingImage={[product.product_img]}
                                  productName={product.product_name}
                                  productPrice={product.price}
                                  product_id={product.product_id}
                                  store_type="dammode"
                                  selected_category={category}
                                />
                              </>
                            );
                          })}
                      </div>
                    </section>
                  </>
                );
              })}
            </section>

            <h3
              className={menProducts.length > 0 ? "hidden" : "text-center py-3"}
            >
              Inga herrmode produkter hittades
            </h3>
            <section
              id="herrmode"
              className={menProducts.length > 0 ? "flex flex-col" : "hidden"}
            >
              <h1 className="py-5">HERRMODE</h1>
              {mensUniqueCategories.map((category) => {
                return (
                  <>
                    <section
                      className={
                        menProducts.filter(
                          (product) => product.category_type === category
                        ).length > 0
                          ? "py-5"
                          : "hidden"
                      }
                    >
                      <Link to={`/shop/herrmode/${category}`}>
                        <h2>{category}</h2>
                      </Link>
                      <div className="product-section-container grid grid-cols-2 min-w-[190px] min-h-[240px] gap-[1rem] m-4">
                        {menProducts
                          .filter(
                            (product) => product.category_type === category
                          )
                          .map((product) => {
                            return (
                              <>
                                <SelectedCategoryCardWithoutParams
                                  clothingImage={[product.product_img]}
                                  productName={product.product_name}
                                  productPrice={product.price}
                                  product_id={product.product_id}
                                  store_type="herrmode"
                                  selected_category={category}
                                />
                              </>
                            );
                          })}
                      </div>
                    </section>
                  </>
                );
              })}
            </section>
          </>
        )}
        {store_type === "dammode" && (
          <>
            <h3
              className={
                womenProducts.length > 0 ? "hidden" : "text-center py-3"
              }
            >
              Inga dammode produkter hittades
            </h3>
            <section
              id="dammode"
              className={womenProducts.length > 0 ? "flex flex-col" : "hidden"}
            >
              <h1 className="py-5">DAMMODE</h1>
              {womensUniqueCategories.map((category) => {
                return (
                  <>
                    <section
                      className={
                        womenProducts.filter(
                          (product) => product.category_type === category
                        ).length > 0
                          ? "py-5"
                          : "hidden"
                      }
                    >
                      <Link to={`/shop/dammode/${category}`}>
                        <h2>{category}</h2>
                      </Link>
                      <div className="product-section-container grid grid-cols-2 min-w-[190px] min-h-[240px] gap-[1rem] m-4">
                        {womenProducts
                          .filter(
                            (product) => product.category_type === category
                          )
                          .map((product) => {
                            return (
                              <>
                                <SelectedCategoryCardWithoutParams
                                  clothingImage={[product.product_img]}
                                  productName={product.product_name}
                                  productPrice={product.price}
                                  product_id={product.product_id}
                                  store_type="dammode"
                                  selected_category={category}
                                />
                              </>
                            );
                          })}
                      </div>
                    </section>
                  </>
                );
              })}
            </section>
          </>
        )}
        {store_type === "herrmode" && (
          <>
            <h3
              className={menProducts.length > 0 ? "hidden" : "text-center py-3"}
            >
              Inga herrmode produkter hittades
            </h3>
            <section
              id="herrmode"
              className={menProducts.length > 0 ? "flex flex-col" : "hidden"}
            >
              <h1 className="py-5">HERRMODE</h1>
              {mensUniqueCategories.map((category) => {
                return (
                  <>
                    <section
                      className={
                        menProducts.filter(
                          (product) => product.category_type === category
                        ).length > 0
                          ? "py-5"
                          : "hidden"
                      }
                    >
                      <Link to={`/shop/herrmode/${category}`}>
                        <h2>{category}</h2>
                      </Link>
                      <div className="product-section-container grid grid-cols-2 min-w-[190px] min-h-[240px] gap-[1rem] m-4">
                        {menProducts
                          .filter(
                            (product) => product.category_type === category
                          )
                          .map((product) => {
                            return (
                              <>
                                <SelectedCategoryCardWithoutParams
                                  clothingImage={[product.product_img]}
                                  productName={product.product_name}
                                  productPrice={product.price}
                                  product_id={product.product_id}
                                  store_type="herrmode"
                                  selected_category={category}
                                />
                              </>
                            );
                          })}
                      </div>
                    </section>
                  </>
                );
              })}
            </section>
          </>
        )}
      </section>
    </>
  );
}
