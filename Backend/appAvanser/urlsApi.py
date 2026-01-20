from django.contrib import admin
from django.urls import path
from .viewsPrograma import *
from .viewsFicha import * 
from .viewsUsuario import *
from appAvanser import viewsPrograma, viewsFicha, viewsUsuario
from . import views
from .viewsBienestar import HistorialBienestarView
from .viewsBienestar import NoticiasBienestarView
from .viewsBienestar import DashboardBienestarView
from .viewsBienestar import NotificacionesBienestarView
from .viewsBienestar import PerfilUsuarioView
from .viewsBienestar import ContadorNotificacionesView
from .viewsBienestar import CasosBienestarView, ActualizarEstadoCasoView





urlpatterns = [
    path('programa/', ProgramaFormacionList.as_view()),
    path('programa/<int:pk>/', ProgramaFormacionDetail.as_view()),
    path('ficha/', FichaList.as_view()),
    path('ficha/<int:pk>/', FichaDetail.as_view()),
    path('usuario/', UsuarioList.as_view()),
    path('usuario/<int:pk>', UsuarioDetail.as_view() ),
    path("ping/", views.ping),
    path("bienestar/historial/", HistorialBienestarView.as_view()),
    path("bienestar/noticias/", NoticiasBienestarView.as_view()),
    path("bienestar/dashboard/", DashboardBienestarView.as_view()),
    path("bienestar/notificaciones/", NotificacionesBienestarView.as_view()),
    path("perfil/", PerfilUsuarioView.as_view()),
    path("bienestar/notificaciones/contador/", ContadorNotificacionesView.as_view()),
    path("bienestar/casos/", CasosBienestarView.as_view()),
    path("bienestar/casos/<int:pk>/estado/", ActualizarEstadoCasoView.as_view()),

]
