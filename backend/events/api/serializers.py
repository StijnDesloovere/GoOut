from rest_framework import serializers

from events.models import Event
from users.api.serializers import UserProfileSerializer


class EventSerializer(serializers.ModelSerializer):
    creator = UserProfileSerializer()

    class Meta:
        model = Event
        fields = ('id', 'name', 'creator', 'description', 'category', 'date', 'image',
                  'startTime', 'endTime', 'location', 'lat', 'long', 'going', 'interested')


class EventPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('__all__')
