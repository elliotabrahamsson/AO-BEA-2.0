/* import DropdownProducts from "./components/DropdownProducts";
import DropdownCare from "./components/DropdownCare"; */

import ShoppingCartRoute from './routes/ShoppingCartRoute';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomeRoute from './routes/HomeRoute';
import Searchbar from './components/Searchbar';
import AboutRoute from './routes/AboutRoute';
import CategoryRoute from './routes/CategoryRoute';
import ProductPageRoute from './routes/ProductPageRoute';
import SelectedCategoryRoute from './routes/SelectedCategoryRoute';
import Breadcrumb from './components/Breadcrumb';
import CheckoutRoute from './routes/CheckoutRoute';
import CreateAccountRoute from './routes/CreateAccountRoute';
import ProfilePageRoute from './routes/ProfilePageRoute';
import OrderConfirmationRoute from './routes/OrderConfirmationRoute';
import LogInRoute from './routes/LogInRoute';
import AdminformRoute from './routes/AdminformRoute';
import {
    createHashRouter,
    Link,
    Outlet,
    RouterProvider
} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import DropdownProducts from './components/DropdownProducts';
import { ShoppingCartProvider } from "./components/ShoppingCartContext";


function App() {
    const router = createHashRouter([
        {
            // Detta (children) är en array av route-objekt, dvs. våra routes (views i Vue).
            children: [
                // Exempel på en route, element är det som ska visas, path är url:en.
                { element: <HomeRoute />, path: '/' },
                { element: <AboutRoute />, path: '/about' },
                { element: <CategoryRoute />, path: '/shop/:store_type' },
                { element: <ShoppingCartRoute />, path: '/shoppingcart' },
                { element: <CheckoutRoute />, path: '/checkout' },
                { element: <CreateAccountRoute />, path: '/create-account' },
                { element: <ProfilePageRoute />, path: '/profile' },
                { element: <LogInRoute />, path: '/login' },
                { element: <AdminformRoute />, path: '/admin' },
                // Detta (children) är en array av route-objekt, dvs. våra routes (views i Vue).
                // Exempel på en route, element är det som ska visas, path är url:en.
                {
                    element: <OrderConfirmationRoute />,
                    path: '/orderconfirmation'
                },
                {
                    element: <SelectedCategoryRoute />,
                    path: '/shop/:store_type/:selected_category'
                },
                {
                    element: <ProductPageRoute />,
                    path: '/shop/:store_type/:selected_category/:id'
                }

                // Detta är enbart en exempel route.
            ],
            // Det som finns i element under denna mening är vad som alltid ska synas på sidan oavsett route, t.ex searchbar, footer, navbar.
            element: (
                <>
                    <ScrollToTop />
                    <Navbar />
                    {/* Här skulle man t.ex kunna lägga Searchbar komponenten */}
                    <header>
                        <Searchbar />
                        <Breadcrumb />
                    </header>
                    <main>
                        {/* Outlet motsvarar RouterView i Vue. Det är alltså här vi kommer visa upp våra olika route-komponenter beroende på url:en. T.ex kommer <HomeRoute /> komponenten synas här. */}
                        <Outlet />
                    </main>
                    {/* Link fungerar som RouterLink i Vue, det är i princip en a-tag */}
                    {/* <Link to="/exempel">Exempel</Link> */}
                    <footer>
                        <Footer />
                    </footer>
                </>
            )
        }
    ]);
    // RouterProvider gör att React Router fungerar, den ser till att alla routes leder till rätt komponenter etc.
    return <RouterProvider router={router} />;
}
export default App;
