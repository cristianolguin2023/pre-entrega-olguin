import { useCarrito } from "./context/carritoStore.js";

const Checkout = () => {
  const { items, totalItems, totalPrecio } = useCarrito();

  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <p className="text-sm text-gray-600 mb-4">Resumen de tu pedido ({totalItems} items)</p>
        <ul className="space-y-2 mb-4">
          {items.map((it) => (
            <li key={it.id} className="flex justify-between">
              <span>{it.title || it.nombre}</span>
              <span className="font-semibold">{((it.price ?? it.precio) * it.cantidad).toLocaleString('es-AR',{style:'currency',currency:'ARS'})}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center">
          <span className="font-bold">Total:</span>
          <span className="text-xl font-bold text-green-600">{totalPrecio.toLocaleString('es-AR',{style:'currency',currency:'ARS'})}</span>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
