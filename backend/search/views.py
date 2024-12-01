from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from django.forms.models import model_to_dict
from .models import BarrierFreeLocations, BarrierFreeServices

class FacilityServiceSearchView(APIView):
    """
    배리어프리 시설과 관련된 서비스 검색 및 필터링 뷰
    """
    def get(self, request):
        search_type = request.query_params.get('type', 'facility')  # 검색 유형: 'facility', 'service', 'facility_service'
        region = request.query_params.get('region', '')  # 시/도 지역 필터
        filters = request.query_params.get('filters', '')  # 추가 필터 (카테고리 등)

        # 유효한 지역 체크
        valid_regions = [
            '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
            '경기', '강원', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주'
        ]
        if region and region not in valid_regions:
            return Response({'error': 'Invalid region selected'}, status=400)

        # 검색 쿼리 처리
        if search_type == 'facility':
            results = BarrierFreeLocations.objects.filter(
                Q(CityName__icontains=region),
                Q(Category1__icontains=filters)
            ).values(
                'FacilityID', 'FacilityName', 'Category1', 'Category2', 'Category3',
                'CityName', 'DistrictName', 'SubdistrictName', 'PhoneNumber'
            )
        elif search_type == 'service':
            results = BarrierFreeServices.objects.filter(
                Q(FreeParking=request.query_params.get('free_parking', None) == 'true'),
                Q(WheelchairRental=request.query_params.get('wheelchair_rental', None) == 'true'),
                Q(HandicapToilet=request.query_params.get('handicap_toilet', None) == 'true')
            ).values(
                'Facility__FacilityID', 'Facility__FacilityName',
                'FreeParking', 'WheelchairRental', 'HandicapToilet', 'AudioGuide', 'BrailleGuide'
            )
        elif search_type == 'facility_service':
            results = BarrierFreeLocations.objects.filter(
                Q(CityName__icontains=region),
                Q(Category1__icontains=filters)
            ).prefetch_related(
                'barrierfreeservices'
            ).values(
                'FacilityID', 'FacilityName', 'Category1', 'Category2', 'Category3',
                'CityName', 'DistrictName', 'SubdistrictName', 'PhoneNumber',
                'barrierfreeservices__FreeParking', 'barrierfreeservices__WheelchairRental',
                'barrierfreeservices__HandicapToilet', 'barrierfreeservices__AudioGuide',
                'barrierfreeservices__BrailleGuide'
            )
        else:
            return Response({'error': 'Invalid search type'}, status=400)

        return Response({'results': list(results)})


class FacilityDetailView(APIView):
    """
    배리어프리 시설 및 관련 서비스의 상세 정보 조회
    """
    def get(self, request, facility_id):
        try:
            facility = BarrierFreeLocations.objects.select_related('barrierfreeservices').get(FacilityID=facility_id)
            facility_data = model_to_dict(facility)
            service_data = model_to_dict(facility.barrierfreeservices) if hasattr(facility, 'barrierfreeservices') else {}

            return Response({
                'facility': facility_data,
                'services': service_data
            })
        except BarrierFreeLocations.DoesNotExist:
            return Response({'error': 'Facility not found'}, status=404)

from .models import TransportSupportCenters

class TransportCenterSearchView(APIView):
    """
    이동지원센터 검색 및 필터링 뷰
    """
    def get(self, request):
        region = request.query_params.get('region', '')  # 지역 필터
        vehicle_support = request.query_params.get('vehicle_support', None)  # 차량 지원 여부
        wheelchair_lift = request.query_params.get('wheelchair_lift', None)  # 휠체어 리프트 차량 여부

        # 유효한 지역 체크
        valid_regions = [
            '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
            '경기', '강원', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주'
        ]
        if region and region not in valid_regions:
            return Response({'error': 'Invalid region selected'}, status=400)

        # 검색 쿼리 처리
        results = TransportSupportCenters.objects.filter(
            Q(Address__icontains=region) if region else Q(),
            Q(VehicleSupport=True) if vehicle_support == 'true' else Q(),
            Q(WheelchairLiftCount__gte=1) if wheelchair_lift == 'true' else Q()
        ).values(
            'CenterID', 'CenterName', 'Address', 'ReservationPhone', 'AppName',
            'VehicleCount', 'WheelchairSlopeCount', 'WheelchairLiftCount', 'UsageFees',
            'OperationAreaInternal', 'OperationAreaExternal'
        )

        return Response({'results': list(results)})


class TransportCenterDetailView(APIView):
    """
    이동지원센터 상세 정보 조회
    """
    def get(self, request, center_id):
        try:
            center = TransportSupportCenters.objects.get(CenterID=center_id)
            center_data = model_to_dict(center)

            return Response({
                'center': center_data
            })
        except TransportSupportCenters.DoesNotExist:
            return Response({'error': 'Center not found'}, status=404)
