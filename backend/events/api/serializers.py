from rest_framework import serializers

from events.models import Event
from users.api.serializers import UserSerializer


class EventSerializer(serializers.ModelSerializer):
    creator = UserSerializer()

    class Meta:
        model = Event
        fields = ('id', 'name', 'creator', 'description', 'category', 'date',
                  'startTime', 'endTime', 'location', 'lat', 'long', 'going', 'interested')


class EventPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('__all__')
