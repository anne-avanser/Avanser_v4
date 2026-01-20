from django.db import models
from django.contrib.auth.models import User

roles = [
    ('Funcionario','Funcionario'),
    ('Instructor','Instructor'),
    ('Aprendiz','Aprendiz')
]

tipo_pregunta = [
     ('texto','texto'),
    ('opción','opción'),
    ('multiple','multiple'),
     ('escala','escala')
]

tipo_notificacion = [
     ('ENCUESTA','ENCUESTA'),
    ('CASO','CASO'),
    ('AYUDA','AYUDA'),
     ('SISTEMA','SISTEMA')
]

niveles_programa = [
    ('Técnico','Técnico'),
    ('Tecnólogo','Tecnólogo'),
    ('Auxiliar','Auxiliar')
]

niveles_riesgo = [
    ('BAJO','BAJO'),
    ('MEDIO','MEDIO'),
    ('ALTO','ALTO')
]

riesgo_generado_por = [
    ('SISTEMA','SISTEMA'),
    ('INSTRUCTOR','INSTRUCTIR'),
    ('BIENESTAR','BIENESTAR')
]

jornada = [
    ('Mañana','Mañana'),
    ('Tarde','Tarde'),
    ('Noche','Noche')
]

estado_convocatorias=[
     ('BORRADOR','BORRADOR'),
    ('ACTIVA','ACTIVA'),
    ('INACTIVA','INACTIVA'),
    ('CERRADA','CERRADA'),
    ('FINALIZADA','FINALIZADA')
]

estado_postulaciones=[
     ('PENDIENTE','PENDIENTE'),
    ('APROBADO','APROBADO'),
    ('RECHAZADO','RECHAZADO')
]

estado_notificaciones=[
     ('PENDIENTE','PENDIENTE'),
    ('ENVIADA','ENVIADA'),
    ('LEIDA','LEIDA')
]

estado_usuario=[
     ('ACTIVO','ACTIVO'),
    ('INACTIVO','INACTIVO')
    
]

tipo_documento=[
     ('CC','CC'),
    ('TI','TI'),
    ('PASAPORTE','PASAPORTE')    
]

resultadoPostulacion = [
    ('Beneficiado','Beneficiado'),
    ('No Beneficiado','No Beneficiado')
]
# Create your models here.

