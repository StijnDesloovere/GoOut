from drf_custom_viewsets.viewsets import CustomSerializerViewSet
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework import serializers
from events.models import Event
from .serializers import EventSerializer, EventPostSerializer
from users.models import UserProfile


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
        def myEvents(userProfile):
            return userProfile.eventsCreated.all()

        def interested(userProfile):
            return userProfile.interested.all()

        def going(userProfile):
            return userProfile.going.all()

        def allMyEvents(userProfile):
            going = userProfile.going.all()
            interested = userProfile.interested.all()
            created = userProfile.eventsCreated.all()
            following = Event.objects.filter(
                creator__followers__id=userProfile.id)
            return going.union(interested, created, following)

        user = Token.objects.get(
            key=self.request.headers['Authorization']).user
        userProfile = UserProfile.objects.get(user=user.id)
        events = {
            'created': myEvents(userProfile),
            'interested': interested(userProfile),
            'going': going(userProfile),
            'all': allMyEvents(userProfile)
        }[self.request.headers['EventType']]
        return events.order_by('date', 'startTime').distinct()


class InterestedGoingView(APIView):
    queryset = Event.objects.all()

    def post(self, request):
        user = Token.objects.get(
            key=self.request.headers['Authorization']).user
        userProfile = UserProfile.objects.get(user=user.id)
        event = Event.objects.get(id=request.data['eventID'])
        if(event):
            if(request.data['type'] == 'interested'):
                event.interested.add(userProfile)
                return Response(EventSerializer(event).data)
            elif(request.data['type'] == 'going'):
                event.going.add(userProfile)
                return Response(EventSerializer(event).data)
            elif(request.data['type'] == 'remove-interested'):
                event.interested.remove(userProfile)
                return Response(EventSerializer(event).data)
            elif(request.data['type'] == 'remove-going'):
                event.going.remove(userProfile)
                return Response(EventSerializer(event).data)
            else:
                raise serializers.ValidationError(
                    'Please provide a supported type (interested/going/remove-interested/remove-going)')
        else:
            raise serializers.ValidationError(
                'Please provide an eventID of an existing event')
