from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from users.models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Event instances.
    """
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()


class SpecificUserView(APIView):
    queryset = User.objects.all()

    def get(self, request):
        user = Token.objects.get(key=request.headers['Authorization']).user
        userProfile = UserProfile.objects.get(user=user.id)
        serializedUser = UserProfileSerializer(userProfile)
        return Response(serializedUser.data)

    def post(self, request):
        serializer = UserProfileSerializer(request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
