import React, { useState } from "react";
import { Upload, FileText, Image, Plus, X } from "lucide-react";
import Sidebar_Bienestar from "../../components/Sidebar_Bienestar";

const Noticias_Bienestar = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    tipo: "Noticia",
    descripcion: "",
    informacion: "",
    archivos: [],
  });

  const [noticias, setNoticias] = useState([]);

  // Manejo de archivos
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, archivos: files });
  };

  // Crear noticia
  const handleSubmit = (e) => {
    e.preventDefault();

    setNoticias([
      ...noticias,
      {
        ...formData,
        id: Date.now(),
        fecha: new Date().toLocaleDateString(),
      },
    ]);

    setFormData({
      titulo: "",
      tipo: "Noticia",
      descripcion: "",
      informacion: "",
      archivos: [],
    });

    setMostrarFormulario(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar_Bienestar />

      <main className="flex-1 p-6 ml-4">
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Noticias y Convocatorias
              </h1>
              <p className="text-gray-600">
                Publica ayudas, apoyos y convocatorias de Bienestar
              </p>
            </div>

            <button
              onClick={() => setMostrarFormulario(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Plus size={18} />
              Nueva publicación
            </button>
          </div>

          {/* LISTADO DE NOTICIAS */}
          {noticias.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center text-gray-500 shadow">
              No hay publicaciones creadas
            </div>
          ) : (
            <div className="space-y-4">
              {noticias.map((n) => (
                <div
                  key={n.id}
                  className="bg-white p-6 rounded-lg shadow border"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{n.titulo}</h3>
                      <p className="text-sm text-gray-500">
                        {n.tipo} · {n.fecha}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">{n.descripcion}</p>

                  <p className="text-gray-600 text-sm mb-4">
                    {n.informacion}
                  </p>

                  {/* Archivos */}
                  {n.archivos.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {n.archivos.map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm"
                        >
                          {file.type.includes("pdf") ? (
                            <FileText size={16} />
                          ) : (
                            <Image size={16} />
                          )}
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* MODAL FORMULARIO */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Nueva Noticia / Convocatoria
              </h2>
              <button onClick={() => setMostrarFormulario(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Título"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
                required
              />

              <select
                value={formData.tipo}
                onChange={(e) =>
                  setFormData({ ...formData, tipo: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              >
                <option value="Noticia">Noticia</option>
                <option value="Notificación">Notificación</option>
              </select>

              <textarea
                placeholder="Descripción corta"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
                rows={2}
                required
              />

              <textarea
                placeholder="Información detallada de la convocatoria"
                value={formData.informacion}
                onChange={(e) =>
                  setFormData({ ...formData, informacion: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
                rows={4}
                required
              />

              {/* SUBIDA DE ARCHIVOS */}
              <div>
                <label className="block mb-2 font-medium">
                  Archivos (PDF o imágenes)
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Noticias_Bienestar;
