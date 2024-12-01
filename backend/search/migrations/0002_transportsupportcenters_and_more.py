# Generated by Django 5.1.3 on 2024-12-01 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('search', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TransportSupportCenters',
            fields=[
                ('CenterID', models.AutoField(primary_key=True, serialize=False)),
                ('CenterName', models.CharField(max_length=255)),
                ('Address', models.CharField(max_length=500)),
                ('ReservationPhone', models.CharField(blank=True, max_length=50, null=True)),
                ('ReservationURL', models.URLField(blank=True, null=True)),
                ('AppName', models.CharField(blank=True, max_length=100, null=True)),
                ('VehicleCount', models.IntegerField(default=0)),
                ('VehicleType', models.CharField(blank=True, max_length=50, null=True)),
                ('WheelchairSlopeCount', models.IntegerField(default=0)),
                ('WheelchairLiftCount', models.IntegerField(default=0)),
                ('UsageRestrictions', models.CharField(blank=True, max_length=500, null=True)),
                ('UsageFees', models.CharField(blank=True, max_length=500, null=True)),
                ('OperationAreaInternal', models.CharField(blank=True, max_length=500, null=True)),
                ('OperationAreaExternal', models.CharField(blank=True, max_length=500, null=True)),
                ('UsageTarget', models.CharField(blank=True, max_length=500, null=True)),
            ],
        ),
        migrations.DeleteModel(
            name='MobilitySupportCenters',
        ),
        migrations.AddField(
            model_name='barrierfreeservices',
            name='AudioGuide',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='barrierfreeservices',
            name='EntranceFee',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='barrierfreeservices',
            name='GuideDogAllowed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='barrierfreeservices',
            name='HandicapAccess',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='barrierfreeservices',
            name='HandicapParking',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='barrierfreeservices',
            name='LargeVehicleParking',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='barrierfreeservices',
            name='PaidParking',
            field=models.BooleanField(default=False),
        ),
    ]