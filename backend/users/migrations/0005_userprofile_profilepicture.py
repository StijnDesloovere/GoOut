# Generated by Django 3.0 on 2019-12-22 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20191218_2124'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='profilePicture',
            field=models.ImageField(blank=True, null=True, upload_to='pictures/'),
        ),
    ]
