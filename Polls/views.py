from django.shortcuts import render
from django.http import HttpResponse
from .models import Question, Choice, Vote
from TFFmedya.models import User
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
            
            data = [k for k in data if k['isActive'] == True]
            
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
def GetPollResults(request):
    if request.method == "POST":
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
            
            data = [k for k in data if k['isActive'] == False]
            
            return JsonResponse(data, safe=False)
        except:
            print("Could not return the objects")
            return JsonResponse("Could not return the objects.", safe=False)



"""
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
"""

@csrf_exempt
def CreateOrUpdateVote(request):
    # The data we need: {username, question, choice}
    if request.method == "POST":
        Vote_data = JSONParser().parse(request)
        question = Question.objects.get(question_text = Vote_data["question"])
        user = User.objects.get(UserName = Vote_data["username"])
        choice = Choice.objects.get(question = question, option = Vote_data["choice"])
        try:
            vote = Vote.objects.get(user=user, question = question)
            # User has voted for this question


            # Update if new option is different
            
            oldChoice = vote.choice
            if(oldChoice.option != choice.option): 
                # Update old Choice, decrease votecount by 1
                #oldChoice = vote.choice
                oldChoice.votes -= 1
                oldChoice.save()

                # Update new choice, increase votecount by 1
                choice.votes += 1
                choice.save()

                # Update vote table
                vote.choice = choice
                vote.save()
                return JsonResponse("Vote Updated Successfully", safe=False)

            else:
                return JsonResponse("You already voted for this option", safe=False)


            
        except Vote.DoesNotExist:
            # User has not voted for this question, create
            print("DNE Verdim")
            Vote.objects.create(user=user, question = question, choice = choice)

            # Update new choice, increase votecount by 1
            choice.votes += 1
            choice.save()

            return JsonResponse("Vote Created Successfully", safe=False)
        except Exception as e:
            print("Failed Getting the Vote: " + str(e))
            return JsonResponse("Failed Getting the Vote", safe=False)
           


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

@csrf_exempt
def EndPoll(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        try:
            Question.objects.filter(question_text = data['question_text']).update(isActive = False)
            return JsonResponse('Successful', safe=False)
        except:
            return JsonResponse('Failed', safe=False)

@csrf_exempt
def ShowResult(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        try:
            print(3)
            temp1 = []
            temp2 = []
            print(4)
            question = Question.objects.get(question_text = data['question_text'])
            print(5)
            votes = Vote.objects.all()
            print(6)
            for i in votes:
                if i.question == question:
                    temp1.append(i.user.UserName)
                    temp2.append(i.choice.option)
            print(7)
            dictt = [{'username' : temp1[x], 'option' : temp2[x]} for x in range(len(temp1))]
            return JsonResponse(dictt, safe=False)
        except:
            return JsonResponse('Failed', safe=False)