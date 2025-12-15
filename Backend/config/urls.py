from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("usuario/", include("apps.usuario.urls")),
]
