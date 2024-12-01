from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    is_operator = models.BooleanField(default=False)  # 운영자 여부
    address = models.CharField(max_length=255, null=True, blank=True)  # 사용자 전용
    contact_number = models.CharField(max_length=15, null=True, blank=True)  # 사용자 전용
    disability_type = models.CharField(max_length=50, null=True, blank=True)  # 사용자 전용
    mobility_aid_type = models.CharField(max_length=50, null=True, blank=True)  # 사용자 전용
    facility_type = models.CharField(
        max_length=50, 
        choices=[('BarrierFree', '배리어프리 시설'), ('SupportCenter', '이동지원센터')], 
        null=True, blank=True
    )  # 운영자 전용

    # 충돌 방지를 위해 related_name 설정
    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_groups",  # 새로운 related_name
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",  # 새로운 related_name
        blank=True,
    )
