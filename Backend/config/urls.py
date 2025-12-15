from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("usuario/", include("apps.usuario.urls")),
    path("api/ficha/", include("apps.ficha.urls")),
    path("api/programa/", include("apps.programa_formacion.urls")),
    
]
