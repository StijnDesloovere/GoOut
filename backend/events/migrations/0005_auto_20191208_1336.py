# Generated by Django 2.2.7 on 2019-12-08 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_auto_20191208_1333'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='category',
            field=models.CharField(choices=[('PA', 'Party'), ('CO', 'Concert'), ('CF', 'Conference'), ('CM', 'Competition'), ('MU', 'Meetup'), ('SE', 'Sporting Event'), ('FE', 'Festival'), ('FI', 'Film'), ('TH', 'Theater'), ('CS', 'Comedy Show'), ('AE', 'Art Exhibition'), ('OT', 'Other')], default='OT', max_length=2),
        ),
    ]
