from rest_framework import serializers
from .models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            'username', 'email', 'password', 'is_operator',
            'address', 'contact_number', 'disability_type',
            'mobility_aid_type', 'facility_type'
        )

    def create(self, validated_data):
        # 운영자 계정 생성 시 facility_type 필드가 필요한지 검증
        is_operator = validated_data.get('is_operator', False)
        if is_operator and not validated_data.get('facility_type'):
            raise serializers.ValidationError("FacilityType is required for operators.")

        # 사용자 생성
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_operator=is_operator,
            address=validated_data.get('address'),
            contact_number=validated_data.get('contact_number'),
            disability_type=validated_data.get('disability_type'),
            mobility_aid_type=validated_data.get('mobility_aid_type'),
            facility_type=validated_data.get('facility_type'),
        )
        return user
