from django.urls import path
from .views import SocialUserListView

urlpatterns = [
    path("all/", SocialUserListView.as_view())
]