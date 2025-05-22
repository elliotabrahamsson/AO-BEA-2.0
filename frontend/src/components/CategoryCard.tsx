import { Link } from "react-router-dom";

type Props = {
  category: string;
  clothingImage: string;
  shopType: string;
};

export default function CategoryCard({
  category,
  clothingImage,
  shopType,
}: Props) {
  return (
    <Link to={"/shop/" + shopType + "/" + category}>
      <section
        id="card"
        className={`flex justify-center items-center min-w-[190px] min-h-[240px] bg-cover bg-center mx-auto shadow-md`}
        // Eftersom att tailwind sätter all css under build time (inte run time) kan vi inte använda ex. bg-[url(${clothingImage})] eftersom att Tailwind inte kan läsa JavaScript variabler. Därför satte jag bakgrunden i style-attributet.
        style={{ backgroundImage: `url(${clothingImage})` }}
      >
        <h3
          className={
            "bg-[var(--dark3)] text-[var(--bright1)] p-[0.4em] text-[80%]"
          }
          style={{ fontSize: "1.2em" }}
        >
          {category}
        </h3>
      </section>
    </Link>
  );
}
