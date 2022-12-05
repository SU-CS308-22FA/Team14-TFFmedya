from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager ## A new class is imported. ##

# Create your models here.

class Fixture(models.Model):
    FixtureId = models.AutoField(primary_key=True)
    HomeTeam = models.CharField(max_length=500)
    AwayTeam = models.CharField(max_length=500)
    MatchResult = models.CharField(max_length=500)
    MatchDate = models.CharField(max_length=500)