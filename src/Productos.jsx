import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "./context/carritoStore.js";

const Productos = () => {
  const [producto, setProducto] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { agregarItem, estaEnCarrito } = useCarrito();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProducto(datos);
      })
      .catch(() => {
        setError("Error al cargar tus productos");
      })
      .finally(() => setCargando(false));
  }, []);

  if (cargando)
    return (
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Productos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

  if (error) return <p className="text-red-600 p-4">{error}</p>;

  if (!producto || producto.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        No hay productos disponibles.
      </div>
    );
  }

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Productos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {producto.map((p) => {
            const nombre = p.nombre || p.title || "Producto";
            const precioNum = Number(p.precio ?? p.price ?? 0);
            const precio = precioNum.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              maximumFractionDigits: 2,
            });
            const categoria = p.category || p.categoria;
            const rating = p.rating?.rate ?? p.rate ?? null;
            const imgSrc =
              p.image ||
              p.imagen ||
              p.imagenUrl ||
              p.imageUrl ||
              p.avatar ||
              p.url ||
              `https://placehold.co/600x400?text=${encodeURIComponent(nombre)}`;
            return (
              <article
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col"
                key={p.id}
              >
                <img
                  className="w-full h-48 object-contain bg-gray-50"
                  src={imgSrc}
                  alt={nombre}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = `https://placehold.co/600x400?text=${encodeURIComponent(
                      nombre
                    )}`;
                    if (target.src !== fallback) target.src = fallback;
                  }}
                />
                <div className="px-4 pt-3 pb-4">
                  {categoria && (
                    <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 mb-2">
                      {categoria}
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="m-0 text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                      {nombre}
                    </h3>
                    <p className="m-0 font-bold text-blue-600 whitespace-nowrap">
                      {precio}
                    </p>
                  </div>
                  {rating != null && (
                    <div className="mt-2 flex items-center gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill={
                            i < Math.round(rating) ? "currentColor" : "none"
                          }
                          stroke="currentColor"
                          className={`h-4 w-4 ${
                            i < Math.round(rating)
                              ? "text-amber-500"
                              : "text-gray-300"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.95 13.92a1 1 0 00-1.175 0l-2.335 1.69c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.806 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"
                          />
                        </svg>
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        {Number(rating).toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="px-4 pb-4 flex justify-between gap-2">
                  <button
                    type="button"
                    className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm active:translate-y-px border ${
                      estaEnCarrito(p.id)
                        ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-600 border-green-600 text-white hover:bg-green-700"
                    }`}
                    disabled={estaEnCarrito(p.id)}
                    onClick={() => {
                      agregarItem(p);
                    }}
                  >
                    {estaEnCarrito(p.id) ? "Agregado" : "Agregar"}
                  </button>
                  <Link
                    className="inline-flex items-center rounded-md bg-blue-600 text-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-blue-700 active:translate-y-px"
                    to={`/producto/${p.id}`}
                  >
                    Detalle
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Productos;
