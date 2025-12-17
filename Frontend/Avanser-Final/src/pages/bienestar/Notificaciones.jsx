import React, { useState } from "react";
import { Bell, AlertTriangle, X } from "lucide-react";
import Sidebar_Bienestar from "../../components/Sidebar_Bienestar";

const Notificaciones_Bienestar = () => {
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);
  const [filtros, setFiltros] = useState({
    estado: "",
    tipoRiesgo: "",
    ficha: "",
  });

 const nuevosCasos = [
  {
    id: 1,
    aprendiz: "Juan Sebastián Rojas",
    ficha: "2654321",
    programa: "Análisis y Desarrollo de Software",
    tipoRiesgo: "Económico",
    nivelRiesgo: "Crítico",
    estado: "Nuevo",
    descripcion: "Dificultades económicas que afectan su permanencia.",
    instructor: "María González",
    fechaIngreso: "2024-06-10",
    correo: "juan.rojas@email.com",
    telefono: "320 456 7890",
  },
  {
    id: 2,
    aprendiz: "Laura Camila Pérez",
    ficha: "2654330",
    programa: "Gestión Administrativa",
    tipoRiesgo: "Familiar",
    nivelRiesgo: "Alto",
    estado: "En revisión",
    descripcion: "Situación familiar compleja que afecta su rendimiento.",
    instructor: "Carlos Rodríguez",
    fechaIngreso: "2024-06-12",
    correo: "laura.perez@email.com",
    telefono: "311 234 5678",
  },
  {
    id: 3,
    aprendiz: "Andrés Felipe Torres",
    ficha: "2654335",
    programa: "Mantenimiento de Equipos de Cómputo",
    tipoRiesgo: "Salud",
    nivelRiesgo: "Alto",
    estado: "Nuevo",
    descripcion: "Problemas de salud recurrentes que generan ausencias.",
    instructor: "Diana Martínez",
    fechaIngreso: "2024-06-13",
    correo: "andres.torres@email.com",
    telefono: "314 567 8901",
  },
  {
    id: 4,
    aprendiz: "María Alejandra Gómez",
    ficha: "2654328",
    programa: "Contabilidad",
    tipoRiesgo: "Vivienda",
    nivelRiesgo: "Crítico",
    estado: "En proceso",
    descripcion: "Inestabilidad en vivienda actual, riesgo de deserción.",
    instructor: "Jorge Mendoza",
    fechaIngreso: "2024-06-09",
    correo: "maria.gomez@email.com",
    telefono: "318 901 2345",
  },
  {
    id: 5,
    aprendiz: "Kevin Stiven Morales",
    ficha: "2654340",
    programa: "Electricidad Industrial",
    tipoRiesgo: "Económico",
    nivelRiesgo: "Alto",
    estado: "Nuevo",
    descripcion: "No cuenta con recursos para transporte diario.",
    instructor: "Luis Herrera",
    fechaIngreso: "2024-06-14",
    correo: "kevin.morales@email.com",
    telefono: "320 789 4561",
  },
  {
    id: 6,
    aprendiz: "Natalia Andrea Cárdenas",
    ficha: "2654321",
    programa: "Análisis y Desarrollo de Software",
    tipoRiesgo: "Familiar",
    nivelRiesgo: "Crítico",
    estado: "En revisión",
    descripcion: "Responsabilidad del cuidado de hermanos menores.",
    instructor: "María González",
    fechaIngreso: "2024-06-11",
    correo: "natalia.cardenas@email.com",
    telefono: "312 345 6789",
  },
  {
    id: 7,
    aprendiz: "Cristian David López",
    ficha: "2654350",
    programa: "Diseño Gráfico",
    tipoRiesgo: "Alimentación",
    nivelRiesgo: "Alto",
    estado: "Nuevo",
    descripcion: "Inseguridad alimentaria que afecta su concentración.",
    instructor: "Laura Díaz",
    fechaIngreso: "2024-06-15",
    correo: "cristian.lopez@email.com",
    telefono: "313 222 8899",
  },
  {
    id: 8,
    aprendiz: "Paola Andrea Ruiz",
    ficha: "2654360",
    programa: "Marketing Digital",
    tipoRiesgo: "Salud",
    nivelRiesgo: "Crítico",
    estado: "Finalizado",
    descripcion: "Caso atendido exitosamente con apoyo médico.",
    instructor: "Patricia Silva",
    fechaIngreso: "2024-05-20",
    correo: "paola.ruiz@email.com",
    telefono: "315 678 4433",
  },
  {
    id: 9,
    aprendiz: "Diego Alejandro Vargas",
    ficha: "2654370",
    programa: "Logística Empresarial",
    tipoRiesgo: "Vivienda",
    nivelRiesgo: "Alto",
    estado: "En proceso",
    descripcion: "Traslado frecuente entre viviendas temporales.",
    instructor: "Sandra Ortiz",
    fechaIngreso: "2024-06-08",
    correo: "diego.vargas@email.com",
    telefono: "319 556 7788",
  },
  {
    id: 10,
    aprendiz: "Sofía Valentina Medina",
    ficha: "2654380",
    programa: "Gestión de Talento Humano",
    tipoRiesgo: "Económico",
    nivelRiesgo: "Crítico",
    estado: "Nuevo",
    descripcion: "Familia sin ingresos fijos actualmente.",
    instructor: "Ricardo Peña",
    fechaIngreso: "2024-06-16",
    correo: "sofia.medina@email.com",
    telefono: "316 900 1122",
  },
];


  const coloresRiesgo = {
    Económico: "bg-red-100 text-red-800 border-red-300",
    Familiar: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Vivienda: "bg-orange-100 text-orange-800 border-orange-300",
    Salud: "bg-purple-100 text-purple-800 border-purple-300",
  };

  /* 🔍 FILTRADO */
  const casosFiltrados = nuevosCasos.filter((caso) => {
    if (filtros.estado && caso.estado !== filtros.estado) return false;
    if (filtros.tipoRiesgo && caso.tipoRiesgo !== filtros.tipoRiesgo) return false;
    if (filtros.ficha && caso.ficha !== filtros.ficha) return false;
    return true;
  });

  const fichasUnicas = [...new Set(nuevosCasos.map((c) => c.ficha))];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Bienestar />

      <main className="flex-1 p-6 ml-4">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Bell className="text-blue-600" />
              Notificaciones
            </h1>
            <p className="text-gray-600">
              Nuevos casos ingresados al sistema
            </p>
          </div>

          {/* FILTROS */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="font-semibold mb-4">Filtros</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={filtros.estado}
                onChange={(e) =>
                  setFiltros({ ...filtros, estado: e.target.value })
                }
                className="border rounded-lg p-2"
              >
                <option value="">Estado del caso</option>
                <option value="Nuevo">Nuevo</option>
                <option value="En revisión">En revisión</option>
                <option value="En proceso">En proceso</option>
                <option value="Finalizado">Finalizado</option>
              </select>

              <select
                value={filtros.tipoRiesgo}
                onChange={(e) =>
                  setFiltros({ ...filtros, tipoRiesgo: e.target.value })
                }
                className="border rounded-lg p-2"
              >
                <option value="">Tipo de riesgo</option>
                <option value="Económico">Económico</option>
                <option value="Familiar">Familiar</option>
                <option value="Vivienda">Vivienda</option>
                <option value="Salud">Salud</option>
              </select>

              <select
                value={filtros.ficha}
                onChange={(e) =>
                  setFiltros({ ...filtros, ficha: e.target.value })
                }
                className="border rounded-lg p-2"
              >
                <option value="">Ficha</option>
                {fichasUnicas.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {(filtros.estado || filtros.tipoRiesgo || filtros.ficha) && (
              <button
                onClick={() =>
                  setFiltros({ estado: "", tipoRiesgo: "", ficha: "" })
                }
                className="mt-4 text-sm text-blue-600 hover:underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* TARJETAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {casosFiltrados.map((caso) => (
              <div
                key={caso.id}
                className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">{caso.aprendiz}</h3>
                  <AlertTriangle className="text-red-500" />
                </div>

                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full border ${coloresRiesgo[caso.tipoRiesgo]}`}
                >
                  {caso.tipoRiesgo}
                </span>

                <p className="text-sm text-gray-600 mt-2">
                  Estado: <strong>{caso.estado}</strong>
                </p>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {caso.descripcion}
                </p>

                <button
                  onClick={() => setCasoSeleccionado(caso)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Detalles
                </button>
              </div>
            ))}
          </div>

          {casosFiltrados.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No hay casos con los filtros seleccionados
            </p>
          )}
        </div>
      </main>

      {/* MODAL */}
      {casoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-xl w-full p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Detalles del Caso</h2>
              <button onClick={() => setCasoSeleccionado(null)}>
                <X />
              </button>
            </div>

            <div className="space-y-2 text-gray-700">
              <p><strong>Aprendiz:</strong> {casoSeleccionado.aprendiz}</p>
              <p><strong>Ficha:</strong> {casoSeleccionado.ficha}</p>
              <p><strong>Programa:</strong> {casoSeleccionado.programa}</p>
              <p><strong>Instructor:</strong> {casoSeleccionado.instructor}</p>
              <p><strong>Estado:</strong> {casoSeleccionado.estado}</p>
              <p><strong>Tipo de riesgo:</strong> {casoSeleccionado.tipoRiesgo}</p>
              <p><strong>Descripción:</strong> {casoSeleccionado.descripcion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notificaciones_Bienestar;
