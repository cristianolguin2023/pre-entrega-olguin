import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCarrito } from "./context/carritoStore.js";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { agregarItem, estaEnCarrito } = useCarrito();

  useEffect(() => {
    setCargando(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("Network error");
        return respuesta.json();
      })
      .then((dato) => setProducto(dato))
      .catch(() => setError("No se pudo cargar el producto"))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando)
    return (
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl shadow overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-pulse">
            <div className="bg-gray-200 h-80" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-10 bg-gray-200 rounded w-32" />
            </div>
          </div>
        </div>
      </section>
    );

  if (error)
    return <div className="p-6 text-center text-red-600">{error}</div>;

  if (!producto) return null;

  const nombre = producto.title || producto.nombre || "Producto";
  const precio = Number(producto.price ?? producto.precio ?? 0).toLocaleString(
    "es-AR",
    {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 2,
    }
  );
  const categoria = producto.category || producto.categoria;
  const imgSrc =
    producto.image ||
    producto.imagen ||
    producto.imagenUrl ||
    producto.imageUrl ||
    producto.avatar ||
    producto.url ||
    `https://placehold.co/600x600?text=${encodeURIComponent(nombre)}`;

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl shadow overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-50 flex items-center justify-center p-6">
            <img
              src={imgSrc}
              alt={nombre}
              className="max-h-96 object-contain"
              onError={(e) => {
                const fallback = `https://placehold.co/600x600?text=${encodeURIComponent(
                  nombre
                )}`;
                if (e.currentTarget.src !== fallback)
                  e.currentTarget.src = fallback;
              }}
            />
          </div>
          <div className="p-6">
            {categoria && (
              <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 mb-3">
                {categoria}
              </span>
            )}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{nombre}</h1>
            <p className="text-blue-600 font-bold text-xl mb-4">{precio}</p>
            {producto.description && (
              <p className="text-gray-600 leading-relaxed">
                {producto.description}
              </p>
            )}
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm active:translate-y-px border ${
                  estaEnCarrito(producto.id)
                    ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 border-green-600 text-white hover:bg-green-700"
                }`}
                disabled={estaEnCarrito(producto.id)}
                onClick={() => agregarItem(producto)}
              >
                {estaEnCarrito(producto.id) ? "En el carrito" : "Agregar al carrito"}
              </button>
              <Link
                to="/"
                className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm active:translate-y-px border bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200"
              >
                Volver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetalleProducto;
