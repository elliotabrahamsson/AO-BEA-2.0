import { createContext, useEffect, useState, type ReactNode } from "react";

/* Definierar ShoppingCartProvider - Tar emot react element som ligger innanför providern. Tar emot children som props */
type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  name: string;
  quantity: number;
  color: string;
  size: string;
  price: number;
  image: string;
};

/* Definierar vad innehållet av Contexten ska vara. I detta fall respektive funktion och type cartItem */
type ShoppingCartContext = {
  addItemToCart: (
    id: number,
    name: string,
    color: string,
    size: string,
    price: number,
    image: string
  ) => void;

  removeItemFromCart: (
    id: number,
    name: string,
    color: string,
    size: string,
    price: number,
    image: string
  ) => void;

  quantityOfItemInCart: (
    id: number,
    name: string,
    color: string,
    size: string,
    price: number,
    image: string
  ) => number;

  clearShoppingCart: () => void;

  cartItems: CartItem[];
};

/* Skapar context-objektet. Får bort errors/varningar med hjälp av det tomma objektet.*/
export const ShoppingCartContext = createContext({} as ShoppingCartContext);

/* Ger all data, sköter renderingen */
/* En provider behöver ha objekt och barnelement inuti sig själv */
/* Adderat localStorage: */
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = window.localStorage.getItem("shopping-cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  /* Denna useEffect håller ett öga på cartItems förändringar och sparar enligt ändringarna */
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /* Funktion för att återställa varukorgen, bra att ha i och med att localStorage är implementerat. */
  function clearShoppingCart() {
    setCartItems([]);
  }

  /*Lägg till produkt  */
  function addItemToCart(
    id: number,
    name: string,
    color: string,
    size: string,
    price: number,
    image: string
  ) {
    console.log("addItemToCart körs!");
    setCartItems((currentItems: CartItem[]) => {
      const existingItem = currentItems.find(
        (item: CartItem) =>
          item.id === id &&
          item.name === name &&
          item.color === color &&
          item.size === size &&
          item.price === price &&
          item.image === image
      );
      if (!existingItem) {
        return [
          ...currentItems,
          { id, name, quantity: 1, color, size, image, price },
        ];
      } else {
        return currentItems.map((item: CartItem) => {
          if (
            item.id === id &&
            item.name === name &&
            item.color === color &&
            item.size === size &&
            item.price === price &&
            item.image === image
          ) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  /* Tar bort produkt */
  function removeItemFromCart(
    id: number,
    name: string,
    color: string,
    size: string,
    price: number,
    image: string
  ) {
    setCartItems((currentItems: CartItem[]) => {
      const item = currentItems.find(
        (item: CartItem) =>
          item.id === id &&
          item.name === name &&
          item.color === color &&
          item.size === size &&
          item.price === price &&
          item.image === image
      );

      if (item?.quantity === 1) {
        return currentItems.filter(
          (item: CartItem) =>
            !(
              item.id === id &&
              item.name === name &&
              item.color === color &&
              item.size === size &&
              item.price === price &&
              item.image === image
            )
        );
      } else {
        return currentItems.map((item: CartItem) => {
          if (
            item.id === id &&
            item.name === name &&
            item.color === color &&
            item.size === size &&
            item.price === price &&
            item.image === image
          ) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  /* Renderar antalet av respektive produkt */
  function quantityOfItemInCart(
    id: number,
    name: string,
    color: string,
    size: string,
    price: number,
    image: string
  ) {
    const item = cartItems.find(
      (item) =>
        item.id === id &&
        item.name === name &&
        item.color === color &&
        item.size === size &&
        item.price === price &&
        item.image === image
    );
    return item ? item.quantity : 0;
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        addItemToCart,
        removeItemFromCart,
        quantityOfItemInCart,
        cartItems,
        clearShoppingCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
