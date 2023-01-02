from django.urls import path
from . import views
from django.urls import re_path as url

urlpatterns = [
    url(r'^index$', views.Index),
    url(r'^create$', views.Create),
    url(r'^update$', views.CreateOrUpdateVote),
    url(r'^results$', views.Results),
    url(r'^endpoll$', views.EndPoll),
    url(r'^showresults$', views.ShowResult),
    url(r'^createpotm$', views.createPOTM),
    url(r'^getpotm$', views.getPOTM)
]
