from django.views.generic import ListView, CreateView, DetailView,FormView
from .models import Post,prompts
from django.views.generic.edit import UpdateView, DeleteView
from .forms import PostForm, CommentForm
from django.urls import reverse_lazy, reverse
from django.urls import reverse
from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
import logging
from  django.views.generic.detail import SingleObjectMixin

# تنظیم logging برای debug
logger = logging.getLogger(__name__)

@login_required
def user_panel(request):
    # دریافت مقالات کاربر
    user_posts = Post.objects.filter(author=request.user).order_by('-date')
    
    # ایجاد فرم
    form = PostForm()
    
    if request.method == 'POST':
        # بررسی نوع فرم
        form_type = request.POST.get('form_type', 'article')
        
        if form_type == 'contact':
            # پردازش فرم تماس
            contact_name = request.POST.get('contact_name')
            contact_email = request.POST.get('contact_email')
            contact_message = request.POST.get('contact_message')
            
            # اینجا می‌توانید پیام را ذخیره کنید
            logger.info(f"Contact form submitted by {request.user.username}")
            messages.success(request, 'پیام شما با موفقیت ارسال شد!')
            return redirect('user_panel')
        
        else:
            # پردازش فرم مقاله (پیش‌فرض)
            form = PostForm(request.POST, request.FILES)
            
            # Debug: چاپ داده‌های دریافتی
            logger.info(f"POST data: {request.POST}")
            logger.info(f"FILES data: {request.FILES}")
            
            if form.is_valid():
                try:
                    post = form.save(commit=False)
                    post.author = request.user
                    
                    # بررسی نوع عمل
                    action = request.POST.get('action', 'draft')
                    if action == 'publish':
                        post.published = True
                        success_message = 'مقاله شما با موفقیت منتشر شد!'
                    else:
                        post.published = False
                        success_message = 'مقاله شما به عنوان پیش‌نویس ذخیره شد!'
                    
                    post.save()
                    logger.info(f"Post saved successfully: {post.title}")
                    messages.success(request, success_message)
                    return redirect('user_panel')
                    
                except Exception as e:
                    logger.error(f"Error saving post: {str(e)}")
                    messages.error(request, f'خطا در ذخیره مقاله: {str(e)}')
            else:
                # نمایش خطاهای فرم
                logger.warning(f"Form validation errors: {form.errors}")
                messages.error(request, 'لطفاً خطاهای فرم را برطرف کنید.')
                
                # اضافه کردن خطاهای جزئی
                for field, errors in form.errors.items():
                    for error in errors:
                        messages.error(request, f'{field}: {error}')
    
    context = {
        'user_posts': user_posts,
        'form': form,
    }
    return render(request, 'assets-temp/user-panel.html', context)

def post_list(request):
    total_posts = Post.objects.count()  # تعداد کل پست‌ها
    return render(request, 'blog_page.html', {'total_posts': total_posts})

def AdminPanel(request):
    return render(request, 'assets-temp/advanced-admin-panel.html')
def Blog(request):
    return render(request, 'assets-temp/gardoon.html')

def Prompts(request):
    return render(request, 'prompts/fiture.html')

def UserPanel(request):
    return render(request, 'assets-temp/user-panel.html')


class BlogView(ListView):
    model = Post
    template_name= 'blog_page.html'

class HomeView(ListView):
    model = Post
    template_name= 'home.html'

class CommentGet(DetailView):
    model = Post
    template_name = 'post_single.html'

    def get_context_data(self, **kwargs) :
        context = super().get_context_data(**kwargs)
        context["form"] = CommentForm()
        return context

class CommentPost(SingleObjectMixin,FormView):
    model = Post
    form_class = CommentForm
    template_name = 'post_single.html'

    def post(self, request, *args, **kwargs):
        self.object =self.get_object()
        return super().post(request, *args, **kwargs)

    def form_valid(self, form):
        comment = form.save(commit=False)
        comment.post = self.object
        comment.author =self.request.user 
        comment.save()
        return super().form_valid(form)
    
    def get_success_url(self) -> str:
        post =self.get_object()
        return reverse("post_detail", kwargs= {'pk': post.pk})

class PostDetailView(ListView):
    def get(self, request, *args, **kwargs):
        View= CommentGet.as_view()
        return View(request, *args,**kwargs)
    def post(self, request, *args, **kwargs):
        View= CommentPost.as_view()
        return View(request, *args,**kwargs)
    
class PostNewView(CreateView):
    model = Post
    template_name = 'user-panel.html' 
    form_class= PostForm
    success_url = reverse_lazy('home')

class PostDeleteView(DeleteView):
    model = Post
    template_name = 'post_delete.html'
    success_url = reverse_lazy('home')

class PostUpdateView(UpdateView):
    model = Post
    template_name = 'post_update.html'  # نام قالب به‌روزرسانی
    fields = ['title', 'exerpt', 'body', 'author', 'date', 'photo']  # فیلدهای مدنظر
    
    def get_success_url(self):
        return reverse('post_detail', kwargs={'pk': self.object.pk})  # برای بازگشت به جزئیات پست

class NewPrompt(CreateView):
    model = prompts
    template_name = 'prompt_page.html' 
    form_class= PostForm
    success_url = reverse_lazy('home')