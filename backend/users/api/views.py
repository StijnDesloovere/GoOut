from rest_framework import viewsets, serializers
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from users.models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer, ProfileSerializer


class MyUserView(APIView):
    queryset = User.objects.all()

    def get(self, request):
        user = Token.objects.get(key=request.headers['Authorization']).user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def patch(self, request):
        user = Token.objects.get(key=request.headers['Authorization']).user
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)


class UserView(RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = UserProfile.objects.all()


class MyProfileView(RetrieveUpdateAPIView,):
    serializer_class = UserProfileSerializer
    queryset = User.objects.all()

    def get_object(self):
        user = Token.objects.get(
            key=self.request.headers['Authorization']).user
        userProfile = UserProfile.objects.get(user=user.id)
        return userProfile


class FollowerView(APIView):
    queryset = UserProfile.objects.all()

    def get(self, request, type):
        user = Token.objects.get(
            key=self.request.headers['Authorization']).user
        userProfile = UserProfile.objects.get(user=user.id)

        if(type == 'followers'):
            followers = UserProfile.objects.filter(
                following__id=userProfile.id)
            return Response(UserProfileSerializer(followers, many=True).data)
        elif(type == 'following'):
            following = UserProfile.objects.filter(
                followers__id=userProfile.id)
            return Response(UserProfileSerializer(following, many=True).data)
        elif(type == 'not_following'):
            following = UserProfile.objects.filter(
                followers__id=userProfile.id)
            nonFollowing = UserProfile.objects.all().difference(following)
            return Response(UserProfileSerializer(nonFollowing, many=True).data)
        else:
            raise serializers.ValidationError(
                'Unsupported type parameter (expected "followers", "following" or "not_following")')

    def post(self, request, type):
        user = Token.objects.get(
            key=self.request.headers['Authorization']).user
        userProfile = UserProfile.objects.get(user=user.id)
        if(userProfile):
            if(type == 'add_following'):
                userProfile.following.add(
                    UserProfile.objects.get(id=request.data['id']))
                return Response(UserProfileSerializer(userProfile).data)
            elif(type == 'remove_following'):
                userProfile.following.remove(
                    UserProfile.objects.get(id=request.data['id']))
                return Response(UserProfileSerializer(userProfile).data)
            else:
                raise serializers.ValidationError(
                    'Unsupported type parameter (expected "add_following" or "remove_following")')
        else:
            raise serializers.ValidationError(
                'Please provide an id of an existing user profile')
