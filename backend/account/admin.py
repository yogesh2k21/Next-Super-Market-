from atexit import register
from django.contrib import admin
from .models import MyUser,Customer

# Register your models here.
admin.site.register([MyUser,Customer])