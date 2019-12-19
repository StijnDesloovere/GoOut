from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from users.models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer, ProfileSerializer


class UserView(APIView):
    queryset = User.objects.all()

    def get(self, request):
        user = Token.objects.get(key=request.headers['Authorization']).user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        user = Token.objects.get(key=request.headers['Authorization']).user
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)


class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = UserProfile.objects.all()


class MyProfileView(APIView):
    queryset = User.objects.all()

    def get(self, request):
        user = Token.objects.get(key=request.headers['Authorization']).user
        userProfile = UserProfile.objects.get(user=user.id)
        serializedUser = UserProfileSerializer(userProfile)
        return Response(serializedUser.data)
