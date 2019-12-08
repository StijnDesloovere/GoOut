from django.db import models
import datetime


class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=30, default="Other")
    date = models.DateField(default=datetime.date.today)
    startTime = models.TimeField(default=datetime.time)
    endTime = models.TimeField(default=datetime.time)
    location = models.CharField(max_length=255)

    # TODO make sure saving images is supported
    #image = models.ImageField()

    def __str__(self):
        return self.name
