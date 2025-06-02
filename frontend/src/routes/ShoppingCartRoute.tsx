import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../components/ShoppingCartContext";

function ShoppingCartRoute() {
  const { cartItems, addItemToCart, removeItemFromCart, clearShoppingCart } =
    useContext(ShoppingCartContext);
  console.log(cartItems);

  /* Leveranskostnad */
  const deliveryCost = 79;

  /* Beräkning för orderkostnad */
  const orderCost = cartItems.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  /* Totalkostnad = leverans + orderkostnad */
  const totalCost = deliveryCost + orderCost;

  return (
    <div className="main-container">
      <h1 className="ml-4 mt-2 mb-8">Varukorg</h1>
      {cartItems.length === 0 && (
        <p className="ml-4 !font-bold">Din varukorg är tom.</p>
      )}
      {cartItems.map((item) => (
        <section className="product grid grid-cols-2 gap-4 mb-2" key={item.id}>
          <img
            src={item.image}
            alt={item.id.toString()}
            className="w-[165px] h-[214px] ml-[1rem]"
          />
          <div className="productDescription flex flex-col">
            <p className="product_name text-balance mb-2 text-[20px] !font-bold">
              {item.name}
            </p>
            <p className="text-[18px] mb-2">{item.price} kr</p>
            <p className="font-bold text-[18px] mb-2">Storlek: {item.size}</p>
            <p className="text[18px] text-wrap">Färg: {item.color}</p>

            {/* Innehåll för knapparna */}
            <div className="button-container flex justify-start items-center">
              <div className="subtractQuantity p-3">
                {/* Ta bort/minska antal av produkt */}
                <button
                  className="text-base p-3"
                  onClick={() =>
                    removeItemFromCart(
                      item.id,
                      item.name,
                      item.color,
                      item.size,
                      item.price,
                      item.image
                    )
                  }
                >
                  <p className="subtract-icon text-3xl">-</p>
                </button>
              </div>
              <div className="quantityOfProduct">{item.quantity}</div>
              <div className="addQuantity p-3">
                {/* Lägg till antal av produkt */}
                <button
                  className="text-base p-3"
                  onClick={() =>
                    addItemToCart(
                      item.id,
                      item.name,
                      item.color,
                      item.size,
                      item.price,
                      item.image
                    )
                  }
                >
                  <p className=" add-icon text-3xl">+</p>
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="mt-6">
        <button className="text-[18px] mb-5 ml-4" onClick={clearShoppingCart}>
          <p>Töm varukorg</p>
        </button>
        {cartItems.length > 0 && (
          <div className="orderCost flex justify-between ml-4 mr-4">
            <p className="text-[18px]">Ordersumma:</p>
            <p className="text-[18px]">{orderCost} kr</p>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="deliverySummary flex justify-between ml-4 mr-4">
            <p className="text-[18px]">Leverans:</p>
            <p className="text-[18px]">{deliveryCost} kr</p>
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="flex justify-between ml-4 mr-4 mt-8 border-t-2 border-b-2 pt-4 pb-4 text-2xl">
            <p className="!font-bold">Totalsumma:</p>
            <p className="!font-bold">{totalCost} kr</p>
          </div>
        )}
      </section>
      <Link to={"/checkout"}>
        <div className="bg-[var(--dark3)] p-8 relative min-w-[190px] m-[1em] mt-8 mb-10 h-[44px] flex justify-center items-center rounded-[4px]">
          <h3 className="text-white whitespace-nowrap text-[10px]">
            Fortsätt till kassan
          </h3>
        </div>
      </Link>
    </div>
  );
}

export default ShoppingCartRoute;
