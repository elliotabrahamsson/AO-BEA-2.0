// Denna komponent är enbart en nödlösning för att lösa SearchedResultRoutes problem, jag och Brain kan fixa så att vi enbart behöver SelectedCategoryCard om vi har tid.
import { Link } from "react-router-dom";

type Props = {
  clothingImage: string[];
  productName: string;
  productPrice: number;
  product_id: number;
  store_type: string;
  selected_category: string;
};

function SelectedCategoryCard({
  clothingImage,
  productName,
  productPrice,
  product_id,
  store_type,
  selected_category,
}: Props) {
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
