from rest_framework import serializers

class BannerSerializer(serializers.Serializer):
    id=serializers.IntegerField(default=0)
    title=serializers.CharField(max_length=50)
    image=serializers.ImageField()