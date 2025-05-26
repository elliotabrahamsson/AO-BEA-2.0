// En komponent som återställer scrollpositionen till toppen av sidan när URL:en ändras
// Importerad i App.tsx så den alltid är aktiv vid ändring av URL:en
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  // När URL:en ändras, scrolla till toppen av sidan
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;
