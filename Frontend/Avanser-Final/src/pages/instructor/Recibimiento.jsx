import React from 'react';
import { FileText, User, BarChart3, Bell, ArrowRight, BookOpen } from 'lucide-react';
// IMPORTANTE: Asegúrate de instalar y usar 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'; 
import Sidebar_instructor from '../../components/Sidebar_instructor';

export default function Welcome() {
    // 1. Hook para la navegación programática
    const navigate = useNavigate(); 
    
    // Función para el botón de la campana
    const handleNotificationsClick = () => {
        // Usamos navigate() para cambiar de ruta de forma eficiente
        navigate('/instructor/notificaciones'); 
    };

    // 2. Definición de Accesos Rápidos con rutas absolutas
    // Las rutas de ejemplo asumen un prefijo '/instructor'
    const quickAccess = [
        { icon: BarChart3, label: 'Rendimiento', path: "/Rendimiento" },
        { icon: FileText, label: 'Reportes', path: "/Reporte" },
        { icon: BookOpen, label: 'Mi Ficha', path: "/Mi_Ficha" },
        { icon: Bell, label: 'Notificaciones', path: "/Notificaciones" },
        { icon: User, label: 'Perfil', path: "/Perfil" },
    ];

    return (
        <div className="min-h-screen flex bg-white text-gray-900">

            {/* SIDEBAR (No necesita cambios si ya usa <Link>) */}
            <Sidebar_instructor />

            {/* CONTENEDOR PRINCIPAL */}
            <div className="flex-1 flex flex-col ml-20 md:ml-6">

                {/* HEADER FIJO */}
                <header className="fixed top-0 right-0 left-20 md:left-64 bg-white border-b border-gray-200 z-40">
                    <div className="px-6 py-4 flex justify-end items-center">

                        {/* CAMPANA DE NOTIFICACIONES */}
                        <button
                            onClick={handleNotificationsClick}
                            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Bell size={24} className="text-gray-700" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* MAIN */}
                <main className="flex-1 px-6 pt-32 pb-10">
                    <div className="max-w-7xl mx-auto text-center">

                        {/* TÍTULO (Se mantiene igual) */}
                        <h1 className="text-7xl md:text-8xl font-light mb-6 text-gray-900 tracking-wide">
                            Bienvenido Instructor
                        </h1>

                        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light mb-16">
                            Te damos la bienvenida a tu panel de control. Aquí puedes gestionar tus cursos,
                            revisar el progreso de tus estudiantes y acceder a recursos exclusivos.
                        </p>

                        {/* ACCESOS RÁPIDOS */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                            {quickAccess.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    // 3. Reemplazar <a> por <Link> y usar item.path
                                    <Link
                                        key={index}
                                        to={item.path} 
                                        className="group bg-white border border-gray-200 rounded-xl p-8 
                                        hover:border-gray-900 hover:shadow-xl transition-all duration-200"
                                    >
                                        <div className="flex flex-col items-start">
                                            <div className="w-14 h-14 rounded-lg bg-indigo-500 flex items-center 
                                            justify-center mb-4 group-hover:scale-105 transition-transform">
                                                <Icon size={28} className="text-white" />
                                            </div>

                                            <h3 className="text-xl font-medium mb-2 text-gray-900">{item.label}</h3>

                                            <div className="flex items-center text-gray-500 group-hover:text-gray-900 transition-colors text-sm">
                                                Acceder
                                                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}