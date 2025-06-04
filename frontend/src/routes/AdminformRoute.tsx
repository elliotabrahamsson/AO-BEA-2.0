import { useState, useEffect } from "react";

interface Product {
  productName: string;
  price: number;
  description: string;
  category_type: string;
  brand: string;
  img: string;
  stock: number;
  gender: string;
  colors: string;
  size: number;
}

function AdminformRoute() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [gender, setGender] = useState<string>("Man");
  const [colors, setColor] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);

  const makeUniqueCategoryArr = (products: Product[], gender: string) => {
    let uniqueCategoryArr: string[] = [];

    if (gender === "Man") {
      products
        .filter((product: Product) => {
          return product.gender === "Man";
        })
        .forEach((product: Product) => {
          if (
            !uniqueCategoryArr.find(
              (category) => category === product.category_type
            )
          ) {
            uniqueCategoryArr.push(product.category_type);
          }
        });
    } else {
      products
        .filter((product: Product) => {
          return product.gender === "Woman";
        })
        .forEach((product: Product) => {
          if (
            !uniqueCategoryArr.find(
              (category) => category === product.category_type
            )
          ) {
            uniqueCategoryArr.push(product.category_type);
          }
        });
    }
    return uniqueCategoryArr;
  };

  useEffect(() => {
    fetch("https://ao-bea-2-0.onrender.com/products")
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts(data);
        setCategory(makeUniqueCategoryArr(data, gender)[0]);
      });
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch("https://ao-bea-2-0.onrender.com/createProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName: productName,
        price: price,
        description: description,
        category: category,
        brand: brand,
        product_img: img,
        stock: stock,
        gender: gender,
        colors: colors,
        size: size,
      }),
    });

    setMessage("Produkten är nu tillagd");
    // console.log(
    //   "Produkt - kategori: ",
    //   category,
    //   " brand: ",
    //   brand,
    //   " produktnamn: ",
    //   productName,
    //   " pris: ",
    //   price,
    //   "beskrivning: ",
    //   description,
    //   " img: ",
    //   img,
    //   " stock: ",
    //   stock,
    //   " gender: ",
    //   gender,
    //   " colors: ",
    //   colors,
    //   " size: ",
    //   size
    // );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Lägg till produkt</h2>

      <label className="block mb-3 ">
        Produktnamn:
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          className="border p-3 w-full rounded"
        />
      </label>

      <label className="block mb-3">
        Pris:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border p-3 w-full rounded"
        />
      </label>

      <label className="block mb-3">
        Beskrivning:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-3 w-full rounded"
        />
      </label>

      <label className="block mb-3">
        Bild URL:
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          required
          className="border p-3 w-full rounded"
        />
      </label>

      <label className="block mb-3">
        Lagerstatus (antal):
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          className="border p-3 w-full rounded"
        />
      </label>

      {/* Kön */}
      <section className="block mb-3">
        <h5>Kön:</h5>
        <label className="flex items-center mb-3">
          <input
            type="radio"
            value="Man"
            name="gender"
            onChange={(e) => {
              setGender(e.target.value);
              setCategory(makeUniqueCategoryArr(products, "Man")[0]);
            }}
            required
            defaultChecked
            className="h-[20px] w-[20px] mr-2"
          />
          Man
        </label>
        <label className="flex items-center mb-3">
          <input
            type="radio"
            value="Woman"
            name="gender"
            onChange={(e) => {
              setGender(e.target.value);
              setCategory(makeUniqueCategoryArr(products, "Woman")[0]);
            }}
            required
            className="h-[20px] w-[20px] mr-2"
          />
          Kvinna
        </label>
      </section>

      {/* Kategori */}
      <label className="block mb-3">
        Kategori:
        <select
          className="border p-3 w-full rounded"
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {makeUniqueCategoryArr(products, gender).map((category, index) => {
            return (
              <>
                <option
                  value={category}
                  key={category}
                  className="text-[0.8em]"
                >
                  {category}
                </option>
              </>
            );
          })}
        </select>
      </label>

      <label className="block mb-3">
        Märke:
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
          className="border p-3 w-full rounded"
        />
      </label>

      {/* Färger */}
      <label className="block mb-3">
        Färger, ha ett kommatecken mellan varje värde:
        <input
          type="text"
          value={colors}
          onChange={(e) => {
            setColor(e.target.value.trim().split(","));
          }}
          required
          className="border p-3 w-full rounded"
        />
      </label>

      {/* Storlek */}
      <label className="block mb-3">
        Storlek, ha ett kommatecken mellan varje värde:
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value.trim().split(","))}
          required
          className="border p-3 w-full rounded"
        />
      </label>

      <button
        type="submit"
        className=" bg-[var(--dark3)] text-white p-4  mt-3 min-w-[220px] h-14 flex justify-center items-center rounded "
      >
        Spara produkt
      </button>

      {message && <p className="mt-4">{message}</p>}
    </form>
  );
}

export default AdminformRoute;
