from django.shortcuts import render
from TFFmedya.models import User
from rest_framework.parsers import JSONParser
from .models import Content
from django.http.response import JsonResponse
from .serializers import ContentSerializer
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def Index(request):
    if request.method == "POST":
        posts = Content.objects.all()
        Posts_serializer = ContentSerializer(posts, many=True)
        ##############################
        # 
        # Not all posts must be given, it may be filtered to last 5 (or posts in last 5 days etc.)
        #
        ##############################
        return JsonResponse(Posts_serializer.data, safe=False)

@csrf_exempt
def postContent(request):
    # input:
    # "caption" = caption,
    # "image" = image
    if request.method == "POST":
        Content_data = JSONParser().parse(request)
        caption = Content_data["caption"]
        image = Content_data["image"]
        ref_url = Content_data["ref_url"]
        try:
            content = Content(caption=caption, image=image , ref_link = ref_url)
            content.save()
        except Exception as e:
            print("Failed saving the content. Error message: " + str(e))
            return JsonResponse("Failed saving the content. Error message: " + str(e), safe=False)
        return JsonResponse("Post Added Successfully", safe=False)