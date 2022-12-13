from pyexpat import model
from rest_framework import serializers
from .models import Evaluation,Comment
from TFFmedya.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields= ['comment_text', 'user']
        

class EvaluationSerializer(serializers.ModelSerializer):

    comments = CommentSerializer(many = True)
    
    class Meta:
        model=Evaluation
        fields=['Evaluation_question', 'match', 'comments', 'match_date']
    
    def create(self, validated_data):
        comments_data = validated_data.pop('comments')
        evaluation = Evaluation.objects.create(**validated_data)
        for comment_data in comments_data:
            Comment.objects.create(evaluation=evaluation, **comment_data)
        return evaluation
