from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from FixtureRefresh.models import Fixture

class FixtureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fixture
        fields = ('FixtureId', 'HomeTeam', 'AwayTeam', 'MatchResult', 'MatchDate')
