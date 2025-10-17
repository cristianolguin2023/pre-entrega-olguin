import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "./context/carritoStore.js";
import "./Moda.css";

const Moda = () => {
  const [productosModa, setProductosModa] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { agregarItem, estaEnCarrito } = useCarrito();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        const productosFiltrados = datos.filter(
          (producto) =>
            producto.category === "women's clothing" ||
            producto.category === "men's clothing" ||
            producto.category === "jewelery"
        );
        setProductosModa(productosFiltrados);
      })
      .catch(() => {
        setError("Error al cargar los productos de moda");
      })
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return (
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            👗 Sección de Moda
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <article
                key={i}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow flex flex-col animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="flex justify-end">
                    <div className="h-9 bg-gray-200 rounded w-24" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">{error}</div>
    );
  }

  return (
  <section className="moda py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            👗 Sección de Moda
          </h2>
          <p className="text-gray-600 text-lg">
            Descubre las últimas tendencias en ropa y accesorios
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productosModa.map((producto) => {
            const nombre = producto.title || "Producto";
            const precio = Number(producto.price ?? 0).toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              maximumFractionDigits: 2,
            });
            const categoria = producto.category;
            const imgSrc = producto.image || `https://placehold.co/600x400?text=${encodeURIComponent(nombre)}`;

            return (
              <article
                key={producto.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col"
              >
                <img
                  className="w-full h-48 object-contain bg-gray-50"
                  src={imgSrc}
                  alt={nombre}
                  loading="lazy"
                  onError={(e) => {
                    const fallback = `https://placehold.co/600x400?text=${encodeURIComponent(nombre)}`;
                    if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                  }}
                />
                <div className="px-4 pt-3 pb-4">
                  {categoria && (
                    <span
                      className={`inline-flex items-center rounded-full text-white text-xs font-medium px-2 py-1 mb-2 ${
                        categoria === "women's clothing"
                          ? "bg-pink-500"
                          : categoria === "men's clothing"
                          ? "bg-blue-500"
                          : "bg-purple-500"
                      }`}
                    >
                      {categoria === "women's clothing"
                        ? "👩 Mujer"
                        : categoria === "men's clothing"
                        ? "👨 Hombre"
                        : "💎 Joyería"}
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="m-0 text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                      {nombre}
                    </h3>
                    <p className="m-0 font-bold text-blue-600 whitespace-nowrap">{precio}</p>
                  </div>
                </div>
                <div className="px-4 pb-4 flex justify-between gap-2">
                  <button
                    type="button"
                    className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm active:translate-y-px border ${
                      estaEnCarrito(producto.id)
                        ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-pink-600 border-pink-600 text-white hover:bg-pink-700"
                    }`}
                    disabled={estaEnCarrito(producto.id)}
                    onClick={() => agregarItem(producto)}
                  >
                    {estaEnCarrito(producto.id) ? "Agregado" : "Agregar"}
                  </button>
                  <Link
                    className="inline-flex items-center rounded-md bg-blue-600 text-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-blue-700 active:translate-y-px"
                    to={`/producto/${producto.id}`}
                  >
                    Detalle
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {productosModa.length === 0 && (
          <div className="text-center p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <h3 className="text-gray-500 mb-2 text-xl">
              😔 No hay productos de moda disponibles
            </h3>
            <p className="text-gray-500">Intenta nuevamente más tarde</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Moda;
