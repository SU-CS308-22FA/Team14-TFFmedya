from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager ## A new class is imported. ##

# Create your models here.

class Team(models.Model):
    TeamId = models.AutoField(primary_key=True)
    TeamName = models.CharField(max_length=500)

class Player(models.Model):
    PlayerId = models.AutoField(primary_key=True)
    PlayerName = models.CharField(max_length=500)
    Team = models.CharField(max_length=500)
    DateOfJoining = models.DateField()
    PhotoFileName = models.CharField(max_length=500)

class User(models.Model):
    UserId = models.AutoField(primary_key=True)
    Email = models.EmailField(unique=True, max_length=255)
    UserName = models.CharField(max_length=100, unique=True)
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    Password = models.CharField(max_length=100)
    is_moderator = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    Point = models.IntegerField(default=0)
