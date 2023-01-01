from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import random

from Reports.models import Report
from TFFmedya.models import User
from Reports.serializers import ReportSerializer
from django.template.loader import render_to_string

from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt
def report(request,id=0):
    if request.method=='POST':
        try:
            data = JSONParser().parse(request)
            type = data['type']
            title = data['title']
            report_text = data['report_text']
            user = User.objects.get(UserName=data['username'])
            report = Report(User=user, ReportType=type, ReportTitle=title, Description=report_text)
            report.save()
            return JsonResponse("Successful", safe=False)
        except:
            return JsonResponse("Failed", safe=False)

@csrf_exempt
def show(request,id=0):
    if request.method=='POST':
        try:
            data = JSONParser().parse(request)
            type = data['type']
            reports = Report.objects.all()
            liste = []
            for i in reports:
                if i.ReportType == type and i.isDone == False:
                    liste.append({"username" : i.User.UserName, "type" : i.ReportType, "title" : i.ReportTitle, "report_text" : i.Description})
            return JsonResponse(liste, safe=False)
        except:
            return JsonResponse("Failed", safe=False)


@csrf_exempt
def end(request,id=0):
    if request.method=='POST':
        try:
            data = JSONParser().parse(request)
            type = data['type']
            title = data['title']
            report_text = data['report_text']
            user = User.objects.get(UserName=data['username'])
            Report.objects.filter(User=user, ReportType=type, ReportTitle=title, Description=report_text).update(isDone = True)
            return JsonResponse("Successful", safe=False)
        except:
            return JsonResponse("Failed", safe=False)