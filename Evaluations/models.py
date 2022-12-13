from FixtureRefresh.models import Fixture
from TFFmedya.models import User
from django.db import models

# Create your models here.

class Evaluation(models.Model):

    Evaluation_question = models.CharField(max_length=500)
    match = models.CharField(max_length=500, default="", null=False)
    match_date = models.CharField(max_length=500, default="" , null=False)

    class Meta:
        unique_together = ['match', 'match_date']


class Comment(models.Model):
    comment_text = models.CharField(max_length=500)
    evaluation = models.ForeignKey(Evaluation, related_name="comments", on_delete=models.CASCADE)
    user = models.CharField(max_length=500)
    