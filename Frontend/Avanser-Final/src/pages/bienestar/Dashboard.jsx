import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import Sidebar_Bienestar from "../../components/Sidebar_Bienestar";

const Dashboard_Bienestar = () => {
  const [selectedApprentice, setSelectedApprentice] = useState(null);

  // FILTROS (IGUAL A REGISTRO_BIENESTAR)
  const [filters, setFilters] = useState({
    estado: "",
    ficha: "",
    trimestre: "",
  });

  // DATA DE EJEMPLO
  const apprentices = [
    {
      id: 1,
      name: "Juan Pérez García",
      ficha: "2654321",
      estado: "En proceso",
      trimester: "I",
      riskType: "Económico",
      riskLevel: "Crítico",
      email: "juan.perez@example.com",
      phone: "321 456 7890",
      program: "Desarrollo de Software",
      caseDescription:
        "Dificultades para cubrir costos de transporte y alimentación.",
      instructor: "María González",
      ultimaAsistencia: "2024-03-15",
    },
    {
      id: 2,
      name: "Ana Martínez López",
      ficha: "2654322",
      estado: "No iniciado",
      trimester: "I",
      riskType: "Vivienda",
      riskLevel: "Crítico",
      email: "ana.martinez@example.com",
      phone: "310 234 5678",
      program: "Gestión Empresarial",
      caseDescription:
        "Situación de hacinamiento en el hogar.",
      instructor: "Carlos Rodríguez",
      ultimaAsistencia: "2024-03-18",
    },
    {
      id: 3,
      name: "Carlos Ramírez Soto",
      ficha: "2654323",
      estado: "Finalizado",
      trimester: "II",
      riskType: "Familiar",
      riskLevel: "Crítico",
      email: "carlos.ramirez@example.com",
      phone: "315 678 9012",
      program: "Diseño Gráfico",
      caseDescription:
        "Padre enfermo requiere cuidados constantes.",
      instructor: "Laura Díaz",
      ultimaAsistencia: "2024-03-10",
    },
  ];

  // COLORES RIESGO
  const riskColors = {
    Económico: "bg-red-100 text-red-800 border-red-300",
    Vivienda: "bg-orange-100 text-orange-800 border-orange-300",
    Familiar: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Salud: "bg-purple-100 text-purple-800 border-purple-300",
    Alimentación: "bg-pink-100 text-pink-800 border-pink-300",
  };

  // FILTRADO
  const filteredApprentices = apprentices.filter((a) => {
    if (filters.estado && a.estado !== filters.estado) return false;
    if (filters.trimestre && a.trimester !== filters.trimestre) return false;
    if (filters.ficha && !a.ficha.includes(filters.ficha)) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Bienestar />

      <main className="ml-4 flex-1 p-6">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard de Aprendices
            </h1>
            <p className="text-gray-600">
              Monitoreo de casos de bienestar
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

              <input
                type="text"
                placeholder="Buscar por ficha"
                value={filters.ficha}
                onChange={(e) =>
                  setFilters({ ...filters, ficha: e.target.value })
                }
                className="border p-2 rounded-lg"
              />

              <select
                value={filters.trimestre}
                onChange={(e) =>
                  setFilters({ ...filters, trimestre: e.target.value })
                }
                className="border p-2 rounded-lg"
              >
                <option value="">Trimestre</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
              </select>
            </div>
          </div>

          {/* TARJETAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApprentices.map((a) => (
              <div
                key={a.id}
                className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between mb-3">
                  <h3 className="font-semibold">{a.name}</h3>
                  <AlertTriangle className="text-red-500" />
                </div>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm border ${riskColors[a.riskType]}`}
                >
                  {a.riskType}
                </span>

                <p className="text-sm text-gray-600 mt-3">
                  {a.caseDescription}
                </p>

                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => setSelectedApprentice(a)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-300"
                  >
                    Ver Detalles
                  </button>

                  <button
                    onClick={() => console.log("Remitir caso:", a)}
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-300"
                  >
                    Remitir Caso
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* MODAL */}
      {selectedApprentice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-xl w-full p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
                {selectedApprentice.name}
              </h2>
              <button onClick={() => setSelectedApprentice(null)}>
                <X />
              </button>
            </div>

            <p className="text-gray-700 mb-2">
              <strong>Programa:</strong> {selectedApprentice.program}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Instructor:</strong> {selectedApprentice.instructor}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Estado:</strong> {selectedApprentice.estado}
            </p>
            <p className="text-gray-700">
              <strong>Descripción:</strong>{" "}
              {selectedApprentice.caseDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard_Bienestar;
