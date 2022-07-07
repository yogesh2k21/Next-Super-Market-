from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractUser
from django.core.validators import RegexValidator
import secrets

class MyUserManager(BaseUserManager):
    def create_user(self,first_name,last_name,username=None, email=None,mobile=None, password=None):
            """
            Creates and saves a User with the given email, favorite color
            and password.
            """
            if email is None and mobile is None:
                raise ValueError('User ,must have email or mobile')
            print(not username)
            if not username:
                if email:
                    username=email
                elif mobile:
                    username=mobile
            print(username)
            if not first_name:
                raise ValueError('Users must have a first name')
            if not last_name:
                raise ValueError('Users must have a last name')

            user = self.model(
                username=username,
                email=self.normalize_email(email),
                mobile=mobile,
                first_name=first_name,
                last_name=last_name
            )
            if password is None:
                password=secrets.token_urlsafe(32)
                print(password)
            user.set_password(password)
            user.save(using=self._db)
            return user

    def create_superuser(self,first_name,last_name,username=None, email=None,mobile=None, password=None):
            """
            Creates and saves a superuser with the given email, date of
            birth and password.
            """
            print('inside superuser')
            user = self.create_user(
                username=username,
                password=password,
                email=self.normalize_email(email),
                mobile=mobile,
                first_name=first_name,
                last_name=last_name
            )
            user.is_admin = True
            user.is_superuser = True
            user.save(using=self._db)
            return user


phone_regex = RegexValidator(regex=r'^\d{10,10}$', message="Phone number must be entered in the format: '0123456789'. Up to 15 digits allowed.")
class MyUser(AbstractUser):
    username=models.CharField(unique=True,max_length=50,null=True,blank=True)
    email = models.EmailField(verbose_name='Email address',max_length=50,unique=True)
    mobile=models.CharField(unique=True,validators=[phone_regex],max_length=12,null=True,blank=True) #max legnth is 12 but RegexValidator only allows 10 so only 10 digit can be stored.
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name']
    objects = MyUserManager()

    @property
    def name(self):
        return str(self.first_name)+" "+str(self.last_name)

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
    
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def __str__(self):
        r=self.first_name+" "+self.last_name
        if self.email:
            r=r+" ("+self.email+")"
        if self.mobile:
            r=r+" ("+self.mobile+")"
        return r

class Customer(models.Model):
    user=models.OneToOneField(MyUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id} {self.user.first_name} {self.user.email} {self.user.mobile}"

