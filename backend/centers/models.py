from django.db import models
from accounts.models import User  # 사용자 모델 연결

class Center(models.Model):
    operator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='centers')  # 운영자 외래 키
    name = models.CharField(max_length=255)  # 센터명
    address = models.CharField(max_length=500)  # 주소
    reservation_phone = models.CharField(max_length=15)  # 예약 전화번호
    reservation_url = models.URLField(null=True, blank=True)  # 예약 URL
    app_name = models.CharField(max_length=100, null=True, blank=True)  # 앱 이름
    vehicle_count = models.PositiveIntegerField(default=0)  # 차량 수
    operation_area_internal = models.CharField(max_length=255, null=True, blank=True)  # 관내 운영 범위
    operation_area_external = models.CharField(max_length=255, null=True, blank=True)  # 관외 운영 범위
    usage_restrictions = models.TextField(null=True, blank=True)  # 이용 제한사항
    usage_fees = models.TextField(null=True, blank=True)  # 이용 요금

    def __str__(self):
        return self.name
