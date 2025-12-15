from django.http import JsonResponse

def ping(request):
    return JsonResponse({"status": "ok", "mensaje": "Avanser backend activo"})
