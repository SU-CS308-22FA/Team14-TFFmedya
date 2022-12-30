from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from Stats.models import Stat

class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ('HomeTeam', 'AwayTeam', 'GolHome', 'GolAway', 'ToplaOynamaHome', 'ToplaOynamaAway',
                'ToplamSutHome', 'ToplamSutAway', 'IsabetliSutHome', 'IsabetliSutAway', 'BasariliPaslarHome', 'BasariliPaslarAway',
                'BasariliPasYuzdesiHome', 'BasariliPasYuzdesiAway', 'KornerHome', 'KornerAway', 'OrtaSayisiHome', 'OrtaSayisiAway', 'FaullerHome', 'FaullerAway')