from rest_framework import serializers
from .models import CasoBienestar, RegistroCaso
from .models import *
from .models import NoticiaBienestar, ArchivoNoticia
from .models import CasoDashboardBienestar
from .models import NotificacionBienestar
from .models import PerfilUsuario
from rest_framework import serializers
from .models import CasoBienestar



class ProgramaFormacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramaFormacion
        fields = '__all__'
        
class FichaSerializer(serializers.ModelSerializer):
    programa = serializers.PrimaryKeyRelatedField(queryset=ProgramaFormacion.objects.all())
    
    class Meta:
        model = Ficha
        fields = '__all__'
        depth = 2


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'


class FuncionarioSerializer(serializers.ModelSerializer):
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())
    
    class Meta:
        model = Funcionario
        fields = '__all__'


class AprendizSerializer(serializers.ModelSerializer):
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())
    
    class Meta:
        model = Aprendiz
        fields = '__all__'


class EncuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encuesta
        fields = '__all__'


class PreguntaEncuestaSerializer(serializers.ModelSerializer):
    encuesta = serializers.PrimaryKeyRelatedField(queryset=Encuesta.objects.all())
    
    class Meta:
        model = PreguntaEncuesta
        fields = '__all__'


class RespuestaEncuestaSerializer(serializers.ModelSerializer):
    pregunta = serializers.PrimaryKeyRelatedField(queryset=PreguntaEncuesta.objects.all())
    aprendiz = serializers.PrimaryKeyRelatedField(queryset=Aprendiz.objects.all())
    
    class Meta:
        model = RespuestaEncuesta
        fields = '__all__'


class TipoConvocatoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoConvocatoria
        fields = '__all__'


class ConvocatoriaSerializer(serializers.ModelSerializer):
    tipo = serializers.PrimaryKeyRelatedField(queryset=TipoConvocatoria.objects.all())
    
    class Meta:
        model = Convocatoria
        fields = '__all__'


class PostulacionSerializer(serializers.ModelSerializer):
    aprendiz = serializers.PrimaryKeyRelatedField(queryset=Aprendiz.objects.all())
    convocatoria = serializers.PrimaryKeyRelatedField(queryset=Convocatoria.objects.all())
    
    class Meta:
        model = Postulacion
        fields = '__all__'


class ResultadoPostulacionSerializer(serializers.ModelSerializer):
    postulacion = serializers.PrimaryKeyRelatedField(queryset=Postulacion.objects.all())
    
    class Meta:
        model = ResultadoPostulacion
        fields = '__all__'


class RiesgoSerializer(serializers.ModelSerializer):
    aprendiz = serializers.PrimaryKeyRelatedField(queryset=Aprendiz.objects.all())
    
    class Meta:
        model = Riesgo
        fields = '__all__'


class NotificacionSerializer(serializers.ModelSerializer):
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())
    
    class Meta:
        model = Notificacion
        fields = '__all__'


class TipoCasoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCaso
        fields = '__all__'



class RegistroCasoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroCaso
        fields = ["fecha", "descripcion"]


class CasoBienestarSerializer(serializers.ModelSerializer):
    registros = RegistroCasoSerializer(many=True, read_only=True)

    class Meta:
        model = CasoBienestar
        fields = [
            "id",
            "aprendiz",
            "ficha",
            "riesgo",
            "estado",
            "evolucion",
            "registros"
        ]

class ArchivoNoticiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchivoNoticia
        fields = ["id", "archivo"]


class NoticiaBienestarSerializer(serializers.ModelSerializer):
    archivos = ArchivoNoticiaSerializer(many=True, read_only=True)

    class Meta:
        model = NoticiaBienestar
        fields = [
            "id",
            "titulo",
            "tipo",
            "descripcion",
            "informacion",
            "fecha",
            "archivos"
        ]

class DashboardBienestarSerializer(serializers.ModelSerializer):
    class Meta:
        model = CasoDashboardBienestar
        fields = "__all__"

class NotificacionBienestarSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificacionBienestar
        fields = "__all__"

class PerfilUsuarioSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source="user.get_full_name")
    correo = serializers.EmailField(source="user.email")

    class Meta:
        model = PerfilUsuario
        fields = [
            "nombre",
            "correo",
            "cargo",
            "rol",
            "foto"
        ]

class CasoBienestarSerializer(serializers.ModelSerializer):
    class Meta:
        model = CasoBienestar
        fields = "__all__"
