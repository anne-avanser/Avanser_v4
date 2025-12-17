import React, { useState } from "react";
import {
  Home,
  LayoutDashboard,
  FileText,
  BookOpen,
  Megaphone,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar_Bienestar = () => {
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const menus = [
    { title: "Inicio", icon: <Home size={20} />, path: "/" },
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/Dashboard_Bienestar" },
    { title: "Registro", icon: <FileText size={20} />, path: "/Registro_Bienestar" },
    { title: "Historial", icon: <BookOpen size={20} />, path: "/Historial_Bienestar" },
    { title: "Noticias", icon: <Megaphone size={20} />, path: "/Noticias_bienestar" },
    { title: "Notificaciones", icon: <Bell size={20} />, path: "/Notificaciones_Bienestar" },
    { title: "Perfil", icon: <User size={20} />, path: "/Perfil_bienestar" },
  ];

  const handleLogout = () => setShowConfirm(true);

  const confirmLogout = (confirm) => {
    setShowConfirm(false);
    if (confirm) navigate("/login");
  };

  return (
    <>
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`${open ? "w-64" : "w-20"} sticky top-0 h-screen bg-white shadow-2xl p-5 pt-8 flex flex-col justify-between duration-300`}
      >
        <div>
          <div className="flex gap-x-4 items-center mb-8">
            <img
              src="https://oficinavirtualderadicacion.sena.edu.co/oficinavirtual/Resources/logoSenaNaranja.png"
              alt="logo"
              className="w-20 p-1"
            />
            <h1 className={`${!open && "scale-0"} font-bold text-2xl duration-300`}>
              Avanser
            </h1>
          </div>

          <ul className="space-y-2">
            {menus.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu.path}
                  className="flex items-center gap-x-4 p-2 rounded-lg hover:bg-green-600 hover:text-white transition"
                >
                  {menu.icon}
                  <span className={`${!open && "hidden"} text-sm`}>
                    {menu.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-x-4 p-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          <LogOut size={20} />
          <span className={`${!open && "hidden"} text-sm`}>
            Cerrar sesión
          </span>
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center">
            <h2 className="mb-4 font-semibold">
              ¿Seguro que deseas cerrar sesión?
            </h2>
            <div className="flex justify-around">
              <button
                onClick={() => confirmLogout(true)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Sí
              </button>
              <button
                onClick={() => confirmLogout(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
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

export default Sidebar_Bienestar;
