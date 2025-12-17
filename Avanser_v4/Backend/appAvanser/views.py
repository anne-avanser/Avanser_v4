from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets, permissions, status
from rest_framework.exceptions import PermissionDenied
from .permissions import EsAdmin, EsBienestar, EsInstructor, EsAdminOBienestar, EsAprendiz, EsSistemaOAdmin #, EsLiderDeFicha
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse

from django.db import transaction

from .utils_importacion import leer_csv
from datetime import date

from .models import (
    Rol, Usuario, Instructor,
    ProgramaFormacion, Ficha, Trimestre, AsignacionInstructorTrimestre,
    Reporte, TipoCaso, Caso, HistorialCaso, Encuesta, PreguntaEncuesta, RespuestaEncuesta, CaracterizacionResumen, Riesgo, Notificacion



)
from .serializers import (
    UsuarioSerializer, UsuarioRegistroSerializer,
    InstructorSerializer,
    ProgramaFormacionSerializer, FichaSerializer, TrimestreSerializer, AsignacionInstructorTrimestreSerializer,
    ReporteSerializer, TipoCasoSerializer, CasoSerializer, HistorialCasoSerializer, EncuestaSerializer, PreguntaEncuestaSerializer, RespuestaEncuestaSerializer,
    CaracterizacionResumenSerializer, RiesgoSerializer, NotificacionSerializer

)

def ping(request):
    return JsonResponse({"status": "ok", "mensaje": "Avanser backend activo"})


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]


class UsuarioRegistroViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioRegistroSerializer
    permission_classes = [permissions.AllowAny]


class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.select_related("usuario").all()
    serializer_class = InstructorSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProgramaFormacionViewSet(viewsets.ModelViewSet):
    queryset = ProgramaFormacion.objects.all()
    serializer_class = ProgramaFormacionSerializer
    permission_classes = [EsAdmin]


class FichaViewSet(viewsets.ModelViewSet):
    queryset = Ficha.objects.select_related("programa", "lider_ficha").all()
    serializer_class = FichaSerializer
    permission_classes = [EsAdmin | EsInstructor]

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_staff:
            return qs

        rol = getattr(getattr(self.request.user, "rol", None), "nombre_rol", None)
        if rol == "ADMIN":
            return qs

        if rol == "INSTRUCTOR":
            try:
                inst = Instructor.objects.get(usuario=self.request.user)
            except Instructor.DoesNotExist:
                return qs.none()
            return qs.filter(lider_ficha=inst)

        return qs.none()

    @action(detail=False, methods=["get"], url_path="mis-fichas")
    def mis_fichas(self, request):
        """
        GET /api/fichas/mis-fichas/
        """
        return Response(self.get_serializer(self.get_queryset(), many=True).data, status=status.HTTP_200_OK)



class TrimestreViewSet(viewsets.ModelViewSet):
    queryset = Trimestre.objects.select_related("ficha").all()
    serializer_class = TrimestreSerializer
    permission_classes = [EsAdmin | EsInstructor]

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_staff:
            return qs

        rol = getattr(getattr(self.request.user, "rol", None), "nombre_rol", None)
        if rol == "ADMIN":
            return qs

        if rol == "INSTRUCTOR":
            try:
                inst = Instructor.objects.get(usuario=self.request.user)
            except Instructor.DoesNotExist:
                return qs.none()
            return qs.filter(ficha__lider_ficha=inst)

        return qs.none()

    def perform_create(self, serializer):
        if self.request.user.is_staff:
            serializer.save()
            return

        rol = getattr(getattr(self.request.user, "rol", None), "nombre_rol", None)
        if rol == "ADMIN":
            serializer.save()
            return

        # INSTRUCTOR: solo si es líder de la ficha
        try:
            inst = Instructor.objects.get(usuario=self.request.user)
        except Instructor.DoesNotExist:
            raise PermissionDenied("No tienes perfil Instructor.")

        ficha = serializer.validated_data.get("ficha")
        if not ficha or ficha.lider_ficha_id != inst.id:
            raise PermissionDenied("Solo el líder de la ficha puede crear trimestres de esa ficha.")

        serializer.save()


