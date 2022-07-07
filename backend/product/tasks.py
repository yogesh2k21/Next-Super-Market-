from celery import shared_task
from time import sleep
from django.conf import settings
from product.models import Order
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

@shared_task
def sleepy(duration):
    sleep(duration)
    return None

@shared_task
def send_order_email_confirmation(order_id):
    try:
        order=Order.objects.select_related('customer').get(id=order_id)
        items=[]
        for pro in order.products.all():
            t={
                "title":pro.product.title,
                "quantity":pro.quantity,
                "total":str(pro.get_total_product_price())
            }
            items.append(t)
        user_mail=str(order.customer.user.email)
        user_name=str(order.address.full_name)
        user_phone=str(order.address.phone)
        order_date=str(order.ordered_date.strftime("%m/%d/%Y - %H:%M:%S"))
        address=str(order.address.address)+str(" "+order.address.city)+str(" "+order.address.state)+str(" "+order.address.postal_code)
        print(user_mail)
    except Exception as e:
        print("Order fetching error")
        print(e)
    html_content=render_to_string('order_confirm_mail_template.html',{"order_id":order.id,"items":items,"amount":order.amount,"order_date":order_date,"user_name":user_name,"address":address,"user_phone":user_phone,"user_mail":user_mail})
    text_content=strip_tags(html_content)
    try:
        email=EmailMultiAlternatives(
            "Next Super Market Order info",
            text_content,
            settings.EMAIL_HOST_USER,
            [user_mail]
        )
        email.attach_alternative(html_content,"text/html")
        email.fail_silently=False
        email.send()
        print("Mail has been sent.")
        return None
    except Exception as e:
        print("Error! when sending mail")
        print(e)
        return None

# from product.models import Order
# from product.tasks import send_order_email_confirmation
# send_order_email_confirmation(41)