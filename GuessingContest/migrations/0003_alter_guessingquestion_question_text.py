# Generated by Django 3.2.4 on 2022-12-13 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GuessingContest', '0002_alter_choice_question'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guessingquestion',
            name='question_text',
            field=models.CharField(max_length=250, unique=True),
        ),
    ]
