from django.contrib import admin
from .models import Post, Comment, prompts

admin.site.register(Post)
admin.site.register(prompts)
admin.site.register(Comment)