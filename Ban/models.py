from django.db import models
from TFFmedya.models import User

# Create your models here.

class Ban(models.Model):
    User = models.ForeignKey(User, related_name="users3", on_delete=models.CASCADE)
    BanSebebi = models.CharField(max_length=500)