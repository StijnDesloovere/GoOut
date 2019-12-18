from django.db import models
from django.contrib.auth.models import User
import datetime

# Model for an event


class Event(models.Model):
    CATEGORY_CHOICES = [  # All types of event categories
        ("PA", "Party"),
        ("CO", "Concert"),
        ("CF", "Conference"),
        ("FF", "Food Festival"),
        ("CM", "Competition"),
        ("MU", "Meetup"),
        ("SE", "Sporting Event"),
        ("FE", "Festival"),
        ("FI", "Film"),
        ("TH", "Theater"),
        ("CS", "Comedy Show"),
        ("AE", "Art Exhibition"),
        ("OT", "Other")
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(
        max_length=2, choices=CATEGORY_CHOICES, default="OT")

    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, default=1, related_name='eventsCreated')

    date = models.DateField(default=datetime.date.today)
    startTime = models.TimeField(default=datetime.time)
    endTime = models.TimeField(default=datetime.time)

    location = models.CharField(max_length=255, blank=True)
    lat = models.DecimalField(
        max_digits=15, decimal_places=11, blank=True, null=True)
    long = models.DecimalField(
        max_digits=15, decimal_places=11, blank=True, null=True)

    going = models.ManyToManyField(User, related_name='going', blank=True)
    interested = models.ManyToManyField(
        User, related_name='interested', blank=True)

    # TODO make sure saving images is supported
    #image = models.ImageField()

    # TODO make sure people going/interested is implemented

    def __str__(self):
        return self.name
