from django.urls import re_path as url
from Ban import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^ban$',views.ban)
]