class AsignacionInstructorTrimestreViewSet(viewsets.ModelViewSet):
    queryset = AsignacionInstructorTrimestre.objects.select_related(
        "trimestre", "instructor", "trimestre__ficha"
    ).all()
    serializer_class = AsignacionInstructorTrimestreSerializer
    permission_classes = [EsAdmin | EsInstructor]

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_staff:
            return qs

        rol = getattr(getattr(self.request.user, "rol", None), "nombre_rol", None)
        if rol == "ADMIN":
            return qs

        if rol == "INSTRUCTOR":
            try:
                inst = Instructor.objects.get(usuario=self.request.user)
            except Instructor.DoesNotExist:
                return qs.none()
            return qs.filter(trimestre__ficha__lider_ficha=inst)

        return qs.none()

    def perform_create(self, serializer):
        if self.request.user.is_staff:
            serializer.save()
            return

        rol = getattr(getattr(self.request.user, "rol", None), "nombre_rol", None)
        if rol == "ADMIN":
            serializer.save()
            return

        # INSTRUCTOR: solo si es líder de la ficha del trimestre
        try:
            inst = Instructor.objects.get(usuario=self.request.user)
        except Instructor.DoesNotExist:
            raise PermissionDenied("No tienes perfil Instructor.")

        trimestre = serializer.validated_data.get("trimestre")
        if not trimestre or trimestre.ficha.lider_ficha_id != inst.id:
            raise PermissionDenied("Solo el líder de la ficha puede asignar instructores en este trimestre.")

        serializer.save()


class ReporteViewSet(viewsets.ModelViewSet):
    queryset = Reporte.objects.select_related("aprendiz", "instructor").all()
    serializer_class = ReporteSerializer
    permission_classes = [EsInstructor]


class TipoCasoViewSet(viewsets.ModelViewSet):
    queryset = TipoCaso.objects.all()
    serializer_class = TipoCasoSerializer
    permission_classes = [EsBienestar]


class CasoViewSet(viewsets.ModelViewSet):
    queryset = Caso.objects.select_related("aprendiz", "ficha", "trimestre", "tipo_caso", "creado_por_usuario").all()
    serializer_class = CasoSerializer
    permission_classes = [EsBienestar]
    
    def perform_create(self, serializer):
        caso = serializer.save()

        # Notificar a usuarios de Bienestar
        usuarios_bienestar = Usuario.objects.filter(rol__nombre_rol="BIENESTAR")
        mensaje = f"Nuevo caso creado para aprendiz {caso.aprendiz_id}. Estado: {caso.estado_actual}"

        Notificacion.objects.bulk_create([
            Notificacion(usuario=u, mensaje=mensaje, tipo="CASO")
            for u in usuarios_bienestar
        ])


class HistorialCasoViewSet(viewsets.ModelViewSet):
    queryset = HistorialCaso.objects.select_related("caso", "usuario").all()
    serializer_class = HistorialCasoSerializer
    permission_classes = [EsBienestar]

