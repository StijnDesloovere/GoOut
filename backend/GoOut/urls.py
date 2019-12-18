from django.contrib import admin
from django.urls import path, include
from events.api import views
from users.api import views as userViews

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api/events/', include('events.api.urls')),
    path('api/myevents/', views.MyEventsView.as_view()),
    path('api/users/', include('users.api.urls')),
    path('api/myprofile/', userViews.SpecificUserView.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls'))
]
