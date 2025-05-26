import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';

export default function CategoryRoute() {
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

    const { store_type } = useParams();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then((response) => response.json())
            .then((data: Product[]) => {
                // Här kommer alla kategorier hamna. De kommer vara unika och komma från shoptypen som skickas med via params, dvs. herrmode eller dammode.
                let uniqueCategoryData: Product[] = [];
                // Filtrerar databasens data utifrån vilken shoptyp det är, dvs. herrmode eller dammode. Denna array innehåller alla produkter från en viss shoptyp, t.ex alla herrmode produkter.
                const filteredData = data.filter((product) => {
                    if (store_type === 'herrmode') {
                        return product.gender === 'Man';
                    } else {
                        return product.gender === 'Women';
                    }
                });
                // Denna forEach kollar om en produkt-kategori finns i uniqueCategoryData, om den inte gör det kommer den läggas till i arrayen via en push. Detta gör att uniqueCategoryData kommer vara en array av objekt som alla har en unik kategori.
                filteredData.forEach((product) => {
                    if (
                        !uniqueCategoryData.find(
                            (existingProduct) =>
                                existingProduct.category_type ===
                                product.category_type
                        )
                    ) {
                        uniqueCategoryData.push(product);
                        return;
                    } else {
                        if (
                            !uniqueCategoryData.find(
                                (existingProduct) =>
                                    existingProduct.category_type ===
                                    product.category_type
                            )
                        ) {
                            uniqueCategoryData.push(product);
                            return;
                        }
                    }
                    return uniqueCategoryData;
                });
                setProducts(uniqueCategoryData);
                console.log(filteredData);
            });
    }, []);

    return (
        <>
            <section className="bg-[var(--bright1)] p-[1em]">
                {store_type === 'dammode' ? (
                    <h1 className="text-center">Dammode</h1>
                ) : (
                    <h1 className="text-center">Herrmode</h1>
                )}

                {/* Produkterna här är hårdkodade. */}
                {/* NOTERA att jag länkade till produkterna via deras id, om vi vill använda en annan nyckel än id behöver detta ändras. */}
                <section id="new_arrivals">
                    <div
                        id="upper-new-arrivals-container"
                        className="grid grid-cols-2 mt-10 gap-[1rem] justify-center"
                    >
                        {store_type === 'dammode' ? (
                            <>
                                <Link
                                    to="/shop/dammode/Outerware/16"
                                    className="mx-auto shadow-md"
                                >
                                    <img
                                        src="https://public.assets.hmgroup.com/assets/006/82/c4/82c477c8e32273fa02d2fac24f257cf61066578e_lg-1.jpg"
                                        alt="Dubbelknäppt kavaj i bomull"
                                    ></img>
                                </Link>
                                <Link
                                    to="/shop/dammode/Pants/18"
                                    className="mx-auto shadow-md"
                                >
                                    <img
                                        src="https://public.assets.hmgroup.com/assets/006/b4/16/b416338c0a0cd3b1c0ea09749fff402818193ced_lg-1.jpg"
                                        alt="SNOW raka jeans"
                                    ></img>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/shop/herrmode/Skjorta/2"
                                    className="mx-auto shadow-md"
                                >
                                    <img
                                        src="https://public.assets.hmgroup.com/assets/006/29/37/29378d0c252a52a4b11b23c92e9b74393ac245b1_lg-1.jpg"
                                        alt="Manchesterskjorta"
                                    ></img>
                                </Link>
                                <Link
                                    to="/shop/herrmode/Skjorta/4"
                                    className="mx-auto shadow-md"
                                >
                                    <img
                                        src="https://public.assets.hmgroup.com/assets/006/4f/2e/4f2e3e6e0f9f58e674c24f244569291ad2fac638_lg-1.jpg"
                                        alt="Overshirt i canvas"
                                    ></img>
                                </Link>
                            </>
                        )}
                    </div>

                    <h2 className="text-center my-4">NEW ARRIVALS</h2>

                    <div
                        id="lower-new-arrivals-container"
                        className="grid grid-cols-2 mb-10 gap-[1rem] justify-center"
                    >
                        {store_type === 'dammode' ? (
                            <>
                                <Link
                                    to="/shop/dammode/Tröja/17"
                                    className="mx-auto shadow-md"
                                >
                                    <img
                                        src="https://public.assets.hmgroup.com/assets/006/bd/a8/bda89898702cf7007e3fa898ce324cf8c54fbb88_lg-1.jpg"
                                        alt="LILY T-shirt i lätt bomullstrikå"
                                    ></img>
                                </Link>
                                <Link
                                    to="/shop/dammode/Tröja/19"
                                    className="mx-auto shadow-md"
                                >
                                    <img
                                        src="https://public.assets.hmgroup.com/assets/006/b7/fe/b7fee7dff4db821b4749d60437dd10d3086c0130_lg-1.jpg"
                                        alt="Tröja i alpacka och ull"
                                    ></img>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/shop/herrmode/Skjorta/1"
                                    className="mx-auto shadow-md"
                                >
                                    <img
                                        src="https://public.assets.hmgroup.com/assets/006/32/27/322715c179eb482ac12d859844e98642c48c17bd_lg-1.jpg"
                                        alt="Overshirt i bomull"
                                    ></img>
                                </Link>
                                <Link
                                    to="/shop/herrmode/Skjorta/3"
                                    className="mx-auto shadow-md"
                                >
                                    <img
                                        src="https://public.assets.hmgroup.com/assets/006/9d/54/9d54e68c932f1c67c63cfaa31587b455a8216841_lg-1.jpg"
                                        alt="Poplinskjorta med avslappnad passform"
                                    ></img>
                                </Link>
                            </>
                        )}
                    </div>
                </section>

                <section id="categories_section" className="mb-20">
                    <h2 className="text-center mt-20 mb-14">KATEGORIER</h2>

                    <div className="grid grid-cols-2 justify-items-center gap-[1rem]">
                        {products.map((product) => (
                            <CategoryCard
                                category={product.category_type}
                                clothingImage={product.product_img}
                                
                            />
                        ))}
                    </div>
                </section>
            </section>
        </>
    );
}
