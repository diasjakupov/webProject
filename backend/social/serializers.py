from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Post, Comment, Like


class PostSerializer(ModelSerializer):
    created_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    updated_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Post
        fields = ("__all__")

class CommentSerializer(ModelSerializer):
    created_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    updated_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Comment
        fields = ("__all__")


class LikeSerializer(ModelSerializer):
    class Meta:
        model = Like
        fields = ("__all__")