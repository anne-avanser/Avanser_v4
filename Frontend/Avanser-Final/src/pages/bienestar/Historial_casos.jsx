import React, { useState } from "react";
import { History, Eye, X } from "lucide-react";
import Sidebar_Bienestar from "../../components/Sidebar_Bienestar";

const Historial_Bienestar = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  const [filters, setFilters] = useState({
    estado: "",
    riesgo: "",
    ficha: "",
  });

  const cases = [
    {
      id: 1,
      name: "Juan Pérez García",
      ficha: "2654321",
      riesgo: "Económico",
      estado: "Finalizado",
      evolucion: "Mejoría significativa",
      registros: [
        {
          fecha: "2024-01-10",
          descripcion: "Apertura del caso y diagnóstico inicial.",
        },
        {
          fecha: "2024-02-05",
          descripcion: "Entrega de apoyo de transporte.",
        },
        {
          fecha: "2024-03-15",
          descripcion: "Caso cerrado por mejoría.",
        },
      ],
    },
    {
      id: 2,
      name: "Ana Martínez López",
      ficha: "2654322",
      riesgo: "Vivienda",
      estado: "En proceso",
      evolucion: "En seguimiento",
      registros: [
        {
          fecha: "2024-02-01",
          descripcion: "Caso abierto por situación de hacinamiento.",
        },
        {
          fecha: "2024-03-01",
          descripcion: "Visita domiciliaria programada.",
        },
      ],
    },
    {
      id: 3,
      name: "Carlos Ramírez Soto",
      ficha: "2654323",
      riesgo: "Familiar",
      estado: "No iniciado",
      evolucion: "Pendiente de intervención",
      registros: [
        {
          fecha: "2024-03-20",
          descripcion: "Caso registrado en el sistema.",
        },
      ],
    },
  ];

  const riskColors = {
    Económico: "bg-red-100 text-red-800 border-red-300",
    Vivienda: "bg-orange-100 text-orange-800 border-orange-300",
    Familiar: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Salud: "bg-purple-100 text-purple-800 border-purple-300",
    Alimentación: "bg-pink-100 text-pink-800 border-pink-300",
  };

  const estadoColors = {
    "No iniciado": "bg-gray-100 text-gray-800",
    "En proceso": "bg-blue-100 text-blue-800",
    Finalizado: "bg-green-100 text-green-800",
  };

  const filteredCases = cases.filter((c) => {
    if (filters.estado && c.estado !== filters.estado) return false;
    if (filters.riesgo && c.riesgo !== filters.riesgo) return false;
    if (filters.ficha && !c.ficha.includes(filters.ficha)) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Bienestar />

      <main className="flex-1 p-6 ml-4">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Historial de Casos
            </h1>
            <p className="text-gray-600">
              Casos registrados y su evolución
            </p>
          </div>

          {/* FILTROS */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={filters.estado}
                onChange={(e) =>
                  setFilters({ ...filters, estado: e.target.value })
                }
                className="border p-2 rounded-lg"
              >
                <option value="">Estado del caso</option>
                <option value="No iniciado">No iniciado</option>
                <option value="En proceso">En proceso</option>
                <option value="Finalizado">Finalizado</option>
              </select>

              <select
                value={filters.riesgo}
                onChange={(e) =>
                  setFilters({ ...filters, riesgo: e.target.value })
                }
                className="border p-2 rounded-lg"
              >
                <option value="">Tipo de riesgo</option>
                <option value="Económico">Económico</option>
                <option value="Vivienda">Vivienda</option>
                <option value="Familiar">Familiar</option>
                <option value="Salud">Salud</option>
                <option value="Alimentación">Alimentación</option>
              </select>

              <input
                type="text"
                placeholder="Buscar por ficha"
                value={filters.ficha}
                onChange={(e) =>
                  setFilters({ ...filters, ficha: e.target.value })
                }
                className="border p-2 rounded-lg"
              />
            </div>
          </div>

          {/* TABLA / LISTA */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Aprendiz</th>
                  <th className="p-3">Ficha</th>
                  <th className="p-3">Riesgo</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3">Evolución</th>
                  <th className="p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="p-3">{c.name}</td>
                    <td className="p-3">{c.ficha}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm border ${riskColors[c.riesgo]}`}
                      >
                        {c.riesgo}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${estadoColors[c.estado]}`}
                      >
                        {c.estado}
                      </span>
                    </td>
                    <td className="p-3">{c.evolucion}</td>
                    <td className="p-3">
                      <button
                        onClick={() => setSelectedCase(c)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={18} /> Ver historial
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredCases.length === 0 && (
              <p className="text-center py-6 text-gray-500">
                No hay casos con los filtros seleccionados
              </p>
            )}
          </div>
        </div>
      </main>

      {/* MODAL HISTORIAL */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-xl w-full p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
                Historial del Caso
              </h2>
              <button onClick={() => setSelectedCase(null)}>
                <X />
              </button>
            </div>

            <p className="mb-2">
              <strong>Aprendiz:</strong> {selectedCase.name}
            </p>
            <p className="mb-4">
              <strong>Ficha:</strong> {selectedCase.ficha}
            </p>

            <ul className="space-y-3">
              {selectedCase.registros.map((r, index) => (
                <li
                  key={index}
                  className="border-l-4 border-blue-600 pl-4"
                >
                  <p className="font-medium">{r.fecha}</p>
                  <p className="text-gray-700">{r.descripcion}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Historial_Bienestar;
