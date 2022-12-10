from django.shortcuts import render
from TFFmedya.models import User
from .models import GuessingQuestion, Choice, Votes
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import GuessingSerializer, ChoiceSerializer
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def guessingContestShow(request):
    if request.method == 'POST':
        guessing_questions = GuessingQuestion.objects.all()
        guessing_serializer = GuessingSerializer(guessing_questions, many=True)
        try:
            return JsonResponse(guessing_serializer.data, safe=False)
        except:
            return JsonResponse("Could not return the objects.", safe=False)

@csrf_exempt
def guessingContestCreate(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            Question_serializer = GuessingSerializer(data=data)
            if Question_serializer.is_valid(raise_exception=True):
                Question_serializer.save()
                question = GuessingQuestion.objects.get(question_text = data['question_text'])
                choice_list = data['choices']
                for i in choice_list:
                    Choice.objects.create(question=question, option=i['option'])
                return JsonResponse("Successful", safe=False)
            return JsonResponse("Failed", safe=False)
        except Exception as e:
            return JsonResponse("Failed", safe=False)

@csrf_exempt
def vote(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            user = User.objects.get(Email=data['email'])
            question = GuessingQuestion.objects.get(question_text=data['question_text'])
            choice = Choice.objects.get(option=data['choice'], question=question)
            Votes.objects.create(poll=question, choice=choice, user=user)
            return JsonResponse("Successful", safe=False)
        except Exception as e:
            return JsonResponse("Failed", safe=False)


"""
@csrf_exempt
def choiceCreate(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            question = GuessingQuestion.objects.get(question_text = data['question'])
            Choice_serializer = ChoiceSerializer(data=data)
            if Choice_serializer.is_valid(raise_exception=True):
                Choice.objects.create(question=question, option=data['option'])
                return JsonResponse("Question Added Successfully", safe=False)
            return JsonResponse("Data is not valid.", safe=False)
        except Exception as e:
            return JsonResponse("Fail in Create view. Error: " + str(e), safe=False)
        """