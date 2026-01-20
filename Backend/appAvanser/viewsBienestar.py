from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from .models import (
    CasoBienestar,
    NoticiaBienestar,
    ArchivoNoticia,
    CasoDashboardBienestar,
    NotificacionBienestar,
    PerfilUsuario
)

from .serializers import (
    CasoBienestarSerializer,
    NoticiaBienestarSerializer,
    DashboardBienestarSerializer,
    NotificacionBienestarSerializer,
    PerfilUsuarioSerializer
)


# =========================
# HISTORIAL DE CASOS
# =========================
class HistorialBienestarView(APIView):

    def get(self, request):
        casos = CasoBienestar.objects.all().order_by("-id")
        serializer = CasoBienestarSerializer(casos, many=True)
        return Response(serializer.data)


# =========================
# CASOS DE BIENESTAR
# =========================
class CasosBienestarView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        casos = CasoBienestar.objects.all().order_by("-id")
        serializer = CasoBienestarSerializer(casos, many=True)
        return Response(serializer.data)


# =========================
# ACTUALIZAR ESTADO DEL CASO
# =========================
class ActualizarEstadoCasoView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        caso = CasoBienestar.objects.get(id=pk)
        caso.estado = request.data.get("estado")
        caso.save()

        return Response({
            "mensaje": "Estado actualizado correctamente"
        })


# =========================
# NOTICIAS DE BIENESTAR
# =========================
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

        for archivo in request.FILES.getlist("archivos"):
            ArchivoNoticia.objects.create(
                noticia=noticia,
                archivo=archivo
            )

        serializer = NoticiaBienestarSerializer(noticia)
        return Response(serializer.data)


# =========================
# DASHBOARD BIENESTAR
# =========================
class DashboardBienestarView(APIView):

    def get(self, request):
        casos = CasoDashboardBienestar.objects.all()
        serializer = DashboardBienestarSerializer(casos, many=True)
        return Response(serializer.data)


# =========================
# NOTIFICACIONES
# =========================
class NotificacionesBienestarView(APIView):

    def get(self, request):
        notificaciones = NotificacionBienestar.objects.all().order_by("-fecha_ingreso")
        serializer = NotificacionBienestarSerializer(notificaciones, many=True)
        return Response(serializer.data)


# =========================
# CONTADOR NOTIFICACIONES
# =========================
class ContadorNotificacionesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total = NotificacionBienestar.objects.filter(
            estado="Nuevo"
        ).count()

        return Response({
            "nuevas": total
        })


# =========================
# PERFIL USUARIO
# =========================
class PerfilUsuarioView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        perfil = PerfilUsuario.objects.get(user=request.user)
        serializer = PerfilUsuarioSerializer(perfil)
        return Response(serializer.data)
