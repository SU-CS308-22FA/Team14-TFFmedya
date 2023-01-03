from django.urls import re_path as url
from Reports import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^report$',views.report),
    url(r'^show$',views.show),
    url(r'^end$',views.end)
]