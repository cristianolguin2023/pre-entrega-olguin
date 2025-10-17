import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/checkout";

  const handleLogin = () => {
    login();
    navigate(from, { replace: true });
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Login (simulado)</h2>
        <p className="text-sm text-gray-600 mb-6">Pulsa el botón para simular inicio de sesión.</p>
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Iniciar sesión</button>
      </div>
    </section>
  );
};

export default Login;
