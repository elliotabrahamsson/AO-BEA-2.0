import { Link, useParams } from 'react-router-dom';
import { type JSX } from 'react';

function Breadcrumb(): JSX.Element {
    const { store_type, selected_category, productName } = useParams();

    // Kontrollera om vi är på Checkout eller Order Confirmation
    const isCheckoutOrConfirmation =
        location.pathname === '/checkout' ||
        location.pathname === '/orderconfirmation';

    return (
        <div className="mt-5 ml-3">
            <nav className="flex items-center" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    {/* Hem-länk */}
                    <li className="inline-flex items-center">
                        <Link
                            to="/"
                            className="inline-flex items-center text-black"
                        >
                            <svg
                                className="w-3 h-3 me-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            <p>Home</p>
                        </Link>
                    </li>

                    {/* Dynamiskt breadcrumb för store_type */}
                    {store_type && (
                        <>
                            <li className="inline-flex items-center">
                                <div className="flex items-center">
                                    <svg
                                        className="w-[26px] h-[26px] text-gray-800"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 12H5m14 0-4 4m4-4-4-4"
                                        />
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <Link
                                    to={`/shop/${store_type}`}
                                    className="inline-flex items-center text-black"
                                >
                                    {store_type === 'dammode'
                                        ? 'Dammode'
                                        : store_type === 'herrmode'
                                        ? 'Herrmode'
                                        : store_type}
                                </Link>
                            </li>
                        </>
                    )}

                    {/* Dynamiskt breadcrumb för kategori */}
                    {selected_category && (
                        <>
                            <li className="inline-flex items-center">
                                <div className="flex items-center">
                                    <svg
                                        className="w-[26px] h-[26px] text-gray-800"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 12H5m14 0-4 4m4-4-4-4"
                                        />
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <span className="inline-flex items-center ml-1 text-black">
                                    <p>{selected_category}</p>
                                </span>
                            </li>
                        </>
                    )}

                    {/* Dynamiskt breadcrumb för produkt om den finns */}
                    {productName && (
                        <>
                            <li className="inline-flex items-center">
                                <div className="flex items-center">
                                    <svg
                                        className="w-[26px] h-[26px] text-gray-800"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 12H5m14 0-4 4m4-4-4-4"
                                        />
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <span className="inline-flex items-center ml-1 text-black">
                                    <p>{id}</p>
                                </span>
                            </li>
                        </>
                    )}

                    {/* Checkout och Order Confirmation breadcrumbs */}
                    {isCheckoutOrConfirmation && (
                        <li>
                            <Link
                                to="/"
                                className="inline-flex items-center text-black"
                            >
                                <svg
                                    className="w-[26px] h-[26px] text-gray-800"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 12h14M5 12l4-4m-4 4 4 4"
                                    />
                                </svg>
                                <span className="inline-flex items-center ml-1">
                                    Fortsätt shoppa
                                </span>
                            </Link>
                        </li>
                    )}
                </ol>
            </nav>
        </div>
    );
}

export default Breadcrumb;
