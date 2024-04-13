from django.shortcuts import render
from rest_framework import generics
from .models import SocialUser
from .serializers import SocialUserSerializer

# Create your views here.

class SocialUserListView(generics.ListAPIView):
    queryset = SocialUser.objects.all()
    serializer_class = SocialUserSerializer

