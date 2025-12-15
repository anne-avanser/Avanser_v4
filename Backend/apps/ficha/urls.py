from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.ficha.views import FichaViewSet

router = DefaultRouter()
router.register(r"fichas", FichaViewSet, basename="fichas")

urlpatterns = [
    path("", include(router.urls)),
]
