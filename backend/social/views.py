from django.shortcuts import render
from rest_framework import generics
from .serializers import PostSerializer, CommentSerializer, LikeSerializer
from .models import Post, Comment, Like
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