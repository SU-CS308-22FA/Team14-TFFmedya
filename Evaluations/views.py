from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
from .models import Evaluation, Comment
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import EvaluationSerializer, CommentSerializer
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

"""
@csrf_exempt
def Index(request):
    if request.method == 'POST':
        try:
            evaluations = Evaluation.objects.get(match="")
        except Exception as e:
            return JsonResponse("Could not get objects.", safe=False)
        try:
            Evaluations_serializer = EvaluationSerializer(evaluations, many=True)
        except Exception as e:
            return JsonResponse("Could not serialize.", safe=False)
        try:
            
            data = Evaluations_serializer.data
            print("loll",data[0]["isActive"])
            data = [k for k in data if k['isActive'] == True]
            print(data)
            return JsonResponse(data, safe=False)
        except:
            print("Could not return the objects")
            return JsonResponse("Could not return the objects.", safe=False)
"""

@csrf_exempt
def Create(request):
    
    if request.method == 'POST':
        try:
            Evaluation_data = JSONParser().parse(request)
            Evaluation_serializer = EvaluationSerializer(data=Evaluation_data)
            if Evaluation_serializer.is_valid(raise_exception=True):
                Evaluation_serializer.save()
                return JsonResponse("Evaluation Added Successfully", safe=False)
            return JsonResponse("Data is not valid.", safe=False)
        except Exception as e:
            return JsonResponse("Fail in Create view. Error: " + str(e), safe=False)

@csrf_exempt         
def CreateComment(request):
    
    if request.method == 'POST':
        try:
            Comment_data = JSONParser().parse(request)
            print(Comment_data)
            Comment_serializer = CommentSerializer(data=Comment_data)
            if Comment_serializer.is_valid(raise_exception=True):
                try:
                    ev = Evaluation.objects.get(match=Comment_data["match"], match_date = Comment_data["match_date"])
                    print(Comment_data["match"])
                    Comment.objects.create(comment_text=Comment_data["comment_text"], evaluation=ev, user=Comment_data["user"])
                except Exception as e:
                    return JsonResponse("Failed:" +str(e), safe=False)
                return JsonResponse("Comment Added Successfully", safe=False)
            return JsonResponse("Data is not valid.", safe=False)
        except Exception as e:
            return JsonResponse("Fail in CreateComment view. Error: " + str(e), safe=False)
            


@csrf_exempt
def Results(request):
    if request.method == 'POST':
        Evaluation_data = JSONParser().parse(request)
        try:
            evaluation = Evaluation.objects.get(match = Evaluation_data['match'])
        except Exception as e:
            return JsonResponse('Failed Getting the Question. The error message is: ' + str(e), safe=False)
        Evaluation_serializer = EvaluationSerializer(evaluation)
        return JsonResponse(Evaluation_serializer, safe=False)
