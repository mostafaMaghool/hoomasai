from django.db import models
from datetime import date,timezone
from django.urls import reverse


class Post(models.Model):
    title = models.CharField(max_length= 50)
    exerpt = models.CharField(max_length=50)
    body = models.TextField()
    author = models.ForeignKey('accounts.CustomUser',on_delete= models.CASCADE)
    date = models.DateField(default =date.today)
    photo = models.ImageField(upload_to='posts/', default='posts/default.jpg')  # یا هر مقدار پیش‌فرض دیگر
    def __str__(self):
        return self.title
        
    def save(self, *args, **kwargs):
        # اضافه کردن log برای debug
        print(f"Saving post: {self.title}")
        super().save(*args, **kwargs)
        print(f"Post saved with ID: {self.id}")
    def get_absolute_url(self):
        return reverse('post_detail',kwargs={'pk': self.pk})

class Comment(models.Model):
    author = models.ForeignKey('accounts.CustomUser', on_delete= models.CASCADE)
    post = models.ForeignKey(Post, on_delete= models.CASCADE)
    body = models.TextField(null= False, blank=False)
    date = models.DateField(default=date.today)

    def __str__(self):
        return self.body

class prompts(models.Model):
    title = models.CharField(max_length= 50)
    body = models.TextField()
    author = models.ForeignKey('accounts.CustomUser',on_delete= models.CASCADE)
    date = models.DateField(default =date.today)
    photo = models.ImageField(upload_to='prompt/', default='prompt/default.jpg')  # یا هر مقدار پیش‌فرض دیگر

    class Meta:
        db_table = 'prompts'