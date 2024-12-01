from rest_framework.permissions import BasePermission

class IsOperator(BasePermission):
    """
    운영자 전용 권한
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_operator
