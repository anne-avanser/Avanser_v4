from django.contrib import admin
from apps.ficha.models.ficha import Ficha


@admin.register(Ficha)
class FichaAdmin(admin.ModelAdmin):
    list_display = ("numero", "jornada", "fecha_inicio", "fecha_fin", "programa")
    list_filter = ("jornada", "programa")
    search_fields = ("numero", "programa__nombre")
    ordering = ("fecha_inicio",)
