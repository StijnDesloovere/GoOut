from django.db import models
from django.contrib.auth.models import User
import datetime


# Model for a user profile (extra information of the user beyond the email, name and password)
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    birthDate = models.DateField(default=datetime.date.today)
    gender = models.CharField(max_length=1,
                              choices=[("M", "Male"), ("F", "Female")],
                              default="M")
    phoneNumber = models.CharField(max_length=24)
    location = models.CharField(max_length=255)

    following = models.ManyToManyField(
        "self", related_name='followers', blank=True)

    profilePicture = models.ImageField(
        upload_to='pictures/', blank=True, null=True)

    def __str__(self):
        return self.user.email
