# Generated by Django 3.2.4 on 2023-01-01 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Reports', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='report',
            name='isDone',
            field=models.BooleanField(default=False),
        ),
    ]