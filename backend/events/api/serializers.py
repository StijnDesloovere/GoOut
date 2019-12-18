from rest_framework import serializers

from events.models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'name', 'creator', 'description', 'category', 'date',
                  'startTime', 'endTime', 'location', 'lat', 'long', 'going', 'interested')
