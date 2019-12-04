from django.urls import path

from .views import (
    EventListView,
    EventDetailView,
    EventCreateView
)


urlpatterns = [
    path('', EventListView.as_view()),
    path('create/', EventCreateView.as_view()),
    path('<pk>', EventDetailView.as_view())
]
