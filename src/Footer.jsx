import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
  <footer className="footer bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">🛍️</span>
              Electronic Store
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Tu tienda de confianza para productos electrónicos y moda. Calidad
              garantizada y los mejores precios del mercado.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gray-200">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  📦 Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/moda"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  👔 Moda
                </Link>
              </li>
              <li>
                <Link
                  to="/carrito"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  🛒 Carrito
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gray-200">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a
                  href="mailto:info@electronicstore.com"
                  className="hover:text-white transition-colors"
                >
                  info@electronicstore.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <span>+54 11 1234-5678</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              &copy; {currentYear} Electronic Store. Todos los derechos reservados.
            </p>
            <p className="flex items-center gap-2">
              Desarrollado con <span className="text-blue-400">React ⚛️</span> y{" "}
              <span className="text-cyan-400">Tailwind CSS 🎨</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
