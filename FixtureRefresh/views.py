from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from FixtureRefresh.models import Fixture
from FixtureRefresh.serializers import FixtureSerializer

from bs4 import BeautifulSoup
import requests
import json

from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt
def fixtureShowApi(request,id=0):
    if request.method=='POST':
        fixture = Fixture.objects.all()
        Fixture_serializer=FixtureSerializer(fixture,many=True)
        return JsonResponse(Fixture_serializer.data,safe=False)


@csrf_exempt
def fixtureCreateApi(request,id=0):
    if request.method=='POST':
        fixture = Fixture.objects.all()
        fixture.delete()
        url = "https://beinsports.com.tr/lig/super-lig/fikstur"
        response = requests.get(url)
        html_icerigi = response.content
        soup = BeautifulSoup(html_icerigi,"html.parser")
        table = soup.find_all("table", {"class" : "table"})
        table = table[0]
        theadler = table.find_all("thead")
        tbodyler = table.find_all("tbody")
        for i in range(len(tbodyler)):
            maclar = tbodyler[i].find_all("tr")
            for j in range(len(maclar)):
                ev_sahibi = str(maclar[j].find_all("a")[1].string)
                deplasman = str(maclar[j].find_all("a")[5].string)
                mac_sonucu = maclar[j].find_all("div")[5]
                mac_sonucu = mac_sonucu.find_all("span")
                if len(mac_sonucu) == 2:
                    mac_sonucu = mac_sonucu[0].contents[0] + "-" + mac_sonucu[0].contents[4]
                else:
                    mac_sonucu = "-"
                tarih = str(theadler[i].string)
                fikstur = Fixture(HomeTeam=ev_sahibi, AwayTeam=deplasman, MatchResult=mac_sonucu, MatchDate=tarih)
                fikstur.save()
        return JsonResponse("Added Successfully",safe=False)
