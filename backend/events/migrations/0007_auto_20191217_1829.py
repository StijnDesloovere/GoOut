# Generated by Django 3.0 on 2019-12-17 18:29

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events', '0006_auto_20191216_1907'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='going',
            field=models.ManyToManyField(related_name='going', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='event',
            name='interested',
            field=models.ManyToManyField(related_name='interested', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='event',
            name='lat',
            field=models.DecimalField(blank=True, decimal_places=11, max_digits=15, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='long',
            field=models.DecimalField(blank=True, decimal_places=11, max_digits=15, null=True),
        ),
    ]