from rest_framework import viewsets
from .models import Brand, Category, Sneaker, Comment
from .serializers import BrandSerializer, CategorySerializer, SneakerSerializer, CommentSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SneakerViewSet(viewsets.ModelViewSet):
    queryset = Sneaker.objects.all().order_by('-created_at')
    serializer_class = SneakerSerializer
