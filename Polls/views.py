from django.shortcuts import render
from django.http import HttpResponse
from .models import Question, Choice
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import QuestionSerializer
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

@csrf_exempt
def Index(request):
    if request.method == 'POST':
        try:
            questions = Question.objects.all()
        except Exception as e:
            return JsonResponse("Could not get objects.", safe=False)
        try:
            Questions_serializer = QuestionSerializer(questions, many=True)
        except Exception as e:
            return JsonResponse("Could not serialize.", safe=False)
        try:
            
            data = Questions_serializer.data
            print("loll",data[0]["isActive"])
            data = [k for k in data if k['isActive'] == True]
            print(data)
            return JsonResponse(data, safe=False)
        except:
            print("Could not return the objects")
            return JsonResponse("Could not return the objects.", safe=False)

@csrf_exempt
def Create(request):
    
    if request.method == 'POST':
        try:
            Question_data = JSONParser().parse(request)
            Question_serializer = QuestionSerializer(data=Question_data)
            if Question_serializer.is_valid(raise_exception=True):
                Question_serializer.save()
                return JsonResponse("Question Added Successfully", safe=False)
            return JsonResponse("Data is not valid.", safe=False)
        except Exception as e:
            return JsonResponse("Fail in Create view. Error: " + str(e), safe=False)
            

@csrf_exempt
def Update(request):
    if request.method == 'POST':
        Question_data = JSONParser().parse(request)
        Question_to_update = Question.objects.get(question_text = Question_data['question_text'])
        Question_serializer = QuestionSerializer(Question_to_update, data=Question_data)
        if Question_serializer.is_valid():
            Question_serializer.save()
            return JsonResponse("Question Updated Successfully", safe=False)
        return JsonResponse("Failed Updating the Question", safe=False)

@csrf_exempt
def Results(request):
    if request.method == 'POST':
        Question_data = JSONParser().parse(request)
        try:
            question = Question.objects.get(question_text = Question_data['question_text'])
        except Exception as e:
            return JsonResponse('Failed Getting the Question. The error message is: ' + str(e), safe=False)
        Question_serializer = QuestionSerializer(question)
        return JsonResponse(Question_serializer, safe=False)
