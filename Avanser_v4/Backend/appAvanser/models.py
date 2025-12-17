from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models import JSONField


# ENUMS / CHOICES
NIVEL_RIESGO_BAJO = "Bajo"
NIVEL_RIESGO_MEDIO = "Medio"
NIVEL_RIESGO_ALTO = "Alto"
NIVEL_RIESGO_CRITICO = "Crítico"

NIVEL_RIESGO_CHOICES = [
    (NIVEL_RIESGO_BAJO, "Bajo"),
    (NIVEL_RIESGO_MEDIO, "Medio"),
    (NIVEL_RIESGO_ALTO, "Alto"),
    (NIVEL_RIESGO_CRITICO, "Crítico"),
]

class TipoDocumento(models.TextChoices):
    CC = "CC", "Cédula de ciudadanía"
    TI = "TI", "Tarjeta de identidad"
    CE = "CE", "Cédula de extranjería"
    PASAPORTE = "PASAPORTE", "Pasaporte"


class EstadoInstructor(models.TextChoices):
    ACTIVO = "ACTIVO", "Activo"
    INACTIVO = "INACTIVO", "Inactivo"
    SUSPENDIDO = "SUSPENDIDO", "Suspendido"


class NivelPrograma(models.TextChoices):
    TECNICO = "Técnico", "Técnico"
    TECNOLOGO = "Tecnólogo", "Tecnólogo"
    ESPECIALIZACION = "Especialización", "Especialización"


class Jornada(models.TextChoices):
    MANANA = "Mañana", "Mañana"
    TARDE = "Tarde", "Tarde"
    NOCHE = "Noche", "Noche"
    FINES = "FinesDeSemana", "Fines de semana"


class NivelRiesgo(models.TextChoices):
    BAJO = "Bajo", "Bajo"
    MEDIO = "Medio", "Medio"
    ALTO = "Alto", "Alto"
    CRITICO = "Crítico", "Crítico"


class GeneradoPor(models.TextChoices):
    SISTEMA = "SISTEMA", "Sistema"
    INSTRUCTOR = "INSTRUCTOR", "Instructor"
    BIENESTAR = "BIENESTAR", "Bienestar"


class EstadoCaso(models.TextChoices):
    ABIERTO = "ABIERTO", "Abierto"
    EN_PROCESO = "EN_PROCESO", "En proceso"
    CERRADO = "CERRADO", "Cerrado"


# ROL + USUARIO + INSTRUCTOR
class Rol(models.Model):
    nombre_rol = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nombre_rol

class Usuario(AbstractUser):
    username = None  # usaremos documento como login
    documento = models.CharField(max_length=20, unique=True)
    tipo_documento = models.CharField(max_length=12, choices=TipoDocumento.choices, default=TipoDocumento.CC)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    rol = models.ForeignKey("Rol", on_delete=models.PROTECT, null=True, blank=True, related_name="usuarios")

    USERNAME_FIELD = "documento"
    REQUIRED_FIELDS = ["nombres", "apellidos", "email"]

    def __str__(self):
        return f"{self.nombres} {self.apellidos} ({self.documento})"


class Instructor(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="instructor")
    documento = models.CharField(max_length=20, unique=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    estado = models.CharField(max_length=20, choices=EstadoInstructor.choices, default=EstadoInstructor.ACTIVO)

    def __str__(self):
        return f"{self.nombres} {self.apellidos} ({self.documento})"


# PROGRAMA + FICHA + TRIMESTRE + ASIGNACIÓN
class ProgramaFormacion(models.Model):
    nombre = models.CharField(max_length=100)
    nivel = models.CharField(max_length=30, choices=NivelPrograma.choices)
    duracion_meses = models.SmallIntegerField()
    modalidad = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.nombre} ({self.nivel})"


class Ficha(models.Model):
    numero_ficha = models.CharField(max_length=20, unique=True)
    programa = models.ForeignKey(ProgramaFormacion, on_delete=models.PROTECT, related_name="fichas")
    jornada = models.CharField(max_length=20, choices=Jornada.choices)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    lider_ficha = models.ForeignKey(Instructor, on_delete=models.SET_NULL, null=True, blank=True, related_name="fichas_lideradas")

    def __str__(self):
        return self.numero_ficha


class Trimestre(models.Model):
    ficha = models.ForeignKey(Ficha, on_delete=models.CASCADE, related_name="trimestres")
    numero = models.SmallIntegerField()
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()

    class Meta:
        unique_together = ("ficha", "numero")

    def __str__(self):
        return f"{self.ficha.numero_ficha} - T{self.numero}"


class AsignacionInstructorTrimestre(models.Model):
    trimestre = models.ForeignKey(Trimestre, on_delete=models.CASCADE, related_name="asignaciones")
    instructor = models.ForeignKey(Instructor, on_delete=models.PROTECT, related_name="asignaciones")
  

    class Meta:
        unique_together = ("trimestre", "instructor")

    def __str__(self):
        return f"{self.trimestre} - {self.instructor}"


