from rest_framework.permissions import BasePermission
from .models import Rol, Instructor, Ficha, Trimestre

def _rol(user):
    return getattr(getattr(user, "rol", None), "nombre_rol", None)

class EsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (_rol(request.user) == "ADMIN" or request.user.is_staff)

class EsBienestar(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and _rol(request.user) == "BIENESTAR"

class EsInstructor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and _rol(request.user) == "INSTRUCTOR"

class EsLiderDeFicha(BasePermission):
    """
    Permite si el usuario es instructor y es líder de la ficha asociada al objeto.
    Soporta:
    - FichaViewSet (objeto Ficha)
    - TrimestreViewSet (objeto Trimestre -> ficha)
    - AsignacionInstructorTrimestreViewSet (objeto Asignacion -> trimestre -> ficha)
    """
    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False
        if _rol(request.user) != "INSTRUCTOR":
            return False

        try:
            instructor = Instructor.objects.get(usuario=request.user)
        except Instructor.DoesNotExist:
            return False

        if isinstance(obj, Ficha):
            return obj.lider_ficha_id == instructor.id

        if isinstance(obj, Trimestre):
            return obj.ficha.lider_ficha_id == instructor.id

        # AsignacionInstructorTrimestre
        trimestre = getattr(obj, "trimestre", None)
        if trimestre:
            return trimestre.ficha.lider_ficha_id == instructor.id

        return False

class EsAdminOBienestar(BasePermission): #???
    def has_permission(self, request, view):
        return request.user.is_authenticated and (_rol(request.user) in ["ADMIN", "BIENESTAR"] or request.user.is_staff)

class EsAprendiz(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and _rol(request.user) == "APRENDIZ"

class EsSistemaOAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (_rol(request.user) == "ADMIN" or request.user.is_staff)
