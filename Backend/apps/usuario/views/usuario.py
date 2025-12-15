from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from apps.usuario.models import Usuario
from apps.usuario.serializers import UsuarioSerializer, UsuarioRegistroSerializer


class UsuarioListView(ListAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioRegistroView(CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioRegistroSerializer


class UsuarioDetailView(RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    lookup_field = "documento"