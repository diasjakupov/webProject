from rest_framework.serializers import ModelSerializer
from .models import SocialUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class SocialUserSerializer(ModelSerializer):
    class Meta:
        model = SocialUser
        fields = ["id","username", "email", "first_name", "last_name"]



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)

        token['user_id'] = user.id 

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['user_id'] = self.user.id

        return data

