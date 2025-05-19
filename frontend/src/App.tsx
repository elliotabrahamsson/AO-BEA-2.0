
import Home from './components/Home';
import Navbar from './components/Navbar';
import DropdownProducts from './components/DropdownProducts';
import DropdownCare from './components/DropdownCare';
import HomeRoute from "./routes/HomeRoute";
import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";


function App() {
  const router = createHashRouter([
    {
      // Detta (children) är en array av route-objekt, dvs. våra routes (views i Vue).
      children: [
        // Exempel på en route, element är det som ska visas, path är url:en.
        { element: <HomeRoute />, path: "/" },
        { element: <HomeRoute />, path: "/exempel" }, // Detta är enbart en exempel route.
      ],
      // Det som finns i element under denna mening är vad som alltid ska synas på sidan oavsett route, t.ex searchbar, footer, navbar.
      element: (
        <>
            <Home />
            <DropdownProducts/>
            <DropdownCare/>
            <Navbar/>
          {/* Här skulle man t.ex kunna lägga Searchbar komponenten */}
          <main>
            {/* Outlet motsvarar RouterView i Vue. Det är alltså här vi kommer visa upp våra olika route-komponenter beroende på url:en. T.ex kommer <HomeRoute /> komponenten synas här. */}
            <Outlet />
          </main>
          {/* Link fungerar som RouterLink i Vue, det är i princip en a-tag */}
          <Link to="/exempel">Exempel</Link>
        </>
      ),
    },
  ]);
  // RouterProvider gör att React Router fungerar, den ser till att alla routes leder till rätt komponenter etc.
  return <RouterProvider router={router} />;
}

export default App;
