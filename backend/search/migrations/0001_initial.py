# Generated by Django 5.1.3 on 2024-12-01 10:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BarrierFreeLocations',
            fields=[
                ('FacilityID', models.AutoField(primary_key=True, serialize=False)),
                ('FacilityName', models.CharField(max_length=255)),
                ('Category1', models.CharField(max_length=100)),
                ('Category2', models.CharField(blank=True, max_length=100, null=True)),
                ('Category3', models.CharField(blank=True, max_length=100, null=True)),
                ('CityName', models.CharField(max_length=100)),
                ('DistrictName', models.CharField(blank=True, max_length=100, null=True)),
                ('SubdistrictName', models.CharField(blank=True, max_length=100, null=True)),
                ('VillageName', models.CharField(blank=True, max_length=100, null=True)),
                ('StreetName', models.CharField(blank=True, max_length=255, null=True)),
                ('BuildingNumber', models.CharField(blank=True, max_length=50, null=True)),
                ('PhoneNumber', models.CharField(blank=True, max_length=50, null=True)),
                ('Website', models.URLField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='MobilitySupportCenters',
            fields=[
                ('CenterID', models.AutoField(primary_key=True, serialize=False)),
                ('CenterName', models.CharField(max_length=255)),
                ('Address', models.CharField(max_length=500)),
                ('PhoneNumber', models.CharField(blank=True, max_length=50, null=True)),
                ('Website', models.URLField(blank=True, null=True)),
                ('FreeParking', models.BooleanField(default=False)),
                ('HandicapToilet', models.BooleanField(default=False)),
                ('WheelchairRental', models.BooleanField(default=False)),
                ('VehicleSupport', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='BarrierFreeServices',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('FreeParking', models.BooleanField(default=False)),
                ('HandicapToilet', models.BooleanField(default=False)),
                ('WheelchairRental', models.BooleanField(default=False)),
                ('BrailleGuide', models.BooleanField(default=False)),
                ('Facility', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='barrierfreeservices', to='search.barrierfreelocations')),
            ],
        ),
    ]
