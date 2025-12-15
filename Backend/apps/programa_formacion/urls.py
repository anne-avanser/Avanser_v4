from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.programa_formacion.views import ProgramaFormacionViewSet

router = DefaultRouter()
router.register(r"programas", ProgramaFormacionViewSet, basename="programas")

urlpatterns = [
    path("", include(router.urls)),
]
