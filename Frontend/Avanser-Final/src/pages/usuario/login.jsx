import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo no es válido";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener mínimo 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Inicio de sesión exitoso (simulado)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* VENTANA 70% */}
      <div className="flex w-[70%] h-[80vh] rounded-3xl overflow-hidden shadow-2xl bg-white relative">

        {/* BOTÓN PARA VOLVER */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 
          bg-white/80 backdrop-blur-md border border-gray-300 rounded-full 
          hover:bg-white shadow-md transition font-medium text-gray-700"
        >
          <ArrowLeft size={18} />
          Volver
        </button>

        {/* LADO IZQUIERDO GRADIENTE */}
        <div className="w-1/2 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white p-14 flex flex-col justify-center relative">

          <h1 className="text-5xl font-extrabold mb-5 leading-tight">
            ¡Hola, Avanser! 👋
          </h1>

          <p className="text-lg opacity-90">
            Optimiza tareas repetitivas con nuestras herramientas.  
            Sé más productivo y ahorra tiempo con nosotros.
          </p>

          <p className="absolute bottom-6 left-14 text-sm opacity-70">
            © 2025 Avanser. Todos los derechos reservados.
          </p>
        </div>

        {/* LADO DERECHO FORM */}
        <div className="w-1/2 bg-white p-14 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Bienvenido de nuevo
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* CORREO */}
            <div>
              <label className="font-semibold text-gray-700">Correo</label>
              <input
                type="email"
                placeholder="Ingresa tu correo"
                className="mt-2 w-full border-b border-gray-300 p-2 outline-none focus:border-indigo-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* CONTRASEÑA */}
            <div>
              <label className="font-semibold text-gray-700">Contraseña</label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                className="mt-2 w-full border-b border-gray-300 p-2 outline-none focus:border-indigo-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* BOTÓN LOGIN */}
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* OLVIDASTE CONTRASEÑA */}
          <div className="text-center mt-6">
            <span className="text-gray-500">¿Olvidaste tu contraseña?</span>{" "}
            <button className="text-indigo-600 hover:underline">
              Click aquí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
