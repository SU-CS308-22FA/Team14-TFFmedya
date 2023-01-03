# Generated by Django 3.2.4 on 2022-12-28 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Standing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('team_name', models.CharField(max_length=250, unique=True)),
                ('team_logo', models.CharField(max_length=250, unique=True)),
                ('games_played', models.IntegerField(default=0)),
                ('victories', models.IntegerField(default=0)),
                ('draws', models.IntegerField(default=0)),
                ('losses', models.IntegerField(default=0)),
                ('goals_scored', models.IntegerField(default=0)),
                ('goals_conceded', models.IntegerField(default=0)),
                ('goal_difference', models.IntegerField(default=0)),
                ('points', models.IntegerField(default=0)),
            ],
        ),
    ]