from django.db import models

class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Sneaker(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='sneakers')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='sneakers')
    image = models.ImageField(upload_to='sneakers/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.brand.name}"


class SneakerSize(models.Model):
    sneaker = models.ForeignKey(Sneaker, on_delete=models.CASCADE, related_name='sizes')
    size = models.DecimalField(max_digits=4, decimal_places=1) 
    stock = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('sneaker', 'size')

    def __str__(self):
        return f"{self.sneaker.name} - Size {self.size}"


class SneakerColor(models.Model):
    sneaker = models.ForeignKey(Sneaker, on_delete=models.CASCADE, related_name='colors')
    color_name = models.CharField(max_length=50)
    hex_code = models.CharField(max_length=7, help_text='Наприклад: #ffffff для білого')

    def __str__(self):
        return f"{self.sneaker.name} - {self.color_name}"
    
class Comment(models.Model):
    product = models.ForeignKey(Sneaker, related_name='comments', on_delete=models.CASCADE)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment for {self.product.name}'

