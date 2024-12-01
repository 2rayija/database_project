from rest_framework import serializers
from .models import Facility, Service

class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = '__all__'
        read_only_fields = ('id', 'operator')  # ID와 Operator는 수정 불가

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
        read_only_fields = ('id', 'facility')  # ID와 Facility는 수정 불가
