from django.db import models
import datetime

# Model for an event


class Event(models.Model):
    CATEGORY_CHOICES = [  # All types of event categories
        ("PA", "Party"),
        ("CO", "Concert"),
        ("CF", "Conference"),
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
    date = models.DateField(default=datetime.date.today)
    startTime = models.TimeField(default=datetime.time)
    endTime = models.TimeField(default=datetime.time)
    location = models.CharField(max_length=255)

    # TODO make sure saving images is supported
    #image = models.ImageField()

    # TODO make sure creator of event and people going/interested are implemented

    def __str__(self):
        return self.name
