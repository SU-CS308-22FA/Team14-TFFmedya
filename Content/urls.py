from django.urls import path
from . import views
from django.urls import re_path as url

urlpatterns = [
    url(r'^index$', views.Index),
    url(r'^postcontent$', views.postContent),

]
