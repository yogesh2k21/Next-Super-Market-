from django.urls import path
# from .views import MyTokenObtainPairView,csrfToken
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import *

urlpatterns = [
    # path('signup',signup.views,name='signup')
    # path('csrfToken/', csrfToken,name='csrfToken'),
    # path('login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('changePassword', changePassword, name='changePassword'),
]