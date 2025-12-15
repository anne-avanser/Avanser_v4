from django.contrib import admin
from .models import Usuario

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ("documento", "nombres", "apellidos", "email", "is_staff", "is_active")
    search_fields = ("documento", "nombres", "apellidos", "email")
    list_filter = ("is_staff", "is_active", "tipo_documento")
