from django.db import models
from TFFmedya.models import User

# Create your models here.

class Report(models.Model):
    User = models.ForeignKey(User, related_name="users2", on_delete=models.CASCADE)
    ReportType = models.CharField(max_length=500)
    ReportTitle = models.CharField(max_length=500)
    Description = models.CharField(max_length=2000)