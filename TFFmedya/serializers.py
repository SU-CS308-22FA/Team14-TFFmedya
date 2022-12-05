from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Team,Player,User

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model=Team
        fields=('TeamId','TeamName')

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Player
        fields=('PlayerId','PlayerName','Team','DateOfJoining','PhotoFileName')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('UserId', 'Email', 'UserName', 'FirstName', 'LastName', 'Password', 'is_moderator', 'is_admin')