class ProgramaFormacion(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    nivel = models.CharField(max_length=50,choices=niveles_programa)
    duracion = models.SmallIntegerField()
    modalidad = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre
    
class Ficha(models.Model):
    numero = models.CharField(max_length=20, unique=True)
    jornada =  models.CharField(max_length=50,choices=jornada)
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()
    programa = models.ForeignKey(ProgramaFormacion,on_delete=models.PROTECT)
    
    def __str__(self):
        return f" {self.numero} - {self.programa.nombre}" 
    
class Usuario(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    tipo_documento = models.CharField(max_length=50,choices=tipo_documento)    
    documento = models.CharField(max_length=15, unique=True)
    correo = models.CharField(max_length=50)
    estado = models.CharField(max_length=50,choices=estado_usuario) 
    password=  models.CharField(max_length=60)
    rol = models.CharField(max_length=50,choices=roles) 
    
    def __str__(self):
        return f"{self.nombre} {self.apellido}"
    
class Funcionario(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    cargo = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.usuario}"
    
class Aprendiz(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    ficha = models.CharField(max_length=10)
    programa = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.usuario.nombre} {self.usuario.apellido}"

class Encuesta(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    fecha_inicio  =models.DateTimeField()
    fecha_fin = models.DateTimeField()
    
    def __str__(self):
        return self.titulo
    
class PreguntaEncuesta(models.Model):
    texto = models.TextField()
    encuesta = models.ForeignKey(Encuesta, on_delete=models.PROTECT)
    tipo =  models.CharField(max_length=50,choices=tipo_pregunta) 
    dimension = models.CharField(max_length=50)
    
    def __str__(self):
        return self.texto
    
class RespuestaEncuesta(models.Model):
    pregunta = models.ForeignKey(PreguntaEncuesta, on_delete=models.PROTECT)
    aprendiz = models.ForeignKey(Aprendiz, on_delete=models.PROTECT)
    respuesta = models.TextField()
    valor_numerico = models.FloatField()
    fecha = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.respuesta
    
    
class TipoConvocatoria(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField()
         
    def __str__(self):
        return self.nombre
    
class Convocatoria(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    tipo = models.ForeignKey(TipoConvocatoria, on_delete=models.PROTECT)
    cupos_totales = models.IntegerField()
    fecha_inicio=models.DateTimeField()
    fecha_fin=models.DateTimeField()
    estado=models.CharField(max_length=50,choices=estado_convocatorias)
    documento=models.FileField(upload_to='documentos/',blank=True, null= True)
    
    def __str__(self):
        return self.titulo
    
class Postulacion(models.Model):
    aprendiz = models.ForeignKey(Aprendiz, on_delete=models.PROTECT)
    convocatoria = models.ForeignKey(Convocatoria, on_delete=models.PROTECT)
    fecha_postulacion= models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=50,choices=estado_postulaciones)
    
    def __str__(self):
        return f"{self.aprendiz}-{self.convocatoria}"
    
class ResultadoPostulacion(models.Model):
    postulacion = models.ForeignKey(Postulacion, on_delete=models.PROTECT)    
    observaciones=models.TextField()
    fecha_resultado=models.DateTimeField(auto_now_add=True)
    estado_final = models.CharField(max_length=50,choices=estado_postulaciones)
    
    def __str__(self):
        return f"{self.postulacion.aprendiz}-{self.estado_final}"

class Riesgo(models.Model):
    aprendiz = models.ForeignKey(Aprendiz, on_delete=models.PROTECT)
    nivel = models.CharField(max_length=50,choices=niveles_riesgo)
    fecha = models.DateTimeField(auto_now_add=True)   
    generado_por = models.CharField(max_length=50,choices=riesgo_generado_por)
    
    
    def __str__(self):
        return f"{self.aprendiz}-{self.nivel}"
    

class Notificacion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    mensaje = models.TextField()
    tipo =  models.CharField(max_length=50,choices=tipo_notificacion)
    fecha_envio = models.DateTimeField(auto_now_add=True)  
    estado = models.CharField(max_length=50,choices=estado_notificaciones)
    
    def __str__(self):
        return f"{self.usuario} - {self.mensaje}"
    
    
class TipoCaso(models.Model):
    nombre = models.CharField(max_length=80)
    descripcion = models.TextField()
    
    def __str__(self):
        return self.nombre


class CasoBienestar(models.Model):
    aprendiz = models.CharField(max_length=150)
    ficha = models.CharField(max_length=20)
    riesgo = models.CharField(max_length=50)
    estado = models.CharField(max_length=50)
    evolucion = models.TextField()

    def __str__(self):
        return self.aprendiz


class RegistroCaso(models.Model):
    caso = models.ForeignKey(
        CasoBienestar,
        related_name="registros",
        on_delete=models.CASCADE
    )
    fecha = models.DateField()
    descripcion = models.TextField()

    def __str__(self):
        return f"{self.caso.aprendiz} - {self.fecha}"
    

class NoticiaBienestar(models.Model):
    titulo = models.CharField(max_length=200)
    tipo = models.CharField(max_length=50)  # 
    descripcion = models.TextField()
    informacion = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo


class ArchivoNoticia(models.Model):
    noticia = models.ForeignKey(
        NoticiaBienestar,
        related_name="archivos",
        on_delete=models.CASCADE
    )
    archivo = models.FileField(upload_to="noticias/")


class CasoDashboardBienestar(models.Model):
    aprendiz = models.CharField(max_length=150)
    ficha = models.CharField(max_length=20)
    trimestre = models.CharField(max_length=5)
    programa = models.CharField(max_length=150)
    instructor = models.CharField(max_length=150)

    estado = models.CharField(max_length=50)

    tipo_riesgo = models.CharField(max_length=50)
    nivel_riesgo = models.CharField(max_length=50)

    descripcion_caso = models.TextField()

    ultima_asistencia = models.DateField()

    def __str__(self):
        return self.aprendiz
    
class NotificacionBienestar(models.Model):
    aprendiz = models.CharField(max_length=150)
    ficha = models.CharField(max_length=20)
    programa = models.CharField(max_length=150)

    tipo_riesgo = models.CharField(max_length=50)
    nivel_riesgo = models.CharField(max_length=50)

    estado = models.CharField(max_length=50) 
    descripcion = models.TextField()

    instructor = models.CharField(max_length=150)

    fecha_ingreso = models.DateField(auto_now_add=True)

    correo = models.EmailField()
    telefono = models.CharField(max_length=30)

    def __str__(self):
        return self.aprendiz
    
class PerfilUsuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    cargo = models.CharField(max_length=150)
    rol = models.CharField(max_length=50)

    foto = models.ImageField(
        upload_to="perfiles/",
        null=True,
        blank=True
    )

    def __str__(self):
        return self.user.username
