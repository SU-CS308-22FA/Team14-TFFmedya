from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from Stats.models import Stat
from Stats.serializers import StatSerializer
from FixtureRefresh.models import Fixture

from bs4 import BeautifulSoup
import requests
import json
import os

from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt
def statCreate(request,id=0):
    if request.method=='POST':
        try:
            fixture = Fixture.objects.all()
            fixture.delete()
            stat = Stat.objects.all()
            stat.delete()
            module_dir = os.path.dirname(__file__)
            file_path = os.path.join(module_dir, 'deneme.txt')
            file = open(file_path, 'r', encoding="utf8")
            soup = BeautifulSoup(file.read(),"html.parser")
            b1 = soup.find_all("a", {"class" : "matchScore"})
            json_liste = []
            for i in b1:
                url = 'https:' + i['href']
                response = requests.get(url)
                html_icerigi = response.content
                soup = BeautifulSoup(html_icerigi,"html.parser")
                a1 = soup.find_all("div", {"id" : "dvOPTAStats"})[0]
                a2 = a1.contents[3]
                a3 = a2.contents[1:17:2]
                sozluk = {}
                home_team = soup.find_all("a", {"class" : "left-block-team-name"})[0].text
                away_team = soup.find_all("a", {"class" : "r-left-block-team-name"})[0].text
                sozluk['Tarih'] = soup.find_all("div", {"class" : "match-info-date"})[0].text[8:]
                sozluk['Ev Sahibi'] = home_team
                sozluk['Deplasman'] = away_team
                sozluk['Gol'] = [soup.find_all("div", {"class" : "match-score"})[0].text[34], soup.find_all("div", {"class" : "match-score"})[0].text[38]]
                for j in a3:
                    sozluk[j.contents[5].text] = [j.contents[3].text, j.contents[7].text]
                json_liste.append(sozluk)
            json_liste = json_liste[::-1]
            for i in json_liste:
                stat = Stat(HomeTeam=i['Ev Sahibi'], AwayTeam=i['Deplasman'], GolHome=i['Gol'][0], GolAway=i['Gol'][1],
                            ToplaOynamaHome=i['Topla Oynama'][0], ToplaOynamaAway=i['Topla Oynama'][1], ToplamSutHome=i['Toplam Şut'][0], ToplamSutAway=i['Toplam Şut'][1],
                            IsabetliSutHome=i['İsabetli Şut'][0], IsabetliSutAway=i['İsabetli Şut'][1], BasariliPaslarHome=i['Başarılı Paslar'][0], BasariliPaslarAway=i['Başarılı Paslar'][1],
                            BasariliPasYuzdesiHome=i['Pas Başarı(%)'][0], BasariliPasYuzdesiAway=i['Pas Başarı(%)'][1], KornerHome=i['Korner'][0], KornerAway=i['Korner'][1],
                            OrtaSayisiHome=i['Orta'][0], OrtaSayisiAway=i['Orta'][1], FaullerHome=i['Faul'][0], FaullerAway=i['Faul'][1])
                stat.save()
                fikstur = Fixture(HomeTeam=i['Ev Sahibi'], AwayTeam=i['Deplasman'], MatchResult=i['Gol'][0] + '-' + i['Gol'][1], MatchDate=i['Tarih'])
                fikstur.save()
            return JsonResponse("Successful", safe=False)
        except:
            return JsonResponse("Failed", safe=False)

@csrf_exempt
def statShow(request,id=0):
    data = JSONParser().parse(request)
    hometeam = data['evsahibi']
    awayteam = data['deplasman']
    try:
        stat = Stat.objects.get(HomeTeam=hometeam, AwayTeam=awayteam)
        statserializer = StatSerializer(stat)
        return JsonResponse(statserializer.data, safe=False)
    except:
        return JsonResponse("Failed", safe=False)