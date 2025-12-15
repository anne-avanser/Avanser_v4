from django.db import models
from apps.ficha.constants import JORNADA_CHOICES
from apps.programa_formacion.models import ProgramaFormacion


class Ficha(models.Model):
    numero = models.CharField(max_length=20, unique=True)
    jornada = models.CharField(max_length=50, choices=JORNADA_CHOICES)
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()
    programa = models.ForeignKey(ProgramaFormacion, on_delete=models.PROTECT)

    def __str__(self):
        return f"{self.numero} - {self.programa.nombre}"
