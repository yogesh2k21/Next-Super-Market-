from django import views
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home,name='home'),
    path('banner', views.banner,name='banner'),
    path('checkPin/<str:pin>/', views.checkPin,name='checkPin'),
]