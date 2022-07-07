from django import views
from django.urls import path
from . import views

urlpatterns = [
    path('category/', views.category,name='category'),
    path('getProductCategoryWise/<str:id>/', views.getProductCategoryWise,name='getProductCategoryWise'),
    path('<int:pk>', views.getItem,name='getItem'),
    path('addToCart/<int:product_id>', views.addToCart,name='addToCart'),
    path('removeFromCart/<int:product_id>', views.removeFromCart,name='removeFromCart'),
    path('deleteFromCart/<int:product_id>', views.deleteFromCart,name='deleteFromCart'),
    path('ClearCart/', views.ClearCart,name='ClearCart'),
    path('getCart/', views.getCart,name='getCart'),
    path('getMyOrders/', views.getMyOrders,name='getMyOrders'),
    path('getOrder/<int:order_id>/', views.getOrder,name='getOrder'),
    path('getOrderInvoiceMail/<int:order_id>/', views.getOrderInvoiceMail,name='getOrderInvoiceMail'),
    path('getAddressMakeOrder/', views.getAddressMakeOrder,name='getAddressMakeOrder'),
    path('finalOrderPaymentRequest/', views.finalOrderPaymentRequest,name='finalOrderPaymentRequest'),
]