# Generated by Django 3.2.4 on 2022-12-07 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Polls', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='isActive',
            field=models.BooleanField(default=True),
        ),
    ]