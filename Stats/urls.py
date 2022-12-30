from django.urls import re_path as url
from Stats import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^statcreate$',views.statCreate),
    url(r'^statshow$',views.statShow)
]