from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import random

from TFFmedya.models import Team,Player,User
from TFFmedya.serializers import TeamSerializer,PlayerSerializer,UserSerializer
from django.core.mail import send_mail
from django.template.loader import render_to_string

from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt
def teamApi(request,id=0):
    if request.method=='GET':
        team = Team.objects.all()
        Team_serializer=TeamSerializer(team,many=True)
        return JsonResponse(Team_serializer.data,safe=False)
    elif request.method=='POST':
        Team_data=JSONParser().parse(request)
        Team_serializer=TeamSerializer(data=Team_data)
        if Team_serializer.is_valid():
            Team_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        Team_data=JSONParser().parse(request)
        team=Team.objects.get(TeamId=Team_data['TeamId'])
        Team_serializer=TeamSerializer(team,data=Team_data)
        if Team_serializer.is_valid():
            Team_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        team=Team.objects.get(TeamId=id)
        team.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def playerApi(request,id=0):
    if request.method=='GET':
        player = Player.objects.all()
        Player_serializer=PlayerSerializer(player,many=True)
        return JsonResponse(Player_serializer.data,safe=False)
    elif request.method=='POST':
        Player_data=JSONParser().parse(request)
        Player_serializer=PlayerSerializer(data=Player_data)
        if Player_serializer.is_valid():
            Player_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        Player_data=JSONParser().parse(request)
        player=Player.objects.get(PlayerId=Player_data['PlayerId'])
        Player_serializer=PlayerSerializer(player,data=Player_data)
        if Player_serializer.is_valid():
            Player_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        player=Player.objects.get(PlayerId=id)
        player.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def userLoginApi(request,id=0):
    if request.method=='POST':
        User_data=JSONParser().parse(request)
        eposta = User_data['Email']
        sifre = User_data['Password']
        try:
            user = User.objects.get(Email=eposta, Password=sifre)
        except:
            return JsonResponse("There is no user with this email.", safe=False)
        User_serializer=UserSerializer(user)
        return JsonResponse(User_serializer.data,safe=False)

@csrf_exempt
def userRegisterApi(request,id=0):
    if request.method=='POST':
        User_data=JSONParser().parse(request)
        User_serializer=UserSerializer(data=User_data)
        if User_serializer.is_valid():
            User_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)

@csrf_exempt
def userForgotPasswordApi(request,id=0):
    if request.method=='POST':
        User_data=JSONParser().parse(request)
        eposta = User_data['Email']
        try:
            
            number = random.randint(1000,9999)
            code = str(number)
            
            html_message = render_to_string("Email.html", {"username" :User_data['UserName'] , "code" :code })
            
            send_mail('Şifre Yenileme', 'Merhaba ' + User_data['UserName'], 'tffmedyaa@gmail.com', [ eposta], html_message=html_message)
        except Exception as e:
            print(str(e))     
        try:
            user = User.objects.get(Email=eposta)
        except Exception as e:
            print(str(e))   
         
        
            return JsonResponse("There is no user with this email.", safe=False)
        User_serializer=UserSerializer(user)
        data = User_serializer.data
        data["code"] = code
        return JsonResponse(data,safe=False)   
            

@csrf_exempt
def userUpdateApi(request,id=0):
    if request.method=='POST':
        User_data=JSONParser().parse(request)
        user=User.objects.get(Email=User_data['Email'])
        User_serializer=UserSerializer(user,data=User_data)
        if User_serializer.is_valid():
            User_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")

@csrf_exempt
def userDeleteApi(request,id=0):
    if request.method=='POST':
        User_data=JSONParser().parse(request)
        user=User.objects.get(Email=User_data['Email'])
        user.delete()
        return JsonResponse("Deleted Successfully",safe=False)