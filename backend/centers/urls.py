from django.urls import path
from .views import CenterListView, CenterDetailView

urlpatterns = [
    path('', CenterListView.as_view(), name='center_list'),  # POST, GET
    path('<int:id>/', CenterDetailView.as_view(), name='center_detail'),  # PUT, DELETE, GET
]
