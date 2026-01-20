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


# Create your views here.
from django.http import JsonResponse

def ping(request):
    return JsonResponse({"status": "ok", "mensaje": "Avanser backend activo"})

