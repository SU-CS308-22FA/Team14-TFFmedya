from pyexpat import model
from rest_framework import serializers
from .models import Question,Choice

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Choice
        fields= ['option', 'votes']

class QuestionSerializer(serializers.ModelSerializer):

    choices = ChoiceSerializer(many = True)

    class Meta:
        model=Question
        fields=['question_text','pub_date', 'choices']

    def create(self, validated_data):
        tracks_data = validated_data.pop('choices')
        question = Question.objects.create(**validated_data)
        for track_data in tracks_data:
            Choice.objects.create(question=question, **track_data)
        return question
