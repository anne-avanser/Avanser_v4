from django.db import models
from django.contrib.auth.models import AbstractUser
from apps.usuario.constants import TIPO_DOCUMENTO_CHOICES

class Usuario(AbstractUser):
    documento = models.CharField(max_length=20, unique=True)
    tipo_documento = models.CharField(
        max_length=3,
        choices=TIPO_DOCUMENTO_CHOICES,
        default="CC"
    )
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)

    USERNAME_FIELD = "documento"
    REQUIRED_FIELDS = ["nombres", "apellidos", "email"]

    def __str__(self):
        return f"{self.nombres} {self.apellidos} ({self.documento})"
