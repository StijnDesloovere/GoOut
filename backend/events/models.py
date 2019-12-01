from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField
    startTime = models.TimeField
    endTime = models.TimeField
    location = models.CharField(max_length=255)

    # TODO make sure saving images is supported
    #image = models.ImageField()

    def __str__(self):
        return self.name
