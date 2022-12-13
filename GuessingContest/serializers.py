from rest_framework import serializers
from .models import GuessingQuestion, Choice, Votes

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Votes
        fields = []


class ChoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Choice
        fields = ['option', 'vote_count']

class GuessingSerializer(serializers.ModelSerializer):

    class Meta:
        model = GuessingQuestion
        fields = ['question_text', 'pub_date', 'isActive']

    def create(self, validated_data):
        print(validated_data)
        question = GuessingQuestion.objects.create(**validated_data)
        return question