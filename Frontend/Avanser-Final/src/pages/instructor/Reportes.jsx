import React from "react";
import { BarChart2, PieChart, Users, FileText } from "lucide-react";
import Sidebar_instructor from "../../components/Sidebar_instructor";

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-[#F7F2FF] flex">
      
      <Sidebar_instructor />

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <main className="flex-1 p-8">

        {/* ===== HEADER ===== */}
        <header className="w-full bg-gradient-to-r from-[#5B3FFB] to-[#4E46E5] text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Panel de Control de Aprendizaje</h1>
            <p className="text-sm text-purple-200">Visión general — métricas, riesgos y reportes</p>
          </div>
        </header>

        {/* ===== CONTENIDO ===== */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ===== TARJETA: TOTAL APRENDICES ===== */}
          <div className="bg-white border border-purple-100 rounded-xl shadow p-6 col-span-1 lg:col-span-2">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                <Users size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-600">Total Aprendices</p>
                <h2 className="text-3xl font-bold text-purple-800">4</h2>
              </div>

              <div className="ml-auto text-right text-sm text-gray-500">
                Última actualización  
                <br />
                <span className="text-purple-600 font-medium">hace 2 horas</span>
              </div>
            </div>
          </div>

          {/* ===== TARJETA: CONTROL DE RIESGO ===== */}
          <div className="bg-white border border-purple-100 rounded-xl shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Control de niveles de riesgo</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between bg-green-50 p-2 rounded-lg border border-green-100">
                <span>Riesgo Bajo</span>
                <span className="text-green-600 font-semibold">2</span>
              </div>

              <div className="flex justify-between bg-yellow-50 p-2 rounded-lg border border-yellow-100">
                <span>Riesgo Medio</span>
                <span className="text-yellow-600 font-semibold">1</span>
              </div>

              <div className="flex justify-between bg-red-50 p-2 rounded-lg border border-red-100">
                <span>Riesgo Alto</span>
                <span className="text-red-600 font-semibold">1</span>
              </div>

              <div className="flex justify-between bg-purple-50 p-2 rounded-lg border border-purple-100">
                <span>Total</span>
                <span className="text-purple-700 font-semibold">4</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== GRAFICAS ===== */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Gráfica 1 */}
          <div className="bg-white border border-purple-100 rounded-xl shadow p-6 col-span-1 lg:col-span-2">
            <h3 className="font-semibold text-gray-700 mb-4">Rendimiento por aprendiz</h3>
            <div className="text-gray-400 text-center py-20 border-2 border-dashed border-purple-200 rounded-xl">
              [Gráfica de barras - integrar Chart.js aquí]
            </div>
          </div>

          {/* Gráfica 2 */}
          <div className="bg-white border border-purple-100 rounded-xl shadow p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Dashboard de Riesgos</h3>
            <div className="text-gray-400 text-center py-20 border-2 border-dashed border-purple-200 rounded-xl">
              [Gráfica circular - integrar aquí]
            </div>
          </div>
        </div>

        {/* ===== LISTA DE APRENDICES ===== */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          {[
            { name: "Ana García", progress: "85%", risk: "BAJO", color: "bg-green-100 text-green-600" },
            { name: "Carlos López", progress: "65%", risk: "MEDIO", color: "bg-yellow-100 text-yellow-600" },
            { name: "María Torres", progress: "45%", risk: "ALTO", color: "bg-red-100 text-red-600" },
            { name: "Juan Pérez", progress: "90%", risk: "BAJO", color: "bg-green-100 text-green-600" }
          ].map((a, i) => (
            <div key={i} className="bg-white border border-purple-100 rounded-xl shadow p-5 flex items-center gap-4">
              
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                {a.name.split(" ").map(w => w[0]).join("")}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{a.name}</p>
                <p className="text-sm text-gray-500 mb-2">Progreso: {a.progress}</p>
                
                <div className="h-2 w-full bg-purple-200 rounded-full">
                  <div className="h-2 bg-purple-600 rounded-full" style={{ width: a.progress }}></div>
                </div>
              </div>

              {/* Etiqueta de Riesgo */}
              <span className={`text-xs px-3 py-1 rounded-lg font-semibold ${a.color}`}>
                {a.risk}
              </span>

              {/* Botón */}
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700">
                Generar reporte
              </button>

              <button className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg font-semibold">
                +15%
              </button>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
