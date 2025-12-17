import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Sidebar_instructor from '../../components/Sidebar_instructor'; // Asegúrate de que esta ruta es correcta

// --- DATOS DE EJEMPLO PARA EL DASHBOARD ---
const barData = [
  { nombre: 'Ana M.', rendimiento: 95 },
  { nombre: 'Luis G.', rendimiento: 78 },
  { nombre: 'Martín P.', rendimiento: 62 },
  { nombre: 'Sofía R.', rendimiento: 88 },
  { nombre: 'David C.', rendimiento: 45 },
  { nombre: 'Elena F.', rendimiento: 92 },
];

const pieData = [
  { name: 'Aprobado (>= 70%)', value: 4, color: '#3b82f6' }, // blue-500
  { name: 'Pendiente (50-69%)', value: 1, color: '#f59e0b' }, // amber-500
  { name: 'Reprobado (< 50%)', value: 1, color: '#ef4444' }, // red-500
];

const aprendices = [
  { id: 1, nombre: 'Ana María Giraldo', rendimiento: '95%', estado: 'Sobresaliente', iniciales: 'AG', color: 'bg-green-500' },
  { id: 2, nombre: 'Luis Gabriel Torres', rendimiento: '78%', estado: 'Aprobado', iniciales: 'LT', color: 'bg-blue-500' },
  { id: 3, nombre: 'Martín Pérez R.', rendimiento: '62%', estado: 'En Riesgo', iniciales: 'MP', color: 'bg-yellow-500' },
  { id: 4, nombre: 'Sofía Ramírez J.', rendimiento: '88%', estado: 'Sobresaliente', iniciales: 'SR', color: 'bg-green-500' },
  { id: 5, nombre: 'David Cárdenas P.', rendimiento: '45%', estado: 'Reprobado', iniciales: 'DC', color: 'bg-red-500' },
  { id: 6, nombre: 'Elena Flórez M.', rendimiento: '92%', estado: 'Sobresaliente', iniciales: 'EF', color: 'bg-green-500' },
];

export default function MiFicha() {
  const TOTAL_APRENDICES = aprendices.length; // Usamos el dato real

  return (
    // 1. Contenedor principal usa Flexbox para organizar Sidebar y Contenido
    <div className="flex min-h-screen bg-gray-50"> 
      
      {/* 2. Sidebar (fijo a la izquierda) */}
      <Sidebar_instructor /> 

      {/* 3. Contenido Principal de MiFicha (usa flex-1 para ocupar el espacio restante) */}
      <div className="flex-1 p-8 overflow-y-auto"> 
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mi Ficha</h1>
          <p className="text-gray-600">Gestión y seguimiento del rendimiento académico</p>
        </div>
        
        {/* Total Aprendices Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 inline-block">
          <p className="text-sm text-gray-600 mb-2">Total Aprendices</p>
          <p className="text-4xl font-bold text-gray-900">{TOTAL_APRENDICES}</p>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Bar Chart: Rendimiento por aprendiz */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Rendimiento por aprendiz</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="nombre" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="rendimiento" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart: Estado del rendimiento general */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Estado del rendimiento general</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`} // Etiqueta más informativa
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} Aprendices`, name]} />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Lista de Aprendices */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lista de Aprendices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {aprendices.map((aprendiz) => (
              <div key={aprendiz.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
                
                <div className="flex items-center mb-4">
                  <div className={`${aprendiz.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4`}>
                    {aprendiz.iniciales}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{aprendiz.nombre}</h3>
                    <p className="text-sm text-gray-500">Rendimiento: **{aprendiz.rendimiento}**</p>
                  </div>
                </div>
                
                {/* Etiqueta de Estado con color dinámico */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 
                  ${aprendiz.estado === 'Sobresaliente' ? 'bg-green-100 text-green-700' :
                    aprendiz.estado === 'Aprobado' ? 'bg-blue-100 text-blue-700' :
                    aprendiz.estado === 'En Riesgo' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'}`
                }>
                  {aprendiz.estado}
                </span>

                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors mt-2">
                  Ver Detalles
                </button>
              </div>
            ))}
          </div>
        </div>

      </div> {/* Fin del Contenido Principal */}
    </div>
  );
}