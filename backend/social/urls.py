from django.urls import path
from .views import PostListView, CommentListView, LikeListView

urlpatterns = [
    path("posts/", PostListView.as_view()),
    path("comments/<int:pk>", CommentListView.as_view()),
    path("likes/<int:pk>", LikeListView.as_view())
]