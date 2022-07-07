FROM python

ADD ./ ./

RUN pip install -r requirements.txt

EXPOSE 8000

CMD python manage.py runserver 0:8000
