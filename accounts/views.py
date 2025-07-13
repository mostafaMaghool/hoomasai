from .forms import CustomUserCreationForm  # اطمینان حاصل کنید که مدل فرم خود را وارد کرده‌اید
from django.urls import reverse_lazy
from django.views.generic import CreateView

from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.views import PasswordResetView

class CustomPasswordResetView(PasswordResetView):
    template_name = 'password_reset_form.html'
    form_class = PasswordResetForm

class SignUpView(CreateView):
    form_class = CustomUserCreationForm  # تغییر نام فرم
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'


