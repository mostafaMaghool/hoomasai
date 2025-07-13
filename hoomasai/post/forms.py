# forms.py - فرم Post
from django import forms
from .models import Post, Comment

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title','exerpt','body','photo']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'عنوان جذاب برای مقاله خود انتخاب کنید'
            }),
            'exerpt': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'خلاصه‌ای کوتاه از محتوای مقاله'
            }),
            'body': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 8,
                'placeholder': 'محتوای کامل مقاله خود را اینجا بنویسید...'
            }),
            'photo': forms.FileInput(attrs={
                'class': 'form-control',
                'accept': 'image/*'
            }),
        }
    
    def clean_title(self):
        title = self.cleaned_data.get('title')
        if len(title) < 5:
            raise forms.ValidationError('عنوان باید حداقل 5 کاراکتر باشد.')
        return title
    
    def clean_body(self):
        body = self.cleaned_data.get('body')
        if len(body) < 50:
            raise forms.ValidationError('محتوای مقاله باید حداقل 50 کاراکتر باشد.')
        return body
    
class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['body']
