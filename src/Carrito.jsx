import { Link } from "react-router-dom";
import { useCarrito } from "./context/carritoStore.js";
import "./Carrito.css";

const Carrito = () => {
  const {
    items,
    eliminarItem,
    actualizarCantidad,
    vaciarCarrito,
    totalItems,
    totalPrecio,
  } = useCarrito();

  if (items.length === 0) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-500 mb-6">
            Agrega algunos productos para comenzar tu compra
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Ver Productos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="carrito py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900">
              🛒 Carrito de Compras ({totalItems})
            </h2>
            <button
              onClick={vaciarCarrito}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition active:translate-y-px"
            >
              🗑️ Vaciar
            </button>
          </div>

          <div className="p-6 space-y-4">
            {items.map((item) => {
              const nombre = item.title || item.nombre || "Producto";
              const precio = Number(item.price ?? item.precio ?? 0);
              const precioFormateado = precio.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumFractionDigits: 2,
              });
              const imgSrc =
                item.image ||
                item.imagen ||
                `https://placehold.co/200x200?text=${encodeURIComponent(nombre)}`;

              return (
                <article
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <img
                    src={imgSrc}
                    alt={nombre}
                    className="w-20 h-20 object-contain rounded-lg bg-white"
                    onError={(e) => {
                      const fallback = `https://placehold.co/200x200?text=${encodeURIComponent(nombre)}`;
                      if (e.currentTarget.src !== fallback)
                        e.currentTarget.src = fallback;
                    }}
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {nombre}
                    </h3>
                    <p className="text-blue-600 font-bold text-lg">
                      {precioFormateado}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700 transition"
                      aria-label="Disminuir cantidad"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-semibold text-gray-900">
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700 transition"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => eliminarItem(item.id)}
                    className="w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg transition active:translate-y-px"
                    title="Eliminar del carrito"
                    aria-label="Eliminar"
                  >
                    ❌
                  </button>
                </article>
              );
            })}
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-900">
                Total ({totalItems} {totalItems === 1 ? "producto" : "productos"}):
              </span>
              <span className="text-2xl font-bold text-green-600">
                {totalPrecio.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex gap-3">
              <Link
                to="/"
                className="flex-1 text-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Seguir Comprando
              </Link>
              <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition active:translate-y-px">
                💳 Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carrito;