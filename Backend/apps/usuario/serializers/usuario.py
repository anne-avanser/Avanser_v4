from rest_framework import serializers
from apps.usuario.models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    """Serializer para listar y mostrar usuarios"""

    class Meta:
        model = Usuario
        fields = [
            "documento",
            "tipo_documento",
            "nombres",
            "apellidos",
            "email",
            "is_active",
            "is_staff",
        ]


class UsuarioRegistroSerializer(serializers.ModelSerializer):
    """Serializer para registrar usuarios (maneja contraseña encriptada)"""

    password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = [
            "documento",
            "tipo_documento",
            "nombres",
            "apellidos",
            "email",
            "password",
        ]

    def create(self, validated_data):
        usuario = Usuario(
            documento=validated_data["documento"],
            tipo_documento=validated_data.get("tipo_documento", "CC"),
            nombres=validated_data["nombres"],
            apellidos=validated_data["apellidos"],
            email=validated_data["email"],
        )
        usuario.set_password(validated_data["password"])
        usuario.save()
        return usuario
