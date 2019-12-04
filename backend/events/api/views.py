from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView
)

from events.models import Event
from .serializers import EventSerializer


class EventListView(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDetailView(RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventCreateView(CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventUpdateView(UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDeleteView(DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
