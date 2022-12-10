from django.urls import re_path as url
from GuessingContest import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^guesscontestcreate$',views.guessingContestCreate),
    url(r'^vote$',views.vote),
    url(r'^guesscontestshow$',views.guessingContestShow)
]