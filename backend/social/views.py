from django.shortcuts import get_object_or_404, render
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
    print(1)
    post_id = request.data.get('post_id')

    if not post_id:
        return Response({'post_id': 'post_id required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

    like = Like.objects.filter(user=user, post=post).first()
    if like:
        like.delete()
        return Response({'message': 'Like already exists.'}, status=status.HTTP_409_CONFLICT)

    like = Like.objects.create(user=user, post=post)
    return Response({'liked': True})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def user_post(request):
    if request.method == "POST":
        title = request.data.get("title")
        content = request.data.get("content")
        author_id = request.user
        try:
            Post.objects.create(title = title, content = content, author = author_id)
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            print(request.data)
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_post_update(request, pk):
    
    post = get_object_or_404(Post, id=pk, author=request.data['author'])

    if request.method == "DELETE":
        post.delete()
        return Response({"deleted": True})
    
    if request.method == "PUT":
        serializer = PostSerializer(post, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)