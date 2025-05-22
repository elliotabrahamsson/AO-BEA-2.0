import DropdownProducts from "./components/DropdownProducts";
import DropdownCare from "./components/DropdownCare";
import ShoppingCartRoute from "./routes/ShoppingCartRoute";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomeRoute from "./routes/HomeRoute";
import Searchbar from "./components/Searchbar";
import AboutRoute from "./routes/AboutRoute";
import CategoryRoute from "./routes/CategoryRoute";
import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import ProductPageRoute from "./routes/ProductPageRoute";

function App() {
  const router = createHashRouter([
    {
      // Detta (children) är en array av route-objekt, dvs. våra routes (views i Vue).
      children: [
        // Exempel på en route, element är det som ska visas, path är url:en.
        { element: <HomeRoute />, path: "/" },
        { element: <AboutRoute />, path: "/about" },
        { element: <CategoryRoute />, path: "/shop/:store_type" },
        { element: <ShoppingCartRoute />, path: "/shoppingcart" },
        {
          element: <ProductPageRoute />,
          path: "/shop/:store_type/:category/:id",
        },

        // Detta är enbart en exempel route.
      ],
      // Det som finns i element under denna mening är vad som alltid ska synas på sidan oavsett route, t.ex searchbar, footer, navbar.
      element: (
        <>
          <Navbar />
          {/* Här skulle man t.ex kunna lägga Searchbar komponenten */}
          <header>
            <Searchbar />
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
      ),
    },
  ]);
  // RouterProvider gör att React Router fungerar, den ser till att alla routes leder till rätt komponenter etc.
  return <RouterProvider router={router} />;
}

export default App;
