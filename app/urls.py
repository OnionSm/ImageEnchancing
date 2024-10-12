from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('', views.main_web),
    path('upload-image/', views.upload_image, name='upload_image'),
]