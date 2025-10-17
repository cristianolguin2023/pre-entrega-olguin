import "./App.css";
import { Routes, Route } from "react-router-dom";
import Productos from "./Productos.jsx";
import DetalleProducto from "./DetalleProducto.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Moda from "./Moda.jsx";
import Carrito from "./Carrito.jsx";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Checkout from "./Checkout";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/moda" element={<Moda />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
