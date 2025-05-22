import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

type Props = {
  clothingImage: string[];
  productName: string;
  productPrice: number;
  product_id: number;
};

function SelectedCategoryCard({
  clothingImage,
  productName,
  productPrice,
  product_id,
}: Props) {
  const { store_type, selected_category } = useParams();
  return (
    <div className="container">
      {clothingImage.map((img, index) => (
        <Link
          to={
            "/shop/" + store_type + "/" + selected_category + "/" + product_id
          }
        >
          <img
            src={img}
            key={index}
            id="card"
            className={`min-h-[auto] bg-cover bg-center shadow-md `}
            style={{ backgroundImage: `url(${img})` }}
          ></img>
        </Link>
      ))}
      <div className="text-container mt-3">
        <p id="product-name-bold" className="text-[1.1rem]">
          {productName}
        </p>
        <p>{productPrice} kr</p>
      </div>
    </div>
  );
}

export default SelectedCategoryCard;

{
  /* <div className="text-container">
          <h3
          className={
            "bg-[var(--dark3)] text-[var(--bright1)] p-[0.4em] text-[80%]"
          }
          style={{ fontSize: "1.2em" }}
        >
          {productName}
        </h3>
        <p className="text-2xl">{productPrice} kr</p>
        </div> */
}

/*  <div className='main-container flex flex-wrap justify-around items-center'>
      <section id="card"
        className={`w-[100%] min-h-[400px] m-[1em] bg-cover bg-center`}  style={{ backgroundImage: `url(${clothingImage})` }}>
      </section>
    </div> */
