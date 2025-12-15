from rest_framework import viewsets, permissions
from apps.programa_formacion.models import ProgramaFormacion
from apps.programa_formacion.serializers import ProgramaFormacionSerializer


class ProgramaFormacionViewSet(viewsets.ModelViewSet):
    queryset = ProgramaFormacion.objects.all()
    serializer_class = ProgramaFormacionSerializer
    permission_classes = [permissions.IsAuthenticated]
