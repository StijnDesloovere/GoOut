from events.api.views import EventViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', EventViewSet, basename='events')
urlpatterns = router.urls
