from django.contrib import admin
from django.urls import path, include
from events.api import views
from users.api import views as userViews
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import url

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api/events/', include('events.api.urls')),
    path('api/myevents/', views.MyEventsView.as_view()),
    path('api/interested-going/', views.InterestedGoingView.as_view()),
    path('api/myuser/', userViews.MyUserView.as_view()),
    url(r'^api/user/(?P<pk>\d+)/$', userViews.UserView.as_view()),
    path('api/profiles/', include('users.api.urls')),
    path('api/myprofile/', userViews.MyProfileView.as_view()),
    url(r'^api/follow/(?P<type>[\w]+)/$', userViews.FollowerView.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
