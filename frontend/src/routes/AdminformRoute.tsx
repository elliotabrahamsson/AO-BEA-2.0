import { useState } from 'react';

interface Product {
    productName: string;
    price: number;
    description: string;
    category: string;
    brand: string;
    img: string;
    stock: number;
    gender: string;
    colors: string;
    size: number;
}

function AdminformRoute() {
    const [category, setCategory] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [stock, setStock] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [colors, setColor] = useState<string>('');
    const [size, setSize] = useState<string>('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const product: Product = {
            productName,
            price: parseFloat(price),
            description,
            category,
            brand,
            img,
            stock: parseInt(stock),
            gender,
            colors,
            size: parseInt(size)
        };

        console.log('Submitted product:', product);
        setMessage('Produkten är nu tillagd');
    }
    //Här kopplar vi det till backend

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

            <label className="block mb-3">
                Kategori:
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="border p-3 w-full rounded"
                />
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

            <label className="block mb-3">
                Kön:
                <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="border p-3 w-full rounded"
                />
            </label>

            <label className="block mb-3">
                Färger:
                <input
                    type="text"
                    value={colors}
                    onChange={(e) => setColor(e.target.value)}
                    required
                    className="border p-3 w-full rounded"
                />
            </label>

            <label className="block mb-3">
                Storlek:
                <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
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
