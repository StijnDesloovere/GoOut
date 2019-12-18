from django.db import models
from django.contrib.auth.models import User


# Model for a user profile (extra information of the user beyond the email, name and password)
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    birthDate = models.DateField
    gender = models.CharField(max_length=1,
                              choices=[("M", "Male"), ("F", "Female")],
                              default="M")
    phoneNumber = models.CharField(max_length=24)
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.user.email
