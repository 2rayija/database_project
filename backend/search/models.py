from django.db import models

# 배리어프리 시설 위치 테이블
class BarrierFreeLocations(models.Model):
    FacilityID = models.AutoField(primary_key=True)  # 고유 식별자
    FacilityName = models.CharField(max_length=255)  # 시설 이름
    Category1 = models.CharField(max_length=100)  # 주요 카테고리
    Category2 = models.CharField(max_length=100, null=True, blank=True)  # 보조 카테고리1
    Category3 = models.CharField(max_length=100, null=True, blank=True)  # 보조 카테고리2
    CityName = models.CharField(max_length=100)  # 시/도
    DistrictName = models.CharField(max_length=100, null=True, blank=True)  # 시/군/구
    SubdistrictName = models.CharField(max_length=100, null=True, blank=True)  # 읍/면/동
    VillageName = models.CharField(max_length=100, null=True, blank=True)  # 리/마을
    StreetName = models.CharField(max_length=255, null=True, blank=True)  # 도로명
    BuildingNumber = models.CharField(max_length=50, null=True, blank=True)  # 건물 번호
    PhoneNumber = models.CharField(max_length=50, null=True, blank=True)  # 전화번호
    Website = models.URLField(null=True, blank=True)  # 웹사이트

    def __str__(self):
        return self.FacilityName


# 배리어프리 시설에서 제공하는 서비스 테이블
class BarrierFreeServices(models.Model):
    Facility = models.OneToOneField(
        BarrierFreeLocations,
        on_delete=models.CASCADE,
        related_name='barrierfreeservices'
    )
    FreeParking = models.BooleanField(default=False)  # 무료 주차 가능 여부
    PaidParking = models.BooleanField(default=False)  # 유료 주차 가능 여부
    HandicapParking = models.BooleanField(default=False)  # 장애인 전용 주차장 여부
    LargeVehicleParking = models.BooleanField(default=False)  # 대형 차량 주차장 가능 여부
    EntranceFee = models.BooleanField(default=False)  # 입장료 유무
    HandicapAccess = models.BooleanField(default=False)  # 장애인 출입구 유무
    WheelchairRental = models.BooleanField(default=False)  # 휠체어 대여 가능 여부
    HandicapToilet = models.BooleanField(default=False)  # 장애인 화장실 유무
    GuideDogAllowed = models.BooleanField(default=False)  # 안내견 동반 가능 여부
    BrailleGuide = models.BooleanField(default=False)  # 점자 가이드 유무
    AudioGuide = models.BooleanField(default=False)  # 오디오 가이드 유무

    def __str__(self):
        return f"Services for {self.Facility.FacilityName}"


# 이동지원센터 정보 테이블
class TransportSupportCenters(models.Model):
    CenterID = models.AutoField(primary_key=True)  # 고유 식별자
    CenterName = models.CharField(max_length=255)  # 센터 이름
    Address = models.CharField(max_length=500)  # 주소
    ReservationPhone = models.CharField(max_length=50, null=True, blank=True)  # 예약 전화번호
    ReservationURL = models.URLField(null=True, blank=True)  # 예약 인터넷 주소
    AppName = models.CharField(max_length=100, null=True, blank=True)  # 앱 이름
    VehicleCount = models.IntegerField(default=0)  # 보유 차량 수
    VehicleType = models.CharField(max_length=50, null=True, blank=True)  # 차량 종류
    WheelchairSlopeCount = models.IntegerField(default=0)  # 휠체어 슬로프 차량 수
    WheelchairLiftCount = models.IntegerField(default=0)  # 휠체어 리프트 차량 수
    UsageRestrictions = models.CharField(max_length=500, null=True, blank=True)  # 이용 제한사항
    UsageFees = models.CharField(max_length=500, null=True, blank=True)  # 이용 요금
    OperationAreaInternal = models.CharField(max_length=500, null=True, blank=True)  # 관내 운행 지역
    OperationAreaExternal = models.CharField(max_length=500, null=True, blank=True)  # 관외 운행 지역
    UsageTarget = models.CharField(max_length=500, null=True, blank=True)  # 이용 대상

    def __str__(self):
        return self.CenterName
