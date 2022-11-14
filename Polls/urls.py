from django.urls import path
from . import views
from django.urls import re_path as url

urlpatterns = [
    url(r'^index$', views.Index),
    url(r'^create$', views.Create),
    url(r'^update$', views.Update),
    url(r'^results$', views.Results)
]
