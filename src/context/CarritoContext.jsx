import { useState, useEffect, useMemo, useCallback } from "react";
import { CarritoContext } from "./carritoStore";

export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("carrito");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(items));
  }, [items]);

  const agregarItem = useCallback((producto) => {
    setItems((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }, []);

  const eliminarItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const actualizarCantidad = useCallback(
    (id, cantidad) => {
      if (cantidad <= 0) {
        eliminarItem(id);
        return;
      }
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, cantidad } : item))
      );
    },
    [eliminarItem]
  );

  const vaciarCarrito = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrecio = items.reduce(
    (sum, item) => sum + (item.price || item.precio || 0) * item.cantidad,
    0
  );

  const estaEnCarrito = useCallback((id) => items.some((item) => item.id === id), [items]);
  const value = useMemo(
    () => ({
      items,
      agregarItem,
      eliminarItem,
      actualizarCantidad,
      vaciarCarrito,
      totalItems,
      totalPrecio,
      estaEnCarrito,
    }),
    [items, totalItems, totalPrecio, actualizarCantidad, estaEnCarrito, agregarItem, eliminarItem, vaciarCarrito]
  );

  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>;
};
