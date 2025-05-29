# cipher/urls.py

from django.urls import path
from .views import cipher_view, test_view

urlpatterns = [
    path('api/cipher/', cipher_view, name='cipher'),
    path('api/test/', test_view, name='test'),
]
