# Generated by Django 3.2.4 on 2022-12-12 14:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('TFFmedya', '0005_auto_20221119_1341'),
        ('Polls', '0002_question_isactive'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choice_votes', to='Polls.choice')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_votes', to='TFFmedya.user')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_votes', to='TFFmedya.user')),
            ],
            options={
                'unique_together': {('user', 'choice', 'question')},
            },
        ),
    ]
