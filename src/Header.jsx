import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useCarrito } from "./context/carritoStore.js";
import { useAuth } from "./context/useAuth";

const Header = () => {
  const { totalItems } = useCarrito();
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">
          <Link to="/" className="header__title-link">
            🛍️ Electronic Store
          </Link>
        </h1>
        <nav className="header__nav">
          <Link to="/" className="header__nav-link">
            🏠 Productos
          </Link>
          <Link to="/moda" className="header__nav-link">
            👔 Moda
          </Link>
          <Link to="/carrito" className="header__cart-btn">
            🛒 Carrito
            {totalItems > 0 && (
              <span className="header__cart-badge">{totalItems}</span>
            )}
          </Link>
          <button onClick={handleAuth} className="header__nav-link">
            {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
