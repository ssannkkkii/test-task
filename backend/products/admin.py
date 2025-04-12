from django.contrib import admin
from django.contrib import admin
from .models import Brand, Category, Sneaker, SneakerSize, SneakerColor, Comment


class SneakerSizeInline(admin.TabularInline):
    model = SneakerSize
    extra = 1


class SneakerColorInline(admin.TabularInline):
    model = SneakerColor
    extra = 1


@admin.register(Sneaker)
class SneakerAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'price', 'category', 'created_at']
    list_filter = ['brand', 'category']
    search_fields = ['name', 'description']
    inlines = [SneakerSizeInline, SneakerColorInline]


admin.site.register(Brand)
admin.site.register(Category)
admin.site.register(Comment)