from django.urls import re_path as url
from FixtureRefresh import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^fixtureCreate$',views.fixtureCreateApi),
    url(r'^fixtureShow$',views.fixtureShowApi)
]