# REPORTES + CASOS + HISTORIAL
class Reporte(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    contenido = models.TextField()
    aprendiz = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reportes")
    generado_por = models.CharField(max_length=20, choices=GeneradoPor.choices)

    # opcional: si lo generó un instructor específico
    instructor = models.ForeignKey(Instructor, on_delete=models.SET_NULL, null=True, blank=True, related_name="reportes_generados")

    def __str__(self):
        return f"Reporte {self.id} - {self.aprendiz}"


class TipoCaso(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre


class Caso(models.Model):
    aprendiz = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="casos")
    ficha = models.ForeignKey(Ficha, on_delete=models.SET_NULL, null=True, blank=True, related_name="casos")
    trimestre = models.ForeignKey(Trimestre, on_delete=models.SET_NULL, null=True, blank=True, related_name="casos")
    tipo_caso = models.ForeignKey(TipoCaso, on_delete=models.SET_NULL, null=True, blank=True, related_name="casos")

    creado_por_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="casos_creados")
    descripcion_inicial = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    estado_actual = models.CharField(max_length=20, choices=EstadoCaso.choices, default=EstadoCaso.ABIERTO)
    riesgo_actual = models.CharField(max_length=10, choices=NivelRiesgo.choices, null=True, blank=True)

    def __str__(self):
        return f"Caso {self.id} - {self.aprendiz}"


class HistorialCaso(models.Model):
    caso = models.ForeignKey(Caso, on_delete=models.CASCADE, related_name="historial")
    fecha = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    estado = models.CharField(max_length=20, choices=EstadoCaso.choices, null=True, blank=True)
    comentario = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Historial {self.id} - Caso {self.caso_id}"

class Encuesta(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()

    # opcional: asociarla a trimestre (recomendado por backlog)
    trimestre = models.ForeignKey("Trimestre", on_delete=models.SET_NULL, null=True, blank=True, related_name="encuestas")

    def __str__(self):
        return self.titulo


class PreguntaEncuesta(models.Model):
    TIPOS = (
        ("texto", "Texto"),
        ("opcion", "Opción única"),
        ("multi", "Selección múltiple"),
        ("escala", "Escala numérica"),
    )

    encuesta = models.ForeignKey(Encuesta, on_delete=models.CASCADE, related_name="preguntas")
    texto = models.TextField()
    tipo = models.CharField(max_length=20, choices=TIPOS)
    dimension = models.CharField(max_length=50, blank=True, null=True)  # economico, emocional, academico...

    def __str__(self):
        return f"[{self.encuesta_id}] {self.texto[:40]}"


class RespuestaEncuesta(models.Model):
    pregunta = models.ForeignKey(PreguntaEncuesta, on_delete=models.CASCADE, related_name="respuestas")
    aprendiz = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="respuestas_encuestas")

    respuesta = models.TextField(blank=True, null=True)
    valor_numerico = models.FloatField(blank=True, null=True)
    fecha_respuesta = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("pregunta", "aprendiz")  # evita doble respuesta a la misma pregunta

    def __str__(self):
        return f"Resp {self.id} - Aprendiz {self.aprendiz_id}"


class CaracterizacionResumen(models.Model):
    aprendiz = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="caracterizaciones")
    ficha = models.ForeignKey("Ficha", on_delete=models.SET_NULL, null=True, blank=True, related_name="caracterizaciones")
    trimestre = models.ForeignKey("Trimestre", on_delete=models.SET_NULL, null=True, blank=True, related_name="caracterizaciones")

    fecha = models.DateTimeField(auto_now_add=True)
    puntaje_global = models.FloatField(null=True, blank=True)
    nivel_riesgo = models.CharField(max_length=10, choices=NIVEL_RIESGO_CHOICES, null=True, blank=True)

    detalle_dimensiones = models.JSONField(default=dict, blank=True)  # {"economico":0.7,"emocional":0.4}

    def __str__(self):
        return f"Caract {self.id} - {self.aprendiz_id} - {self.nivel_riesgo}"


class Riesgo(models.Model):
    GENERADO_POR_CHOICES = (
        ("SISTEMA", "Sistema"),
        ("INSTRUCTOR", "Instructor"),
        ("BIENESTAR", "Bienestar"),
    )

    fecha = models.DateTimeField(auto_now_add=True)
    nivel = models.CharField(max_length=10, choices=NIVEL_RIESGO_CHOICES)
    aprendiz = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="riesgos")
    generado_por = models.CharField(max_length=20, choices=GENERADO_POR_CHOICES)

    def __str__(self):
        return f"Riesgo {self.nivel} - {self.aprendiz_id}"


class Notificacion(models.Model):
    TIPO_CHOICES = (
        ("ENCUESTA", "Encuesta"),
        ("CASO", "Caso"),
        ("AYUDA", "Ayuda"),
        ("SISTEMA", "Sistema"),
    )

    ESTADO_CHOICES = (
        ("PENDIENTE", "Pendiente"),
        ("ENVIADA", "Enviada"),
        ("LEIDA", "Leída"),
    )

    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notificaciones")
    mensaje = models.TextField()
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default="PENDIENTE")
    fecha_envio = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tipo} - {self.usuario_id} - {self.estado}"


