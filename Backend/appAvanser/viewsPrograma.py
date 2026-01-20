from django.shortcuts import render

from rest_framework import generics
from .serializers import ProgramaFormacionSerializer
from .models import ProgramaFormacion
from rest_framework.decorators import api_view
from rest_framework.response import Response

class ProgramaFormacionList(generics.ListCreateAPIView):
    queryset = ProgramaFormacion.objects.all()
    serializer_class = ProgramaFormacionSerializer


class ProgramaFormacionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProgramaFormacion.objects.all()
    serializer_class = ProgramaFormacionSerializer