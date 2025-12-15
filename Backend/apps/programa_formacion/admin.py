from django.contrib import admin
from apps.programa_formacion.models import ProgramaFormacion


@admin.register(ProgramaFormacion)
class ProgramaFormacionAdmin(admin.ModelAdmin):
    list_display = ("nombre", "nivel", "duracion", "modalidad")
    list_filter = ("nivel", "modalidad")
    search_fields = ("nombre",)
    ordering = ("nombre",)
