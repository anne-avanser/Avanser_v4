from django.urls import path
from apps.usuario.views import UsuarioListView, UsuarioRegistroView, UsuarioDetailView

urlpatterns = [
    path("", UsuarioListView.as_view(), name="usuario-list"),
    path("registro/", UsuarioRegistroView.as_view(), name="usuario-registro"),
    path("<str:documento>/", UsuarioDetailView.as_view(), name="usuario-detail"),
]