class ImportacionViewSet(viewsets.ViewSet):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [EsAdmin | EsInstructor]

    def _rol(self, user):
        return getattr(getattr(user, "rol", None), "nombre_rol", None)

    @action(detail=False, methods=["post"], url_path="aprendices")
    def importar_aprendices(self, request):
        """
        CSV:
        documento,tipo_documento,nombres,apellidos,email,telefono
        """
        file = request.FILES.get("file")
        if not file:
            return Response({"error": "Archivo requerido"}, status=400)

        filas, columnas = leer_csv(file)
        requeridas = ["documento", "nombres", "apellidos", "email"]
        faltantes = [c for c in requeridas if c not in columnas]
        if faltantes:
            return Response({"error": f"Faltan columnas: {faltantes}"}, status=400)

        rol_aprendiz, _ = Rol.objects.get_or_create(nombre_rol="APRENDIZ")

        creados, actualizados, rechazados = 0, 0, []

      

        with transaction.atomic():
            for i, fila in enumerate(filas, start=2):
                doc = fila.get("documento", "").strip()
                email = fila.get("email", "").strip().lower()

                if not doc or not email:
                    rechazados.append({"fila": i, "error": "documento/email vacío"})
                    continue

                obj, creado = Usuario.objects.get_or_create(
                    documento=doc,
                    defaults={
                        "tipo_documento": fila.get("tipo_documento", "CC"),
                        "nombres": fila.get("nombres", ""),
                        "apellidos": fila.get("apellidos", ""),
                        "email": email,
                        "telefono": fila.get("telefono"),
                        "rol": rol_aprendiz,
                    }
                )

                if creado:
                    obj.set_password(doc)
                    obj.save()
                    creados += 1
                else:
                    obj.nombres = fila.get("nombres", obj.nombres)
                    obj.apellidos = fila.get("apellidos", obj.apellidos)
                    obj.email = email
                    obj.telefono = fila.get("telefono", obj.telefono)
                    if not obj.rol:
                        obj.rol = rol_aprendiz
                    obj.save()
                    actualizados += 1

        return Response({
            "creados": creados,
            "actualizados": actualizados,
            "rechazados": rechazados,
        })

    @action(detail=False, methods=["post"], url_path="instructores")
    def importar_instructores(self, request):
        """
        CSV:
        documento,nombres,apellidos,correo,telefono,estado
        """
        file = request.FILES.get("file")
        if not file:
            return Response({"error": "Archivo requerido"}, status=400)

        filas, columnas = leer_csv(file)
        requeridas = ["documento", "nombres", "apellidos", "correo"]
        faltantes = [c for c in requeridas if c not in columnas]
        if faltantes:
            return Response({"error": f"Faltan columnas: {faltantes}"}, status=400)

        rol_instructor, _ = Rol.objects.get_or_create(nombre_rol="INSTRUCTOR")

        creados, actualizados, rechazados = 0, 0, []

      

        with transaction.atomic():
            for i, fila in enumerate(filas, start=2):
                doc = fila.get("documento", "").strip()
                correo = fila.get("correo", "").strip().lower()

                if not doc or not correo:
                    rechazados.append({"fila": i, "error": "documento/correo vacío"})
                    continue

                usuario, _ = Usuario.objects.get_or_create(
                    documento=doc,
                    defaults={
                        "nombres": fila.get("nombres", ""),
                        "apellidos": fila.get("apellidos", ""),
                        "email": correo,
                        "rol": rol_instructor,
                    }
                )
                if not usuario.pk:
                    usuario.set_password(doc)
                    usuario.save()

                inst, creado = Instructor.objects.get_or_create(
                    usuario=usuario,
                    defaults={
                        "documento": doc,
                        "nombres": fila.get("nombres", ""),
                        "apellidos": fila.get("apellidos", ""),
                        "correo": correo,
                        "telefono": fila.get("telefono"),
                        "estado": fila.get("estado", "ACTIVO"),
                    }
                )

                if creado:
                    creados += 1
                else:
                    inst.telefono = fila.get("telefono", inst.telefono)
                    inst.estado = fila.get("estado", inst.estado)
                    inst.save()
                    actualizados += 1

        return Response({
            "creados": creados,
            "actualizados": actualizados,
            "rechazados": rechazados,
        })



class EncuestaViewSet(viewsets.ModelViewSet):
    queryset = Encuesta.objects.all().order_by("-fecha_inicio")
    serializer_class = EncuestaSerializer
    permission_classes = [EsAdminOBienestar]
    
    def perform_create(self, serializer):
        encuesta = serializer.save()

        # Notificar a aprendices (MVP: todos)
        aprendices = Usuario.objects.filter(rol__nombre_rol="APRENDIZ")
        mensaje = f"Nueva encuesta disponible: {encuesta.titulo}"

        Notificacion.objects.bulk_create([
            Notificacion(usuario=a, mensaje=mensaje, tipo="ENCUESTA")
            for a in aprendices
        ])

    @action(detail=False, methods=["get"], url_path="activas")
    def activas(self, request):
        """
        GET /api/encuestas/activas/
        Devuelve encuestas activas hoy.
        (Luego filtramos por trimestre del aprendiz)
        """
        hoy = date.today()
        qs = Encuesta.objects.filter(fecha_inicio__lte=hoy, fecha_fin__gte=hoy).order_by("-fecha_inicio")
        return Response(self.get_serializer(qs, many=True).data, status=status.HTTP_200_OK)


class PreguntaEncuestaViewSet(viewsets.ModelViewSet):
    queryset = PreguntaEncuesta.objects.select_related("encuesta").all()
    serializer_class = PreguntaEncuestaSerializer
    permission_classes = [EsAdminOBienestar]


