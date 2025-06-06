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
            className={`min-h-[auto] bg-cover bg-center shadow-md w-full h-auto object-cover`}
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
