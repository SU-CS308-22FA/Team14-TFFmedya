from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from Reports.models import Report

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model=Report
        fields=('ReportType','ReportTitle', 'Description')