from django.db import models
from django.contrib.auth.models import AbstractUser
from apps.programa_formacion.constants import NIVELES_PROGRAMA_CHOICES

class ProgramaFormacion(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    nivel = models.CharField(max_length=50,choices=NIVELES_PROGRAMA_CHOICES)
    duracion = models.SmallIntegerField()
    modalidad = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre
