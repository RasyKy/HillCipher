# cipher/urls.py

from django.urls import path
from .views import cipher_view

urlpatterns = [
    path('api/cipher/', cipher_view, name='cipher'),
]
