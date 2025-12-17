from rest_framework import serializers
from .models import (
    Usuario, Instructor,
    ProgramaFormacion, Ficha, Trimestre, AsignacionInstructorTrimestre,
    Reporte, TipoCaso, Caso, HistorialCaso, Encuesta, PreguntaEncuesta, RespuestaEncuesta,  CaracterizacionResumen, Riesgo, Notificacion
)

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "documento", "tipo_documento", "nombres", "apellidos", "email", "telefono", "is_active", "is_staff"]


class UsuarioRegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = ["documento", "tipo_documento", "nombres", "apellidos", "email", "telefono", "password"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = Usuario(**validated_data)
        user.set_password(password)
        user.save()
        return user


class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = "__all__"


class ProgramaFormacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramaFormacion
        fields = "__all__"


class FichaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ficha
        fields = "__all__"


class TrimestreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trimestre
        fields = "__all__"

class AsignacionInstructorTrimestreSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignacionInstructorTrimestre
        fields = "__all__"


class ReporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte
        fields = "__all__"


class TipoCasoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCaso
        fields = "__all__"


class CasoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caso
        fields = "__all__"


class HistorialCasoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialCaso
        fields = "__all__"

class PreguntaEncuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreguntaEncuesta
        fields = "__all__"


class EncuestaSerializer(serializers.ModelSerializer):
    preguntas = PreguntaEncuestaSerializer(many=True, read_only=True)

    class Meta:
        model = Encuesta
        fields = "__all__"


class RespuestaEncuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespuestaEncuesta
        fields = "__all__"


class CaracterizacionResumenSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaracterizacionResumen
        fields = "__all__"


class RiesgoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Riesgo
        fields = "__all__"

class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = "__all__"
