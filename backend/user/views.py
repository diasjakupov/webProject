from django.db import IntegrityError
from django.shortcuts import render
from rest_framework import generics, mixins
from .models import SocialUser
from .serializers import SocialUserSerializer
from django.contrib.auth import get_user_model
from rest_framework import response, status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

# Create your views here.

class SocialUserListView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = SocialUser.objects.all()
    serializer_class = SocialUserSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    

    def post(request, *args, **kwargs):
        username = request.request.data.get("username")
        password = request.request.data.get("password")
        email = request.request.data.get("email")
        try:
            user = get_user_model().objects.create(username=username, email=email)
            user.set_password(password) 
            user.save()
            return response.Response({"success": "User created successfully"}, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return response.Response({"error_field": e}, status=status.HTTP_400_BAD_REQUEST)
        
    


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
