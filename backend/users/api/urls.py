from users.api.views import UserProfileViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', UserProfileViewSet, basename='userProfiles')
urlpatterns = router.urls
