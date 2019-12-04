from rest_framework import viewsets

from events.models import Event
from .serializers import EventSerializer


class EventViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Event instances.
    """
    serializer_class = EventSerializer
    queryset = Event.objects.all()
