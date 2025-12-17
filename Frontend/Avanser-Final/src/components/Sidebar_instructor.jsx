import React, { useState } from "react";

import {
  Home,
  BarChart2,
  FileText,
  BookOpen,
  Bell,
  User,
  LogOut,
} from "react-feather";
import { Link, useNavigate } from "react-router-dom";

const Sidebar_instructor = () => {
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  // RUTAS AJUSTADAS A TU Approutes.jsx
  const menus = [
    { title: "Inicio", icon: <Home size={20} color="black" />, path: "/" },
    { title: "Rendimiento", icon: <BarChart2 size={20} color="black" />, path: "/Rendimiento" },
    { title: "Reportes", icon: <FileText size={20} color="black" />, path: "/Reporte" },
    { title: "Mi ficha", icon: <BookOpen size={20} color="black" />, path: "/Mi_Ficha" },
    { title: "Notificaciones", icon: <Bell size={20} color="black" />, path: "/notificaciones" },
    { title: "Perfil", icon: <User size={20} color="black" />, path: "/verperfil" },
  ];

  const handleLogout = () => setShowConfirm(true);

  const confirmLogout = (confirm) => {
    setShowConfirm(false);
    if (confirm) {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`
          ${open ? "w-64" : "w-20"}
          sticky top-0 left-0
          h-screen
          bg-white
          shadow-2xl
          p-5 pt-8
          flex flex-col justify-between
          duration-300
          z-40
        `}
      >
        {/* Logo */}
        <div>
          <div className="flex gap-x-4 items-center mb-8">
            <img
              src="https://oficinavirtualderadicacion.sena.edu.co/oficinavirtual/Resources/logoSenaNaranja.png"
              alt="logo"
              className="w-20 h-15 p-1"
            />
            <h1
              className={`origin-left font-bold text-2xl tracking-wide duration-300 ${
                !open && "scale-0"
              }`}
            >
              Avanser
            </h1>
          </div>

          {/* Menús */}
          <ul className="pt-2 space-y-2">
            {menus.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu.path}
                  className="flex items-center gap-x-4 p-2 rounded-lg hover:bg-green-600 transition-all duration-200"
                >
                  <span className="text-white">{menu.icon}</span>
                  <span
                    className={`text-sm font-medium ${
                      !open && "hidden"
                    } duration-200`}
                  >
                    {menu.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cerrar sesión */}
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-x-4 p-2 rounded-lg w-full justify-center bg-red-600 hover:bg-red-700 transition-all duration-200"
          >
            <LogOut size={20} />
            <span className={`${!open && "hidden"} origin-left text-sm`}>
              Cerrar sesión
            </span>
          </button>
        </div>
      </div>

      {/* Modal confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl w-80 text-center animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">
              ¿Seguro que deseas cerrar sesión?
            </h2>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => confirmLogout(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
              >
                Sí
              </button>
              <button
                onClick={() => confirmLogout(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-all"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar_instructor;
