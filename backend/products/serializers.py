from rest_framework import serializers
from .models import Brand, Category, Sneaker, SneakerSize, SneakerColor, Comment
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class SneakerSizeSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = SneakerSize
        fields = ['id', 'size', 'stock']


class SneakerColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = SneakerColor
        fields = ['id', 'color_name', 'hex_code']


class SneakerSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    brand_id = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all(), source='brand', write_only=True)

    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True)

    sizes = SneakerSizeSerializer(many=True, read_only=True)
    colors = SneakerColorSerializer(many=True, read_only=True)

    class Meta:
        model = Sneaker
        fields = [
            'id', 'name', 'description', 'price', 'image',
            'brand', 'brand_id', 'category', 'category_id',
            'sizes', 'colors', 'created_at'
        ]

@api_view(['POST'])
def add_comment(request, sneaker_id):
    if request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            # Додаємо коментар до певного продукту
            sneaker = Sneaker.objects.get(id=sneaker_id)
            serializer.save(product=sneaker)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_comment(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)