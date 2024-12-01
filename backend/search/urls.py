from django.urls import path
from .views import (
    FacilityServiceSearchView, FacilityDetailView,
    TransportCenterSearchView, TransportCenterDetailView
)

urlpatterns = [
    # 배리어프리 시설 검색 및 상세 조회
    path('search/', FacilityServiceSearchView.as_view(), name='facility_service_search'),
    path('search/<int:facility_id>/', FacilityDetailView.as_view(), name='facility_detail'),

    # 이동지원센터 검색 및 상세 조회
    path('transport/search/', TransportCenterSearchView.as_view(), name='transport_search'),
    path('transport/<int:center_id>/', TransportCenterDetailView.as_view(), name='transport_detail'),
]