class RespuestaEncuestaViewSet(viewsets.ModelViewSet):
    queryset = RespuestaEncuesta.objects.select_related("pregunta", "aprendiz", "pregunta__encuesta").all()
    serializer_class = RespuestaEncuestaSerializer
    permission_classes = [EsAprendiz | EsAdminOBienestar]  # bienestar/admin pueden ver; aprendiz responde

    def perform_create(self, serializer):
        """
        Si el que responde es aprendiz, se obliga a usar request.user.
        """
        rol = getattr(getattr(self.request.user, "rol", None), "nombre_rol", None)
        if rol == "APRENDIZ":
            serializer.save(aprendiz=self.request.user)
        else:
            serializer.save()
            

class CaracterizacionResumenViewSet(viewsets.ModelViewSet):
    queryset = CaracterizacionResumen.objects.select_related("aprendiz", "ficha", "trimestre").all().order_by("-fecha")
    serializer_class = CaracterizacionResumenSerializer
    permission_classes = [EsAdmin | EsBienestar]  # ver/gestionar por ahora


class RiesgoViewSet(viewsets.ModelViewSet):
    queryset = Riesgo.objects.select_related("aprendiz").all().order_by("-fecha")
    serializer_class = RiesgoSerializer
    permission_classes = [EsAdmin | EsBienestar]  # por ahora

class AnalisisViewSet(viewsets.ViewSet):
    """
    Endpoint puente para Pandas/ML.
    Por ahora: reglas simples (placeholder).
    Luego: Pandas -> features -> ML -> guardar.
    """
    permission_classes = [EsSistemaOAdmin]

    @action(detail=False, methods=["post"], url_path="procesar-caracterizacion")
    def procesar_caracterizacion(self, request):
        """
        POST /api/analisis/procesar-caracterizacion/
        body: { "aprendiz_id": 1, "trimestre_id": 2, "ficha_id": 3 }
        """
        aprendiz_id = request.data.get("aprendiz_id")
        trimestre_id = request.data.get("trimestre_id")
        ficha_id = request.data.get("ficha_id")

        if not aprendiz_id:
            return Response({"error": "aprendiz_id es requerido"}, status=400)

        # 1) Placeholder: puntaje simple por cantidad de respuestas
        total_respuestas = RespuestaEncuesta.objects.filter(aprendiz_id=aprendiz_id).count()

        # 2) Regla simple de nivel
        if total_respuestas < 3:
            nivel = "Crítico"
            puntaje = 0.9
        elif total_respuestas < 6:
            nivel = "Alto"
            puntaje = 0.7
        elif total_respuestas < 10:
            nivel = "Medio"
            puntaje = 0.4
        else:
            nivel = "Bajo"
            puntaje = 0.2

        # 3) detalle dimensiones placeholder
        detalle = {"economico": puntaje, "emocional": puntaje, "academico": puntaje}

        # 4) Guardar resumen
        resumen = CaracterizacionResumen.objects.create(
            aprendiz_id=aprendiz_id,
            ficha_id=ficha_id,
            trimestre_id=trimestre_id,
            puntaje_global=puntaje,
            nivel_riesgo=nivel,
            detalle_dimensiones=detalle,
        )

        # 5) Guardar riesgo histórico
        Riesgo.objects.create(
            aprendiz_id=aprendiz_id,
            nivel=nivel,
            generado_por="SISTEMA",
        )

        return Response({
            "mensaje": "Caracterización procesada y riesgo guardado.",
            "resumen_id": resumen.id,
            "nivel": nivel,
            "puntaje": puntaje
        }, status=200)

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.select_related("usuario").all().order_by("-fecha_envio")
    serializer_class = NotificacionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # por ahora:
        # cada usuario ve solo las suyas
        return super().get_queryset().filter(usuario=self.request.user)

    @action(detail=False, methods=["get"], url_path="mias")
    def mias(self, request):
        qs = self.get_queryset()
        return Response(self.get_serializer(qs, many=True).data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"], url_path="marcar-leida")
    def marcar_leida(self, request, pk=None):
        obj = self.get_object()
        obj.estado = "LEIDA"
        obj.save(update_fields=["estado"])
        return Response({"mensaje": "Notificación marcada como leída."}, status=status.HTTP_200_OK)
