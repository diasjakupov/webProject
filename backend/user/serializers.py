from rest_framework.serializers import ModelSerializer
from .models import SocialUser


class SocialUserSerializer(ModelSerializer):
    class Meta:
        model = SocialUser
        fields = ["username", "email", "first_name", "last_name"]