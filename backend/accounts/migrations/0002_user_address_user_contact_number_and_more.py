# Generated by Django 5.1.3 on 2024-12-01 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='address',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='contact_number',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='disability_type',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='facility_type',
            field=models.CharField(blank=True, choices=[('BarrierFree', '배리어프리 시설'), ('SupportCenter', '이동지원센터')], max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='mobility_aid_type',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
