from django.db import models
from TFFmedya.models import User


# Create your models here.

class GuessingQuestion(models.Model):
    question_text = models.CharField(max_length=250, unique=True)
    pub_date = models.DateField(auto_now=True)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(GuessingQuestion, related_name="choice", on_delete=models.CASCADE)
    option = models.CharField(max_length=200)
    vote_count = models.IntegerField(default=0)

    class Meta:
        unique_together = ['option', 'question']
        ordering = ['vote_count']


    def __str__(self):
        return self.option

class Votes(models.Model):
    poll = models.ForeignKey(GuessingQuestion, related_name="guessing_question", on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, related_name="votes", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="users", on_delete=models.CASCADE)

    class Meta:
        unique_together = ['poll', 'user']
