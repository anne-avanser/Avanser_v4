<<<<<<< HEAD
from django.urls import path
from . import views

urlpatterns = [
    path("ping/", views.ping),
=======
from django.contrib import admin
from django.urls import path
from .viewsPrograma import *
from .viewsFicha import * 
from .viewsUsuario import *
from appAvanser import viewsPrograma, viewsFicha, viewsUsuario


urlpatterns = [
    path('programa/', ProgramaFormacionList.as_view()),
    path('programa/<int:pk>/', ProgramaFormacionDetail.as_view()),
    path('ficha/', FichaList.as_view()),
    path('ficha/<int:pk>/', FichaDetail.as_view()),
    path('usuario/', UsuarioList.as_view()),
    path('usuario/<int:pk>', UsuarioDetail.as_view() )
>>>>>>> andres-sarria
]
