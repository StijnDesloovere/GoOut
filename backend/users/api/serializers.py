from rest_framework import serializers

from django.contrib.auth.models import User
from users.models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email')


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ('user', 'birthDate', 'gender',
                  'phoneNumber', 'location', 'following', 'followers')
