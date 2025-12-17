import React, { useState } from 'react';
import Sidebar_instructor from "../../components/Sidebar_instructor";
import { TrendingUp, TrendingDown, Award, AlertCircle, BookOpen, Clock, CheckCircle, Activity, X } from 'lucide-react';

export default function Rendimiento() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const [students] = useState([
    {
      id: 1,
      name: 'Ana García',
      avatar: 'AG',
      risk: 'bajo',
      performance: 85,
      metrics: { attendance: 95, assignments: 88, exams: 82, participation: 90, projects: 85 },
      trend: 'up',
      lastUpdate: '2024-12-05',
      strengths: ['Participación activa', 'Puntualidad'],
      improvements: ['Profundizar en proyectos prácticos']
    },
    {
      id: 2,
      name: 'Carlos López',
      avatar: 'CL',
      risk: 'medio',
      performance: 65,
      metrics: { attendance: 78, assignments: 70, exams: 62, participation: 55, projects: 68 },
      trend: 'down',
      lastUpdate: '2024-12-06',
      strengths: ['Trabajo en equipo'],
      improvements: ['Mejorar asistencia', 'Aumentar participación']
    },
    {
      id: 3,
      name: 'María Torres',
      avatar: 'MT',
      risk: 'alto',
      performance: 45,
      metrics: { attendance: 60, assignments: 48, exams: 40, participation: 35, projects: 42 },
      trend: 'down',
      lastUpdate: '2024-12-07',
      strengths: ['Esfuerzo personal'],
      improvements: ['Requiere apoyo urgente', 'Mejorar todas las áreas']
    },
    {
      id: 4,
      name: 'Juan Pérez',
      avatar: 'JP',
      risk: 'bajo',
      performance: 92,
      metrics: { attendance: 98, assignments: 95, exams: 90, participation: 88, projects: 94 },
      trend: 'up',
      lastUpdate: '2024-12-08',
      strengths: ['Excelencia académica', 'Liderazgo'],
      improvements: ['Mantener el ritmo']
    },
    {
      id: 5,
      name: 'Laura Martínez',
      avatar: 'LM',
      risk: 'bajo',
      performance: 78,
      metrics: { attendance: 85, assignments: 80, exams: 75, participation: 72, projects: 78 },
      trend: 'up',
      lastUpdate: '2024-12-07',
      strengths: ['Consistencia', 'Mejora continua'],
      improvements: ['Aumentar participación en clase']
    },
    {
      id: 6,
      name: 'Pedro Sánchez',
      avatar: 'PS',
      risk: 'medio',
      performance: 58,
      metrics: { attendance: 70, assignments: 62, exams: 55, participation: 50, projects: 60 },
      trend: 'stable',
      lastUpdate: '2024-12-06',
      strengths: ['Compromiso'],
      improvements: ['Mejorar comprensión de conceptos']
    }
  ]);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'bajo': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', badge: 'bg-green-500' };
      case 'medio': return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', badge: 'bg-yellow-500' };
      case 'alto': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', badge: 'bg-red-500' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300', badge: 'bg-gray-500' };
    }
  };

  const getPerformanceColor = (value) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Activity className="w-4 h-4 text-gray-500" />;
  };

  const overallMetrics = {
    avgPerformance: Math.round(students.reduce((acc, s) => acc + s.performance, 0) / students.length),
    highRisk: students.filter(s => s.risk === 'alto').length,
    mediumRisk: students.filter(s => s.risk === 'medio').length,
    lowRisk: students.filter(s => s.risk === 'bajo').length,
    totalStudents: students.length
  };

  return (
    <div className="flex w-full min-h-screen overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar_instructor />

      {/* DASHBOARD CONTENT */}
      <div className="flex-1 min-h-screen overflow-y-auto 
                      bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 
                       pt-10 transition-all duration-300">

        <div className="max-w-8xl mx-6">

          {/* HEADER */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard de Riesgo</h1>
            <p className="text-gray-600">Monitoreo y análisis de métricas de aprendices</p>
          </div>

          {/* MÉTRICAS GENERALES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
              <BookOpen className="w-8 h-8 opacity-80 mb-2" />
              <div className="text-3xl font-bold">{overallMetrics.totalStudents}</div>
              <div className="text-blue-100 text-sm">Total Aprendices</div>
            </div>

          

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
              <CheckCircle className="w-8 h-8 opacity-80 mb-2" />
              <div className="text-3xl font-bold">{overallMetrics.lowRisk}</div>
              <div className="text-green-100 text-sm">Riesgo Bajo</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-5 text-white shadow-lg">
              <Clock className="w-8 h-8 opacity-80 mb-2" />
              <div className="text-3xl font-bold">{overallMetrics.mediumRisk}</div>
              <div className="text-yellow-100 text-sm">Riesgo Medio</div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white shadow-lg">
              <AlertCircle className="w-8 h-8 opacity-80 mb-2" />
              <div className="text-3xl font-bold">{overallMetrics.highRisk}</div>
              <div className="text-red-100 text-sm">Riesgo Alto</div>
            </div>

          </div>

          {/* LISTADO DE ESTUDIANTES */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Listado de Aprendices</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              {students.map(student => {
                const colors = getRiskColor(student.risk);

                return (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 
                               border-2 border-gray-200 hover:border-indigo-400 hover:shadow-xl 
                               transition-all cursor-pointer transform hover:scale-105">

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 
                                        rounded-full flex items-center justify-center 
                                        text-white font-bold text-lg">
                          {student.avatar}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{student.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            {getTrendIcon(student.trend)}
                            <span>{student.lastUpdate}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${colors.badge}`} />
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600">Nivel de riesgo </span>
                        <span className={`text-lg font-bold ${getPerformanceColor(student.performance)}`}>
                          {student.performance}%
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`
                            h-2 rounded-full
                            ${student.performance >= 80 ? "bg-green-500" 
                            : student.performance >= 60 ? "bg-yellow-500" 
                            : "bg-red-500"}
                          `}
                          style={{ width: `${student.performance}%` }}
                        />
                      </div>
                    </div>

                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium 
                                     ${colors.bg} ${colors.text} border ${colors.border}`}>
                      Riesgo: {student.risk.toUpperCase()}
                    </div>

                  </div>
                );
              })}

            </div>
          </div>

          {/* MODAL DE DETALLE */}
          {selectedStudent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                
                {/* Header del modal */}
                <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        {selectedStudent.avatar}
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                        <p className="text-indigo-100">Métricas de Rendimiento Detalladas</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedStudent(null)}
                      className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Body del modal */}
                <div className="p-6">

                  {/* Tarjetas principales */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                    {/* Riesgo */}
                    <div className={`rounded-xl p-4 border-2 
                      ${getRiskColor(selectedStudent.risk).bg} 
                      ${getRiskColor(selectedStudent.risk).border}`}>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-semibold">Nivel de Riesgo</span>
                      </div>

                      <div className={`text-2xl font-bold ${getRiskColor(selectedStudent.risk).text}`}>
                        {selectedStudent.risk.toUpperCase()}
                      </div>
                    </div>

                    {/* Rendimiento */}
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border-2 border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-gray-700">Rendimiento Global</span>
                      </div>

                      <div className={`text-2xl font-bold ${getPerformanceColor(selectedStudent.performance)}`}>
                        {selectedStudent.performance}%
                      </div>
                    </div>

                    {/* Tendencia */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-gray-700">Tendencia</span>
                      </div>

                      <div className="flex items-center gap-2 text-xl font-bold text-gray-700">
                        {getTrendIcon(selectedStudent.trend)}
                        {selectedStudent.trend === "up"
                          ? "Mejorando"
                          : selectedStudent.trend === "down"
                            ? "Descendiendo"
                            : "Estable"}
                      </div>
                    </div>

                  </div>

                  {/* Métricas Detalladas */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Métricas Detalladas</h3>

                    <div className="space-y-4">
                      {Object.entries(selectedStudent.metrics).map(([key, value]) => {
                        
                        const labels = {
                          attendance: 'Asistencia',
                          assignments: 'Tareas',
                          exams: 'Exámenes',
                          participation: 'Participación',
                          projects: 'Proyectos'
                        };

                        return (
                          <div key={key} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-700">{labels[key]}</span>
                              <span className={`text-lg font-bold ${getPerformanceColor(value)}`}>
                                {value}%
                              </span>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className={`h-3 rounded-full transition-all 
                                  ${value >= 80 ? "bg-green-500"
                                  : value >= 60 ? "bg-yellow-500"
                                  : "bg-red-500"}`}
                                style={{ width: `${value}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fortalezas + Áreas de mejora */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* FORTALEZAS */}
                    <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                      <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Fortalezas
                      </h4>

                      <ul className="space-y-2">
                        {selectedStudent.strengths.map((s, i) => (
                          <li key={i} className="text-green-700 flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* ÁREAS DE MEJORA */}
                    <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
                      <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Áreas de Mejora
                      </h4>

                      <ul className="space-y-2">
                        {selectedStudent.improvements.map((imp, i) => (
                          <li key={i} className="text-orange-700 flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            {imp}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
