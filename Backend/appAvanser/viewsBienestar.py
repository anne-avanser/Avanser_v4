from django.shortcuts import render
from .models import CasoBienestar
from .serializers import CasoBienestarSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import NoticiaBienestar, ArchivoNoticia
from .serializers import NoticiaBienestarSerializer
from .serializers import DashboardBienestarSerializer
from .models import CasoDashboardBienestar
from .models import NotificacionBienestar
from .serializers import NotificacionBienestarSerializer
from .serializers import PerfilUsuarioSerializer
from .models import PerfilUsuario
from rest_framework.permissions import IsAuthenticated
from .models import CasoBienestar
from .serializers import CasoBienestarSerializer   

class HistorialBienestarView(APIView):

    def get(self, request):
        casos = CasoBienestar.objects.all()
        serializer = CasoBienestarSerializer(casos, many=True)
        return Response(serializer.data)

class NoticiasBienestarView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        noticias = NoticiaBienestar.objects.all().order_by("-fecha")
        serializer = NoticiaBienestarSerializer(noticias, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data

        noticia = NoticiaBienestar.objects.create(
            titulo=data.get("titulo"),
            tipo=data.get("tipo"),
            descripcion=data.get("descripcion"),
            informacion=data.get("informacion"),
        )

        for file in request.FILES.getlist("archivos"):
            ArchivoNoticia.objects.create(
                noticia=noticia,
                archivo=file
            )

        serializer = NoticiaBienestarSerializer(noticia)
        return Response(serializer.data)
    
class DashboardBienestarView(APIView):

    def get(self, request):
        casos = CasoDashboardBienestar.objects.all()
        serializer = DashboardBienestarSerializer(casos, many=True)
        return Response(serializer.data)
    
class NotificacionesBienestarView(APIView):

    def get(self, request):
        casos = NotificacionBienestar.objects.all().order_by("-fecha_ingreso")
        serializer = NotificacionBienestarSerializer(casos, many=True)
        return Response(serializer.data)
    
class PerfilUsuarioView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        perfil = PerfilUsuario.objects.get(user=request.user)
        serializer = PerfilUsuarioSerializer(perfil)
        return Response(serializer.data)
    
class ContadorNotificacionesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total = NotificacionBienestar.objects.filter(
            estado="Nuevo"
        ).count()

        return Response({
            "nuevas": total
        })
class CasosBienestarView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        casos = CasoBienestar.objects.all().order_by("-id")
        serializer = CasoBienestarSerializer(casos, many=True)
        return Response(serializer.data)


class ActualizarEstadoCasoView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        caso = CasoBienestar.objects.get(id=pk)
        caso.estado = request.data.get("estado")
        caso.save()
        return Response({"mensaje": "Estado actualizado"})