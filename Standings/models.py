from django.db import models

# Create your models here.

class Standing(models.Model):
    team_name = models.CharField(max_length=250, unique=True)
    team_logo = models.CharField(max_length=250, unique=True)
    games_played = models.IntegerField(default = 0)
    victories = models.IntegerField(default = 0)
    draws = models.IntegerField(default = 0)
    losses = models.IntegerField(default = 0)
    goals_scored = models.IntegerField(default = 0)
    goals_conceded = models.IntegerField(default = 0)
    goal_difference = models.IntegerField(default = 0)
    points = models.IntegerField(default = 0)

    def __str__(self):
        return self.question_text