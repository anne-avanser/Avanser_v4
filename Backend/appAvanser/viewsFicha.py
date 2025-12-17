from django.shortcuts import render

from rest_framework import generics
from .serializers import FichaSerializer
from .models import Ficha
from rest_framework.decorators import api_view
from rest_framework.response import Response

class FichaList(generics.ListCreateAPIView):
    queryset = Ficha.objects.all()
    serializer_class = FichaSerializer


class FichaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ficha.objects.all()
    serializer_class = FichaSerializer