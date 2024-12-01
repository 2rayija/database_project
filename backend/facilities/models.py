from django.db import models
from accounts.models import User  # 운영자 연결을 위해 User 모델 임포트

class Facility(models.Model):
    operator = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'is_operator': True})
    facility_name = models.CharField(max_length=255)
    category1 = models.CharField(max_length=50)
    category2 = models.CharField(max_length=50, null=True, blank=True)
    category3 = models.CharField(max_length=50, null=True, blank=True)
    city_name = models.CharField(max_length=100)
    district_name = models.CharField(max_length=100, null=True, blank=True)
    subdistrict_name = models.CharField(max_length=100, null=True, blank=True)
    village_name = models.CharField(max_length=100, null=True, blank=True)
    street_name = models.CharField(max_length=100, null=True, blank=True)
    building_number = models.CharField(max_length=50, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    website = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.facility_name

class Service(models.Model):
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name='services')
    free_parking = models.BooleanField(default=False)
    paid_parking = models.BooleanField(default=False)
    handicap_parking = models.BooleanField(default=False)
    large_vehicle_parking = models.BooleanField(default=False)
    entrance_fee = models.BooleanField(default=False)
    handicap_access = models.BooleanField(default=False)
    wheelchair_rental = models.BooleanField(default=False)
    handicap_toilet = models.BooleanField(default=False)
    guide_dog_allowed = models.BooleanField(default=False)
    braille_guide = models.BooleanField(default=False)
    audio_guide = models.BooleanField(default=False)

    def __str__(self):
        return f"Service for {self.facility.facility_name}"
