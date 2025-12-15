from rest_framework import viewsets, permissions
from apps.ficha.models import Ficha
from apps.ficha.serializers import FichaSerializer


class FichaViewSet(viewsets.ModelViewSet):
    queryset = Ficha.objects.all()
    serializer_class = FichaSerializer
    permission_classes = [permissions.IsAuthenticated]
