import { useState } from 'react';

function AdminformRoute() {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [img, setImg] = useState(''); //Vill vi ha en url som ska kunna läggas in som bild eller en fil?? vid url behövs endast ('')

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessage('Produkten är nu tilllagd');
    }

    //Här ska det kopplas till backend.

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-xl mb-4">Lägg till produkt</h2>

            <label className="block mb-2">
                Produktnamn:
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    className="border p-2 w-full rounded"
                />
            </label>

            <label className=" mb-2">
                Pris:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="border p-2 w-full rounded"
                />
            </label>

            <label className=" mb-4">
                Beskrivning:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </label>

            <button
                type="submit"
                className="bg-[var(--dark3)]  text-white p-4 relative min-w-[190px] m-[1em] h-[44px] flex justify-center items-center"
            >
                Spara produkt
            </button>

            {message && <p className="mt-4">{message}</p>}
        </form>
    );
}
export default AdminformRoute;
