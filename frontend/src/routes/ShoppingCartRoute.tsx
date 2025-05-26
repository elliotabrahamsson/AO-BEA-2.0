/* ShoppingCartView i Vue - Hårdkodad. Behöver bli dynamisk */
function ShoppingCartRoute() {
  return (
    <div>
      <h1 className="ml-4 mt-10 mb-10">Varukorg</h1>
      <section className="product">
        {/* Bild på varan i kundkorg */}
        <img src="" alt="" className="w-[115px] h-[164px] ml-[1rem]" />

        <div className="productDescription">
          <h2>{/* Produkttitel */}</h2>
          <p>{/* Pris */}</p>
          <p>{/* Storlek */}</p>
        </div>

        <div className="quantityOfProduct">{/* Antal av produkt */}</div>

        <div className="deleteProduct">
          {/* Ta bort/minska antal av produkt */}
          <button className="text-base ml-[1rem]">Ta bort</button>
        </div>
      </section>

      <section className="mt-6">
        <div className="orderCost flex justify-between ml-4 mr-4">
          <p>Ordersumma:</p>
          <p>{/* Pris på order */}</p>
        </div>
        <div className="deliverySummary flex justify-between ml-4 mr-4">
          <p>Leverans:</p>
          <p>{/* Leveranskostnad */}</p>
        </div>
        <div className="flex justify-between ml-4 mr-4 mt-8 border-t-2 border-b-2 pt-4 pb-4 text-2xl">
          <p>Totalsumma:</p>
          <p>{/* Totalsumma */}</p>
        </div>
      </section>

      <div className="bg-[var(--dark3)] p-4 relative min-w-[190px] m-[1em] mt-20 mb-10 h-[44px] flex justify-center items-center rounded-[4px]">
        <h3 className="text-white whitespace-nowrap text-[10px]">
          Forsätt till kassan
        </h3>
      </div>
    </div>
  );
}

export default ShoppingCartRoute;
