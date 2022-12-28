from django.shortcuts import render
from Standings.models import Standing
from django.http.response import JsonResponse
from .serializers import StandingSerializer
from django.views.decorators.csrf import csrf_exempt

import requests

from bs4 import BeautifulSoup
# Create your views here.

@csrf_exempt
def updateStandings(request):
    # URL for this view: base_url + "standings/update"
    # no input given
    if request.method == "POST":
        standing = Standing.objects.all()
        standing.delete()
        url = "https://www.mackolik.com/puan-durumu/t%C3%BCrkiye-s%C3%BCper-lig/2022-2023/482ofyysbdbeoxauk19yg7tdt"
        response = requests.get(url)
        html_content = response.text

        #print(html_content)
        soup = BeautifulSoup(html_content,"html.parser")

        table = soup.find_all("table")
        table = table[0]

        tbody = table.find("tbody")
        entries = tbody.find_all("tr")
        print(len(entries))
        for entry in entries:
            cells = entry.find_all('td')
            team_img = cells[2].find('img')['src']
            team_name = cells[2].find_all('span')[0].text.strip()
            games_played = int(cells[3].text)
            games_won = int(cells[5].text)
            games_draw = int(cells[6].text)
            games_lost = int(cells[7].text)
            goals_scored = int(cells[8].text)
            goals_conceded = int(cells[9].text)
            goal_difference = int(cells[10].text)
            points = int(cells[11].text)

            standing = Standing(
                team_logo = team_img,
                team_name = team_name,
                games_played = games_played,
                victories = games_won,
                draws = games_draw,
                losses = games_lost,
                goals_scored = goals_scored,
                goals_conceded = goals_conceded,
                goal_difference = goal_difference,
                points = points,
            )
            standing.save()
        return JsonResponse("Added Successfully",safe=False)


@csrf_exempt
def getStandings(request):
    # URL for this view: base_url + "standings/index"
    # no input given
    # output:
    #{
        # team_logo = team_img,
        # team_name = team_name,
        # games_played = games_played,
        # victories = games_won,
        # draws = games_draw,
        # losses = games_lost,
        # goals_scored = goals_scored,
        # goals_conceded = goals_conceded,
        # goal_difference = goal_difference,
        # points = points,
    #}
    if request.method == "POST":
        try:
            standings = Standing.objects.all()
            standings_serializer = StandingSerializer(standings, many=True)
            return(standings_serializer.data)
        except Exception as e:
            return JsonResponse("Failed Getting the Standings. Error message: " + str(e), safe=False)