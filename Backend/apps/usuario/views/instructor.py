from rest_framework import viewsets, permissions
from apps.usuario.models.instructor import Instructor
from apps.usuario.serializers.instructor import InstructorSerializer


class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.select_related("usuario").all()
    serializer_class = InstructorSerializer
    permission_classes = [permissions.IsAuthenticated]
