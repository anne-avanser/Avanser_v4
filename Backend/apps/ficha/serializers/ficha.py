from rest_framework import serializers
from apps.ficha.models import Ficha
from apps.programa_formacion.models import ProgramaFormacion


class ProgramaFormacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramaFormacion
        fields = ["id", "nombre", "nivel"]  


class FichaSerializer(serializers.ModelSerializer):
    programa = ProgramaFormacionSerializer(read_only=True)

    class Meta:
        model = Ficha
        fields = [
            "id",
            "numero",
            "jornada",
            "fecha_inicio",
            "fecha_fin",
            "programa",
        ]
