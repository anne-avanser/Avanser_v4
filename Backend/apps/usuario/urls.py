from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.usuario.views import UsuarioListView, UsuarioRegistroView, UsuarioDetailView, InstructorViewSet

router = DefaultRouter()
router.register(r"instructores", InstructorViewSet, basename="instructores")

urlpatterns = [
    path("", UsuarioListView.as_view(), name="usuario-list"),
    path("registro/", UsuarioRegistroView.as_view(), name="usuario-registro"),
    path("<str:documento>/", UsuarioDetailView.as_view(), name="usuario-detail"),
    path("", include(router.urls)),
    
]
