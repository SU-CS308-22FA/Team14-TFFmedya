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
        questions = GuessingQuestion.objects.all()
        choices = Choice.objects.all()
        #guessing_serializer = GuessingSerializer(guessing_questions, many=True)
        question_dict = []
        for i in range(len(questions)):
            temp = []
            for j in range(len(choices)):
                if choices[j].question == questions[i]:
                    temp.append(choices[j])
            question_dict.append({'question_text' : questions[i].question_text, 'pub_date' : questions[i].pub_date, 'isActive' : questions[i].isActive, 'choices' : [{'option' : x.option, 'votes' : x.vote_count} for x in temp]})
        #print(question_dict)
        for i in range(len(question_dict)):
            if question_dict[len(question_dict) - 1 - i]['isActive'] == False:
                del question_dict[len(question_dict) - 1 - i]
        try:
            return JsonResponse(question_dict, safe=False)
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
def voteUpdate(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            user = User.objects.get(UserName=data['username'])
            question = GuessingQuestion.objects.get(question_text=data['question'])
            new_choice = Choice.objects.get(option=data['choice'], question=question)
            votes = Votes.objects.all()
            for i in votes:
                if i.user == user and i.poll == question:
                    vote = i
                    Choice.objects.filter(option=vote.choice, question=question).update(vote_count = vote.choice.vote_count - 1)
                    new_choice = Choice.objects.get(option=data['choice'], question=question)
                    Votes.objects.filter(user=user, poll=question).update(choice=new_choice)
                    Choice.objects.filter(option=new_choice.option, question=question).update(vote_count = new_choice.vote_count + 1)
                    return JsonResponse("Successful", safe=False)
            Votes.objects.create(poll=question, choice=new_choice, user=user)
            Choice.objects.filter(option=data['choice'], question=question).update(vote_count = new_choice.vote_count + 1)
            return JsonResponse("Successful", safe=False)
        except Exception as e:
            return JsonResponse("Failed", safe=False)


@csrf_exempt
def Leaderboard(request):
    if request.method == 'POST':
        try:
            users = User.objects.all()
            username_l = []
            point_l = []
            for i in users:
                username_l.append(i.UserName)
                point_l.append(i.Point)
            point_l, username_l = zip(*sorted(zip(point_l, username_l)))
            dictt = [{'username' : username_l[len(point_l) - x - 1], 'point' : point_l[len(point_l) - x - 1]} for x in range(len(point_l))]
            return JsonResponse(dictt, safe=False)
        except Exception as e:
            return JsonResponse("Failed", safe=False)

@csrf_exempt
def EndGuessingContest(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            GuessingQuestion.objects.filter(question_text=data['question_text']).update(isActive = False)
            votes = Votes.objects.all()
            question = GuessingQuestion.objects.get(question_text = data['question_text'])
            choice = Choice.objects.get(option = data['choice'])
            for vote in votes:
                if vote.poll == question and vote.choice == choice:
                    user_mail = vote.user.Email
                    user_point = vote.user.Point
                    User.objects.filter(Email=user_mail).update(Point = user_point + 10)
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