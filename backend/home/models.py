from django.db import models

# Create your models here.
class Banner(models.Model):
    title=models.CharField(max_length=50)
    image=models.ImageField(upload_to='bannerImages/')
    active=models.BooleanField(default=True)
    def __str__(self):
        return f'{self.id} - {self.title} - {self.active}'

class Pincode(models.Model):
    pin=models.IntegerField(default=100000)
    def __str__(self):
        return f'{self.pin}'