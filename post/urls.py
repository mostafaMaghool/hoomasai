from django.urls import path
from .views import HomeView, PostNewView, PostDetailView, PostUpdateView,PostDeleteView,BlogView,user_panel,Prompts
from . import views

urlpatterns = [
    path('gardoon', views.Blog, name='gardoon'),
    path('AdminPanel', views.AdminPanel, name='admin_panel'),
    path('UserPanel', views.user_panel, name='user_panel'),
    path('blog', BlogView.as_view(), name='blog'),
    path('prompts', views.Prompts, name='prompts'),
    path('', HomeView.as_view(),name='home'),
    path('post/new/',PostNewView.as_view(),name='newpost'),
    path('post/<int:pk>', PostDetailView.as_view(),name='post_detail'),
    path('post/update/<int:pk>', PostUpdateView.as_view(),name='update'),
    path('post/delete/<int:pk>', PostDeleteView.as_view(),name='delete')
]
