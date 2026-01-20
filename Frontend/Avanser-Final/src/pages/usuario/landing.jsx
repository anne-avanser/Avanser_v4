import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

export default function Landing() {
  const [currentTeamMember, setCurrentTeamMember] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const teamMembers = [
    { name: "Juan Pérez", role: "CEO & Fundador", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
    { name: "María García", role: "CTO", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
    { name: "Carlos López", role: "Diseñador UX/UI", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
    { name: "Ana Martínez", role: "Desarrolladora Frontend", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
    { name: "Pedro Sánchez", role: "Desarrollador Backend", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" }
  ];

  const nextMember = () => {
    setCurrentTeamMember((prev) => (prev + 1) % teamMembers.length);
  };

  const prevMember = () => {
    setCurrentTeamMember((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AVANSER
            </span>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection("inicio")} className="text-gray-700 hover:text-blue-600 transition-colors">Inicio</button>
              <button onClick={() => scrollToSection("informacion")} className="text-gray-700 hover:text-blue-600 transition-colors">Información</button>
              <button onClick={() => scrollToSection("nosotros")} className="text-gray-700 hover:text-blue-600 transition-colors">Acerca de Nosotros</button>
              <button onClick={() => scrollToSection("equipo")} className="text-gray-700 hover:text-blue-600 transition-colors">Nuestro Equipo</button>

              <button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
              >
                Iniciar Sesión
              </button>
            </div>

            {/* Mobile Button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-2 space-y-2">
            <button onClick={() => scrollToSection("inicio")} className="block w-full text-left text-gray-700 py-2">Inicio</button>
            <button onClick={() => scrollToSection("informacion")} className="block w-full text-left text-gray-700 py-2">Información</button>
            <button onClick={() => scrollToSection("nosotros")} className="block w-full text-left text-gray-700 py-2">Acerca de Nosotros</button>
            <button onClick={() => scrollToSection("equipo")} className="block w-full text-left text-gray-700 py-2">Nuestro Equipo</button>

            <button
              onClick={() => navigate("/login")}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full mt-2"
            >
              Iniciar Sesión
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="inicio"
        className="px-4 relative bg-cover bg-center bg-no-repeat w-full h-screen flex items-center justify-center"
        style={{ backgroundImage: 'url(https://www.sena.edu.co/es-co/formacion/PublishingImages/empresario_fichas.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-12">AVANSER</h1>
          <p className="text-white text-3xl mb-5">
            Acompañamiento Virtual para el Avance y la No deserción del SENA.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all">
              Caracterización
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all">
              App Móvil
            </button>
          </div>
        </div>
      </section>

      {/* INFORMACIÓN */}
      <section id="informacion" className="py-20 px-4 bg-white/50 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Información</h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Avanser es una plataforma diseñada para mejorar procesos empresariales mediante herramientas inteligentes de análisis.
        </p>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Acerca de Nosotros</h2>
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">¿Qué hace nuestro aplicativo?</h3>
            <p className="text-gray-700 text-lg mb-6">
              Nuestro aplicativo Avanser optimiza procesos empresariales usando análisis y caracterización.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li>• Realizar caracterizaciones detalladas</li>
              <li>• Acceder desde cualquier dispositivo móvil</li>
              <li>• Tomar decisiones basadas en datos</li>
              <li>• Mejorar eficiencia y reducir costos</li>
            </ul>
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section id="equipo" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Nuestro Equipo</h2>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
            <div className="flex flex-col items-center">
              <img
                src={teamMembers[currentTeamMember].image}
                alt={teamMembers[currentTeamMember].name}
                className="w-48 h-48 rounded-full object-cover shadow-lg mb-6"
              />

              <h3 className="text-2xl font-bold mb-2">{teamMembers[currentTeamMember].name}</h3>
              <p className="text-lg text-blue-600 font-semibold mb-6">
                {teamMembers[currentTeamMember].role}
              </p>
            </div>

            {/* Controles */}
            <div className="flex justify-between mt-8">
              <button className="bg-blue-600 text-white p-3 rounded-full" onClick={prevMember}>
                <ChevronLeft size={24} />
              </button>

              <div className="flex gap-2">
                {teamMembers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTeamMember(index)}
                    className={`w-3 h-3 rounded-full ${index === currentTeamMember ? "bg-blue-600 w-8" : "bg-gray-300"}`}
                  ></button>
                ))}
              </div>

              <button className="bg-blue-600 text-white p-3 rounded-full" onClick={nextMember}>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          AVANSER
        </h3>
        <p className="text-gray-400">Avanzando por tu futuro</p>
        <p className="text-gray-500 text-sm mt-4">© 2025 Avanser. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
