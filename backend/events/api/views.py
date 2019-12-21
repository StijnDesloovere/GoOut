from drf_custom_viewsets.viewsets import CustomSerializerViewSet
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from events.models import Event
from .serializers import EventSerializer, EventPostSerializer


class EventViewSet(CustomSerializerViewSet):
    """
    A viewset for viewing and editing Event instances.
    """
    serializer_class = EventSerializer
    custom_serializer_classes = {
        'create': EventPostSerializer
    }
    queryset = Event.objects.all()


class MyEventsView(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_queryset(self):
        def myEvents(user):
            return user.eventsCreated.all()

        def interested(user):
            return user.interested.all()

        def going(user):
            return user.going.all()

        def allMyEvents(user):
            going = user.going.all()
            interested = user.interested.all()
            created = user.eventsCreated.all()
            return going.union(interested, created)

        user = Token.objects.get(
            key=self.request.headers['Authorization']).user
        events = {
            'created': myEvents(user),
            'interested': interested(user),
            'going': going(user),
            'all': allMyEvents(user)
        }[self.request.headers['EventType']]
        return events.order_by('date', 'startTime').distinct()
