from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from user.serializers import SocialUserSerializer
from .models import Post, Comment, Like
from user.models import *


class PostSerializer(ModelSerializer):
    author = SocialUserSerializer(read_only=True)
    like_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()
    created_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False)
    updated_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False)

    class Meta:
        model = Post
        fields = "__all__"

    def get_like_count(self, obj):
        return Like.objects.filter(post=obj).count()

    def get_comment_count(self, obj):
        return Comment.objects.filter(post=obj).count()



class CommentSerializer(ModelSerializer):
    created_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    updated_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Comment
        fields = ("__all__")


class LikeSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField()
    post_id = serializers.IntegerField()

    def validate_user_id(self, value):
        if not SocialUser.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'A user with this id does not exist.')
        return value

    def validate_post_id(self, value):
        if not Post.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'A post with this id does not exist.')
        return value

    def create(self, validated_data):
        user_id = validated_data.get('user_id')
        post_id = validated_data.get('post_id')
        user = SocialUser.objects.get(pk=user_id)
        post = Post.objects.get(pk=post_id)
        like = Like.objects.create(user=user, post=post)
        return like
