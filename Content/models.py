from django.db import models
from TFFmedya.models import User

# Create your models here.


class Content(models.Model):

    caption = models.CharField(max_length=500)
    image = models.CharField(max_length=500)
    ref_link = models.CharField(max_length=250)

    def __str__(self):
        return self.user + ": " + str(self.caption)