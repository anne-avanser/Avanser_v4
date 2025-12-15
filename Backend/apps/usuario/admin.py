from django.contrib import admin
from apps.usuario.models import Usuario, Instructor

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ("documento", "nombres", "apellidos", "email", "is_staff", "is_active")
    search_fields = ("documento", "nombres", "apellidos", "email")
    list_filter = ("is_staff", "is_active", "tipo_documento")

class InstructorAdmin(admin.ModelAdmin):
    list_display = (
        "documento",
        "nombres",
        "apellidos",
        "correo",
        "telefono",
        "estado",
        "tipo_vinculacion",
        "fecha_ingreso",
    )
    search_fields = ("documento", "nombres", "apellidos", "correo")
    list_filter = ("estado", "tipo_vinculacion")
    ordering = ("apellidos", "nombres")
