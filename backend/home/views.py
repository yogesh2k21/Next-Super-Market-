from django.http import JsonResponse
from product.serializers import ProductSerializer
from product.models import Product
from .models import Banner,Pincode
from .serializers import BannerSerializer
from django.core.exceptions import ObjectDoesNotExist
# from django.core.exceptions.ObjectDoesNotExist
# Create your views here.

def home(request):
    print('home')
    products=Product.objects.filter().order_by('id')
    serialized=ProductSerializer(products,many=True)
    return JsonResponse(serialized.data,safe=False)

def banner(request):
    print('banner')
    banners=Banner.objects.filter(active=True)
    serialized=BannerSerializer(banners,many=True)
    return JsonResponse(serialized.data,safe=False)

def checkPin(request,pin):
    print('pin checking')
    print(pin)
    data={}
    try:
        getPin=Pincode.objects.get(pin=pin)
        if getPin:
            data.update({'Available':True})
    except ObjectDoesNotExist:
        data.update({'Available':False})
    return JsonResponse(data=data,safe=False)