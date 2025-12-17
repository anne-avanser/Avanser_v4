from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"usuarios", views.UsuarioViewSet, basename="usuarios")
router.register(r"registro", views.UsuarioRegistroViewSet, basename="registro")
router.register(r"instructores", views.InstructorViewSet, basename="instructores")

router.register(r"programas", views.ProgramaFormacionViewSet, basename="programas")
router.register(r"fichas", views.FichaViewSet, basename="fichas")
router.register(r"trimestres", views.TrimestreViewSet, basename="trimestres")
router.register(r"asignaciones", views.AsignacionInstructorTrimestreViewSet, basename="asignaciones")

router.register(r"reportes", views.ReporteViewSet, basename="reportes")
router.register(r"tipos-caso", views.TipoCasoViewSet, basename="tipos-caso")
router.register(r"casos", views.CasoViewSet, basename="casos")
router.register(r"historial-caso", views.HistorialCasoViewSet, basename="historial-caso")
router.register(r"importar", views.ImportacionViewSet, basename="importar")
router.register(r"encuestas", views.EncuestaViewSet, basename="encuestas")
router.register(r"preguntas", views.PreguntaEncuestaViewSet, basename="preguntas")
router.register(r"respuestas", views.RespuestaEncuestaViewSet, basename="respuestas")
router.register(r"caracterizacion", views.CaracterizacionResumenViewSet, basename="caracterizacion")
router.register(r"riesgos", views.RiesgoViewSet, basename="riesgos")
router.register(r"analisis", views.AnalisisViewSet, basename="analisis")
router.register(r"notificaciones", views.NotificacionViewSet, basename="notificaciones")


urlpatterns = [
    path("ping/", views.ping),
    path("", include(router.urls)),
]
