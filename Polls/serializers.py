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
        fields=['question_text','pub_date', 'isActive', 'choices']

    def update(self, instance, validated_data):
        choices_data = validated_data.pop('choices')
        choices = (instance.choices).all()
        choices = list(choices)
        instance.question_text = validated_data.get('question_text', instance.question_text)
        instance.pub_date = validated_data.get('pub_date', instance.pub_date)
        instance.isActive = validated_data.get('isActive', instance.pub_date)
        #instance.choices = validated_data.get('instrument', instance.instrument)
        instance.save()

        for choice_data in choices_data:
            album = choices.pop(0)
            album.option = choice_data.get('option', album.option)
            album.votes = choice_data.get('votes', album.votes)
            #album.num_stars = album_data.get('num_stars', album.num_stars)
            album.save()
        return instance
    
    def create(self, validated_data):
        tracks_data = validated_data.pop('choices')
        question = Question.objects.create(**validated_data)
        for track_data in tracks_data:
            Choice.objects.create(question=question, **track_data)
        return question
