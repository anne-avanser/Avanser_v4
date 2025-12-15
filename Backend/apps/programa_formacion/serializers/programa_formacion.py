from rest_framework import serializers
from apps.programa_formacion.models import ProgramaFormacion


class ProgramaFormacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramaFormacion
        fields = [
            "id",
            "nombre",
            "nivel",
            "duracion",
            "modalidad",
        ]
