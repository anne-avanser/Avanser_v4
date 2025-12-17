import React, { useState } from "react";
import Sidebar_Bienestar from "../../components/Sidebar_Bienestar";
import { Clock, RefreshCcw, CheckCircle, Eye } from "lucide-react";

const Registro_Bienestar = () => {
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroFicha, setFiltroFicha] = useState("");
  const [filtroTrimestre, setFiltroTrimestre] = useState("");
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);

  const casos = [
    {
      id: 1,
      aprendiz: "Juan Pérez García",
      ficha: "2654321",
      riesgo: "Económico",
      fechaRemision: "2024-01-20",
      trimestre: "I",
      estado: "no_iniciado",
    },
    {
      id: 2,
      aprendiz: "Ana Martínez López",
      ficha: "2654322",
      riesgo: "Vivienda",
      fechaRemision: "2024-04-18",
      trimestre: "II",
      estado: "en_proceso",
    },
    {
      id: 3,
      aprendiz: "Carlos Ramírez Soto",
      ficha: "2654323",
      riesgo: "Familiar",
      fechaRemision: "2024-08-10",
      trimestre: "III",
      estado: "finalizado",
    },
  ];

  const estados = {
    no_iniciado: {
      texto: "No iniciado",
      clases: "bg-gray-100 text-gray-800",
      icono: <Clock size={16} />,
    },
    en_proceso: {
      texto: "En proceso",
      clases: "bg-yellow-100 text-yellow-800",
      icono: <RefreshCcw size={16} />,
    },
    finalizado: {
      texto: "Finalizado",
      clases: "bg-green-100 text-green-800",
      icono: <CheckCircle size={16} />,
    },
  };

  // 🔍 FILTROS
  const casosFiltrados = casos.filter((c) => {
    return (
      (filtroEstado === "" || c.estado === filtroEstado) &&
      (filtroFicha === "" || c.ficha.includes(filtroFicha)) &&
      (filtroTrimestre === "" || c.trimestre === filtroTrimestre)
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Bienestar />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <h1 className="text-3xl font-bold mb-6">
            Registro y Seguimiento de Casos
          </h1>

          {/* FILTROS */}
          <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="border rounded-lg p-2"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="no_iniciado">No iniciado</option>
              <option value="en_proceso">En proceso</option>
              <option value="finalizado">Finalizado</option>
            </select>

            <input
              type="text"
              placeholder="Filtrar por ficha"
              className="border rounded-lg p-2"
              value={filtroFicha}
              onChange={(e) => setFiltroFicha(e.target.value)}
            />

            <select
              className="border rounded-lg p-2"
              value={filtroTrimestre}
              onChange={(e) => setFiltroTrimestre(e.target.value)}
            >
              <option value="">Todos los trimestres</option>
              <option value="I">Trimestre I</option>
              <option value="II">Trimestre II</option>
              <option value="III">Trimestre III</option>
              <option value="IV">Trimestre IV</option>
            </select>
          </div>

          {/* TABLA */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full mt-4">
              <thead className="bg-blue-300">
                <tr>
                  <th className="p-4 text-left">Aprendiz</th>
                  <th className="p-4 text-left">Ficha</th>
                  <th className="p-4 text-left">Riesgo</th>
                  <th className="p-4 text-left">Trimestre</th>
                  <th className="p-4 text-left">Estado</th>
                  <th className="p-4 text-left">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {casosFiltrados.map((caso) => {
                  const estado = estados[caso.estado];
                  return (
                    <tr key={caso.id} className="border-t">
                      <td className="p-4">{caso.aprendiz}</td>
                      <td className="p-4">{caso.ficha}</td>
                      <td className="p-4">{caso.riesgo}</td>
                      <td className="p-4">{caso.trimestre}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${estado.clases}`}>
                          {estado.icono}
                          {estado.texto}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setCasoSeleccionado(caso)}
                          className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                          <Eye size={16} />
                          Ver detalles
                        </button>

                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* MODAL DETALLE Y SEGUIMIENTO */}
          {casoSeleccionado && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                  Detalle del Caso
                </h2>
                <p><strong>Aprendiz:</strong> {casoSeleccionado.aprendiz}</p>
                <p><strong>Ficha:</strong> {casoSeleccionado.ficha}</p>
                <p><strong>Riesgo:</strong> {casoSeleccionado.riesgo}</p>

                <div className="mt-4">
                  <label className="block mb-2 font-medium">
                    Actualizar estado
                  </label>
                  <select
                    className="border rounded-lg p-2 w-full"
                    value={casoSeleccionado.estado}
                    onChange={(e) =>
                      setCasoSeleccionado({
                        ...casoSeleccionado,
                        estado: e.target.value,
                      })
                    }
                  >
                    <option value="no_iniciado">No iniciado</option>
                    <option value="en_proceso">En proceso</option>
                    <option value="finalizado">Finalizado</option>
                  </select>
                </div>

                <button
                  onClick={() => setCasoSeleccionado(null)}
                  className="mt-6 w-full bg-gray-700 text-white py-2 rounded-lg"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Registro_Bienestar;
