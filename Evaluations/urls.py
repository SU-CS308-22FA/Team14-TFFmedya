from django.urls import re_path as url
from Evaluations import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^create$',views.Create),
    url(r'^comments$',views.Results),
    url(r'^createcomment$',views.CreateComment)
]