from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer
from .permissions import IsOperator
from rest_framework.permissions import IsAuthenticated

class RegisterView(APIView):
    """
    계정 등록 뷰
    """
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Account created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OperatorOnlyView(APIView):
    """
    운영자 전용 API
    """
    permission_classes = [IsAuthenticated, IsOperator]

    def get(self, request):
        return Response({'message': 'Welcome, Operator!'})