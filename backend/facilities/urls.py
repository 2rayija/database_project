from django.urls import path
from .views import FacilityView, ServiceView

urlpatterns = [
    path('facilities/', FacilityView.as_view(), name='facilities'),
    path('facilities/<int:id>/', FacilityView.as_view(), name='facility_detail'),
    path('services/', ServiceView.as_view(), name='services'),
    path('services/<int:id>/', ServiceView.as_view(), name='service_detail'),
]
