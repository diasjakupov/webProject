from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import PostSerializer, CommentSerializer, LikeSerializer
from .models import Post, Comment, Like
from user.models import *
from rest_framework.response import Response
from rest_framework import status
# Create your views here.



class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(post__pk = self.kwargs.get("pk"))
    
    
class LikeListView(generics.ListAPIView):
    serializer_class = LikeSerializer

    def get_queryset(self):
        return Like.objects.filter(post__pk = self.kwargs.get("pk"))

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def like_post(request):

    user = request.user

    post_id = request.data.get('post_id')

    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

    like = Like.objects.filter(user=user, post=post).first()
    if like:
        like.delete()
        return Response({'message': 'Like already exists.'}, status=status.HTTP_409_CONFLICT)


    serializer = LikeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)