from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsOperator  # 운영자 권한 확인
from .models import Center
from .serializers import CenterSerializer

class CenterListView(APIView):
    permission_classes = [IsAuthenticated, IsOperator]  # 운영자만 접근 가능

    def post(self, request):
        """이동지원센터 추가"""
        serializer = CenterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(operator=request.user)  # 운영자 정보 저장
            return Response({'message': 'Center added successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        """이동지원센터 검색"""
        address = request.query_params.get('address')
        if address:
            centers = Center.objects.filter(address__icontains=address)
        else:
            centers = Center.objects.all()
        serializer = CenterSerializer(centers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CenterDetailView(APIView):
    permission_classes = [IsAuthenticated, IsOperator]

    def put(self, request, id):
        """이동지원센터 수정"""
        try:
            center = Center.objects.get(id=id, operator=request.user)
        except Center.DoesNotExist:
            return Response({'error': 'Center not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CenterSerializer(center, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Center updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        """이동지원센터 삭제"""
        try:
            center = Center.objects.get(id=id, operator=request.user)
        except Center.DoesNotExist:
            return Response({'error': 'Center not found'}, status=status.HTTP_404_NOT_FOUND)

        center.delete()
        return Response({'message': 'Center deleted successfully'}, status=status.HTTP_200_OK)

    def get(self, request, id):
        """특정 센터 상세 조회"""
        try:
            center = Center.objects.get(id=id)
        except Center.DoesNotExist:
            return Response({'error': 'Center not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CenterSerializer(center)
        return Response(serializer.data, status=status.HTTP_200_OK)
