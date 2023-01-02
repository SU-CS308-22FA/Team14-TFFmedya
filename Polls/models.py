from django.db import models
from TFFmedya.models import User
from django.utils import timezone

# Create your models here.

class Question(models.Model):
    question_text = models.CharField(max_length=250, unique=True)
    pub_date = models.DateField(default=timezone.now)
    isPOTM = models.BooleanField(default = False)
    isActive = models.BooleanField(default = True)

    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, related_name="choices", on_delete=models.CASCADE)
    option = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    class Meta:
        unique_together = ['option', 'question']
        ordering = ['votes']
        

    def __str__(self):
        return self.option


class Vote(models.Model):
    question = models.ForeignKey(Question, related_name="question_votes", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="user_votes",on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, related_name="choice_votes", on_delete=models.CASCADE)

    class Meta:
        unique_together = ['user', 'choice', 'question']

    def __str__(self):
        return self.user.username + self.choice.option