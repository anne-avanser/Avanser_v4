import React from "react";
import { Mail, User, ShieldCheck, Briefcase } from "lucide-react";
import Sidebar_Bienestar from "../../components/Sidebar_Bienestar";

const Perfil_Bienestar = () => {
  const usuario = {
    nombre: "Funcionario bienestar",
    correo: "maria.gonzalez@sena.edu.co",
    cargo: "Profesional de Bienestar al Aprendiz",
    rol: "Bienestar",
    foto: "https://oficinavirtualderadicacion.sena.edu.co/oficinavirtual/Resources/logoSenaNaranja.png",
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Bienestar />

      <main className="flex-1 p-6 ml-4">
        <div className="max-w-4xl mx-auto">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Perfil</h1>
            <p className="text-gray-600">
              Información del usuario registrado en el sistema
            </p>
          </div>

          {/* TARJETA PERFIL */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row gap-8 items-center">

            {/* FOTO */}
            <div className="flex-shrink-0">
              <img
                src={usuario.foto}
                alt="Foto de perfil"
                className="w-40 h-40 rounded-full border-4  object-cover"
              />
            </div>

            {/* INFO */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {usuario.nombre}
              </h2>

              <div className="space-y-4 text-gray-700">

                <div className="flex items-center gap-3">
                  <Mail className="text-blue-600" />
                  <span>
                    <strong>Correo:</strong> {usuario.correo}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Briefcase className="text-blue-600" />
                  <span>
                    <strong>Cargo:</strong> {usuario.cargo}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-blue-600" />
                  <span>
                    <strong>Rol:</strong> {usuario.rol}
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Perfil_Bienestar;
