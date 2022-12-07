from django.db import models

# Create your models here.

class Question(models.Model):
    question_text = models.CharField(max_length=250)
    pub_date = models.DateField('date published')

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
