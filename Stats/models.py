from django.db import models

# Create your models here.

class Stat(models.Model):
    HomeTeam = models.CharField(max_length=500)
    AwayTeam = models.CharField(max_length=500)
    GolHome = models.CharField(max_length=500)
    GolAway = models.CharField(max_length=500)
    ToplaOynamaHome = models.CharField(max_length=500)
    ToplaOynamaAway = models.CharField(max_length=500)
    ToplamSutHome = models.CharField(max_length=500)
    ToplamSutAway = models.CharField(max_length=500)
    IsabetliSutHome = models.CharField(max_length=500)
    IsabetliSutAway = models.CharField(max_length=500)
    BasariliPaslarHome = models.CharField(max_length=500)
    BasariliPaslarAway = models.CharField(max_length=500)
    BasariliPasYuzdesiHome = models.CharField(max_length=500)
    BasariliPasYuzdesiAway = models.CharField(max_length=500)
    KornerHome = models.CharField(max_length=500)
    KornerAway = models.CharField(max_length=500)
    OrtaSayisiHome = models.CharField(max_length=500)
    OrtaSayisiAway = models.CharField(max_length=500)
    FaullerHome = models.CharField(max_length=500)
    FaullerAway = models.CharField(max_length=500)