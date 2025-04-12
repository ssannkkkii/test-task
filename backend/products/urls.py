from rest_framework.routers import DefaultRouter
from .views import BrandViewSet, CategoryViewSet, SneakerViewSet, CommentViewSet

router = DefaultRouter()
router.register(r'brands', BrandViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'sneakers', SneakerViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = router.urls
