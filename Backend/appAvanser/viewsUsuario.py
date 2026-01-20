from django.shortcuts import render
import random 
import string
import threading
from django.core.mail import EmailMessage
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from .serializers import UsuarioSerializer
from .models import Usuario
from rest_framework.decorators import api_view
from rest_framework.response import Response

def generar_password(longitud=10):
    caracteres = string.ascii_letters + string.digits
    return ''.join(random.choice(caracteres) for _ in range(longitud))

def enviarCorreo(asunto, mensaje, destinatarios, adjunto=None):
    correo = EmailMessage(
        subject=asunto,
        body=mensaje,
        to=destinatarios
    )
    correo.content_subtype = "html"  # Para que se interprete como HTML
    if adjunto:
        correo.attach_file(adjunto)
    correo.send()

class UsuarioList(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]
    
def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.perform_create(serializer)
            usuario = serializer.instance

            password_generado = generar_password()
            usuario.set_password(password_generado)
            usuario.save()

            asunto = "Credenciales de acceso al sistema"
            mensaje_correo = f"""
            <b>Hola {usuario.first_name} {usuario.last_name}</b>, usted ha sido registrado en el sistema.<br><br>
            Sus credenciales de acceso son:<br>
            Usuario: <b>{usuario.username}</b><br>
            Clave: <b>{password_generado}</b><br>
            URL del sistema: http://127.0.0.1:8000
            """

            thread = threading.Thread(
                target=enviarCorreo,
                args=(asunto, mensaje_correo, [usuario.email], None)
            )
            thread.start()

            return Response(
                {'mensaje': 'Usuario creado correctamente', 'data': serializer.data},
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {'mensaje': 'Error al guardar el registro', 'errores': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )
            
    
class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer