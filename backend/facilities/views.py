from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Facility, Service
from .serializers import FacilitySerializer, ServiceSerializer
from accounts.permissions import IsOperator  # 운영자 권한 확인

class FacilityView(APIView):
    permission_classes = [IsAuthenticated, IsOperator]

    def get(self, request):
        facilities = Facility.objects.filter(operator=request.user)
        serializer = FacilitySerializer(facilities, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        data['operator'] = request.user.id
        serializer = FacilitySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Facility added successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        try:
            facility = Facility.objects.get(id=id, operator=request.user)
        except Facility.DoesNotExist:
            return Response({'error': 'Facility not found or unauthorized'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = FacilitySerializer(facility, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Facility updated successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            facility = Facility.objects.get(id=id, operator=request.user)
        except Facility.DoesNotExist:
            return Response({'error': 'Facility not found or unauthorized'}, status=status.HTTP_404_NOT_FOUND)
        
        facility.delete()
        return Response({'message': 'Facility deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class ServiceView(APIView):
    permission_classes = [IsAuthenticated, IsOperator]

    def post(self, request):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Service added successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        try:
            service = Service.objects.get(id=id, facility__operator=request.user)
        except Service.DoesNotExist:
            return Response({'error': 'Service not found or unauthorized'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ServiceSerializer(service, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Service updated successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            service = Service.objects.get(id=id, facility__operator=request.user)
        except Service.DoesNotExist:
            return Response({'error': 'Service not found or unauthorized'}, status=status.HTTP_404_NOT_FOUND)
        
        service.delete()
        return Response({'message': 'Service deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
