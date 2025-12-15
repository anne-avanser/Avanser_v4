from rest_framework import serializers
from apps.usuario.models.instructor import Instructor
from apps.usuario.serializers import UsuarioSerializer  


class InstructorSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)  

    class Meta:
        model = Instructor
        fields = [
            "id",
            "usuario",          
            "documento",
            "nombres",
            "apellidos",
            "correo",
            "telefono",
            "estado",
        ]
