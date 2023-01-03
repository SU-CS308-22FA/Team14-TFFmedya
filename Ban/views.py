from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import random

from Ban.models import Ban
from TFFmedya.models import User
from Reports.serializers import ReportSerializer
from django.template.loader import render_to_string

from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt
def ban(request,id=0):
    if request.method=='POST':
        try:
            data = JSONParser().parse(request)
            ban_reason = data['ban_reason']
            user = User.objects.get(UserName=data['username'])
            ban = Ban(User=user, BanSebebi=ban_reason)
            ban.save()
            User.objects.filter(UserName=data['username']).update(isBanned = True)
            return JsonResponse("Successful", safe=False)
        except:
            return JsonResponse("Failed", safe=False)