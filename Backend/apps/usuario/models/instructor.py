from django.db import models
from django.conf import settings
from apps.usuario.constants import ESTADO_CHOICES


class Instructor(models.Model):
    usuario = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="instructor"
    )
    documento = models.CharField(max_length=20, unique=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default="Activo")

    def __str__(self):
        return f"{self.nombres} {self.apellidos} ({self.documento})"
