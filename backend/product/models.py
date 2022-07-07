from django.db import models
from account.models import Customer


class Category(models.Model):
    title=models.CharField(max_length=50)
    description=models.CharField(max_length=150,blank=True,null=True)
    url=models.CharField(max_length=1000,blank=True)
    def __str__(self):
        return f'{self.title}'

class Product(models.Model):
    title=models.CharField(max_length=50)
    type=models.CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    description=models.CharField(max_length=50)
    image=models.ImageField(upload_to='productImages/')
    price=models.FloatField(default=0)
    rating=models.IntegerField(default=1)
    def __str__(self):
        return f'{self.id} - {self.title} - {self.type}'

class ProductOrder(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)    #no need of this field remove it
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.product.title}"

    def get_total_product_price(self):
        return self.quantity * self.product.price

class BillingAddress(models.Model):
    full_name=models.CharField(max_length=50,null=True)
    phone=models.CharField(max_length=15,null=True)
    address = models.CharField(max_length=150)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=10)

    def __str__(self):
        return f'{self.id} {self.address} {self.city} {self.state} {self.postal_code}'

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    products = models.ManyToManyField(ProductOrder)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)
    amount=models.FloatField(default=0.0)
    address=models.ForeignKey(BillingAddress, on_delete=models.CASCADE,null=True,blank=True)
    razorpay_order_id=models.CharField(max_length=200,blank=True,null=True)
    razorpay_payment_id=models.CharField(max_length=200,blank=True,null=True)
    razorpay_signature=models.CharField(max_length=200,blank=True,null=True)

    def __str__(self):
        return f'Order no. - {self.id} | Email - {self.customer.user.email}'
    
    def get_total_order_price(self):
        total = 0
        for product_order in self.products.all():
            total += product_order.get_total_product_price()
        return total