        // منوی موبایل
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // اسلایدر
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        const totalSlides = slides.length;

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + totalSlides) % totalSlides;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // تنظیم اسلایدر اتوماتیک
        let slideInterval = setInterval(nextSlide, 5000);

        // کنترل‌های اسلایدر
        document.querySelector('.slider-next').addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });

        document.querySelector('.slider-prev').addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });

        // تب‌های جستجو
        const searchTabs = document.querySelectorAll('.search-tab');
        const searchContents = document.querySelectorAll('.search-content');

        searchTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                
                // حذف کلاس active از همه تب‌ها و محتواها
                searchTabs.forEach(t => t.classList.remove('active'));
                searchContents.forEach(c => c.classList.remove('active'));
                
                // اضافه کردن کلاس active به تب و محتوای مربوطه
                tab.classList.add('active');
                document.getElementById(tabId + '-search').classList.add('active');
            });
        });

        // فعال کردن تب راننده
        function activateDriverTab() {
            // حذف کلاس active از همه تب‌ها و محتواها
            searchTabs.forEach(t => t.classList.remove('active'));
            searchContents.forEach(c => c.classList.remove('active'));
            
            // اضافه کردن کلاس active به تب راننده و محتوای آن
            const driverTab = document.querySelector('[data-tab="driver"]');
            driverTab.classList.add('active');
            document.getElementById('driver-search').classList.add('active');
            
            // اسکرول به بخش جستجو
            document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
        }
        
// مدیریت منوی پروفایل کاربری
const userProfile = document.getElementById('userProfile');
const profileDropdown = document.getElementById('profileDropdown');

if (userProfile && profileDropdown) {
    userProfile.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
        
        // اگر باکس جستجو باز است، آن را ببندید
        if (searchBox.classList.contains('active')) {
            searchBox.classList.remove('active');
        }
    });
    
    // بستن منوی پروفایل با کلیک بیرون از آن
    document.addEventListener('click', function(e) {
        if (!userProfile.contains(e.target)) {
            profileDropdown.classList.remove('active');
        }
    });
}

// مدیریت منوی اعلان‌ها
const notifications = document.getElementById('notifications');
const notificationDropdown = document.getElementById('notificationDropdown');

if (notifications && notificationDropdown) {
    notifications.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationDropdown.classList.toggle('active');

        // اگر باکس جستجو یا منوی پروفایل باز است، آن را ببندید
        if (searchBox.classList.contains('active')) {
            searchBox.classList.remove('active');
        }
        if (profileDropdown.classList.contains('active')) {
            profileDropdown.classList.remove('active');
        }
    });

    // بستن منوی اعلان‌ها با کلیک بیرون از آن
    document.addEventListener('click', function(e) {
        if (!notifications.contains(e.target)) {
            notificationDropdown.classList.remove('active');
        }
    });

    // علامت‌گذاری یک اعلان به عنوان خوانده شده
    const markReadButtons = document.querySelectorAll('.mark-read');
    markReadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const notificationItem = this.closest('.notification-item');
            notificationItem.classList.remove('unread');
            updateNotificationBadge();
        });
    });

    // علامت‌گذاری همه اعلان‌ها به عنوان خوانده شده
    const markAllReadButton = document.querySelector('.mark-all-read');
    markAllReadButton.addEventListener('click', function(e) {
        e.stopPropagation();
        const unreadNotifications = document.querySelectorAll('.notification-item.unread');
        unreadNotifications.forEach(notification => {
            notification.classList.remove('unread');
        });
        updateNotificationBadge();
    });

    // به‌روزرسانی نشان اعلان
    function updateNotificationBadge() {
        const unreadCount = document.querySelectorAll('.notification-item.unread').length;
        const notificationBadge = document.querySelector('.notification-badge');
        notificationBadge.textContent = unreadCount;

        if (unreadCount === 0) {
            notificationBadge.style.display = 'none';
        } else {
            notificationBadge.style.display = 'flex';
        }
    }

    // مقداردهی اولیه نشان اعلان
    updateNotificationBadge();
}
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Deactivate all tabs and content
            searchTabs.forEach(t => t.classList.remove('active'));
            searchContents.forEach(c => c.classList.remove('active'));

            // Activate the clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId + '-search').classList.add('active');
        });
    });
    /**
 * سیستم سبد خرید
 *
 * این فایل شامل توابع مدیریت سبد خرید است
 */

// کلاس اصلی سبد خرید
class ShoppingCart {
    constructor() {
      // کلید ذخیره سازی در localStorage
      this.storageKey = "safarino_cart"
  
      // دریافت محتوای سبد خرید از localStorage
      this.cartItems = JSON.parse(localStorage.getItem(this.storageKey)) || []
  
      // مقداردهی اولیه تعداد آیتم‌های سبد خرید
      this.updateCartCount()
  
      // اضافه کردن ایونت‌ها به دکمه‌های مرتبط با سبد خرید
      this.setupEventListeners()
    }
  
    // راه‌اندازی ایونت‌های مربوط به سبد خرید
    setupEventListeners() {
      // نمایش و مخفی کردن منوی سبد خرید
      const cartIcon = document.getElementById("cartIcon")
      const cartDropdown = document.getElementById("cartDropdown")
  
      if (cartIcon && cartDropdown) {
        cartIcon.addEventListener("click", (e) => {
          e.stopPropagation()
          cartDropdown.classList.toggle("active")
  
          // بستن سایر منوها
          const searchBox = document.getElementById("searchBox")
          const profileDropdown = document.getElementById("profileDropdown")
          const notificationDropdown = document.getElementById("notificationDropdown")
  
          if (searchBox && searchBox.classList.contains("active")) {
            searchBox.classList.remove("active")
          }
  
          if (profileDropdown && profileDropdown.classList.contains("active")) {
            profileDropdown.classList.remove("active")
          }
  
          if (notificationDropdown && notificationDropdown.classList.contains("active")) {
            notificationDropdown.classList.remove("active")
          }
        })
  
        // بستن منوی سبد خرید با کلیک بیرون از آن
        document.addEventListener("click", (e) => {
          if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
            cartDropdown.classList.remove("active")
          }
        })
      }
  
      // دکمه‌های افزودن به سبد خرید
      const addToCartButtons = document.querySelectorAll(".add-to-cart-btn")
      addToCartButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault()
  
          const productType = button.getAttribute("data-type") // hotel یا tour
          const productId = button.getAttribute("data-id")
          const productName = button.getAttribute("data-name")
          const productPrice = Number.parseFloat(button.getAttribute("data-price"))
          const productImage = button.getAttribute("data-image")
  
          this.addToCart({
            id: productId,
            type: productType,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1,
          })
  
          // نمایش پیام موفقیت
          this.showNotification(`${productName} به سبد خرید اضافه شد.`)
        })
      })
  
      // بررسی اگر در صفحه سبد خرید هستیم
      if (window.location.pathname.includes("cart.html")) {
        this.renderCartPage()
  
        // افزودن ایونت به دکمه‌های بروزرسانی و حذف
        document.addEventListener("click", (e) => {
          if (e.target.classList.contains("update-quantity-btn")) {
            const itemId = e.target.getAttribute("data-id")
            const itemType = e.target.getAttribute("data-type")
            const quantityInput = document.querySelector(`.quantity-input[data-id="${itemId}"][data-type="${itemType}"]`)
  
            if (quantityInput) {
              const newQuantity = Number.parseInt(quantityInput.value)
              this.updateQuantity(itemId, itemType, newQuantity)
            }
          }
  
          if (e.target.classList.contains("remove-item-btn")) {
            const itemId = e.target.getAttribute("data-id")
            const itemType = e.target.getAttribute("data-type")
            this.removeFromCart(itemId, itemType)
          }
        })
  
        // ایونت دکمه پرداخت
        const checkoutButton = document.getElementById("checkoutButton")
        if (checkoutButton) {
          checkoutButton.addEventListener("click", () => {
            if (this.cartItems.length > 0) {
              alert("انتقال به درگاه پرداخت...")
              // در اینجا می‌توان به صفحه پرداخت هدایت کرد
            } else {
              alert("سبد خرید شما خالی است.")
            }
          })
        }
      }
    }
  
    // افزودن محصول به سبد خرید
    addToCart(item) {
      // بررسی وجود محصول در سبد خرید
      const existingItemIndex = this.cartItems.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.type === item.type,
      )
  
      if (existingItemIndex !== -1) {
        // اگر محصول قبلاً در سبد خرید وجود دارد، تعداد آن را افزایش دهید
        this.cartItems[existingItemIndex].quantity += item.quantity
      } else {
        // افزودن محصول جدید به سبد خرید
        this.cartItems.push(item)
      }
  
      // ذخیره سبد خرید در localStorage
      this.saveCart()
  
      // بروزرسانی رابط کاربری
      this.updateCartUI()
    }
  
    // حذف محصول از سبد خرید
    removeFromCart(itemId, itemType) {
      this.cartItems = this.cartItems.filter((item) => !(item.id === itemId && item.type === itemType))
  
      // ذخیره تغییرات
      this.saveCart()
  
      // بروزرسانی رابط کاربری
      if (window.location.pathname.includes("cart.html")) {
        this.renderCartPage()
      } else {
        this.updateCartUI()
      }
  
      this.showNotification("محصول از سبد خرید حذف شد.")
    }
  
    // بروزرسانی تعداد محصول
    updateQuantity(itemId, itemType, newQuantity) {
      if (newQuantity < 1) {
        newQuantity = 1
      }
  
      const itemIndex = this.cartItems.findIndex((item) => item.id === itemId && item.type === itemType)
  
      if (itemIndex !== -1) {
        this.cartItems[itemIndex].quantity = newQuantity
        this.saveCart()
  
        if (window.location.pathname.includes("cart.html")) {
          this.updateCartPageTotals()
        } else {
          this.updateCartUI()
        }
  
        this.showNotification("تعداد محصول بروزرسانی شد.")
      }
    }
  
    // ذخیره سبد خرید در localStorage
    saveCart() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems))
      this.updateCartCount()
    }
  
    // بروزرسانی تعداد آیتم‌های سبد خرید در نشانگر
    updateCartCount() {
      const cartBadge = document.getElementById("cartCount")
      if (cartBadge) {
        const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0)
        cartBadge.textContent = totalItems.toString()
  
        if (totalItems === 0) {
          cartBadge.style.display = "none"
        } else {
          cartBadge.style.display = "flex"
        }
      }
    }
  
    // بروزرسانی رابط کاربری سبد خرید در منوی کشویی هدر
    updateCartUI() {
      const cartItemsList = document.getElementById("cartItemsList")
      const cartTotal = document.getElementById("cartTotal")
      const emptyCartMessage = document.getElementById("emptyCartMessage")
      const cartDropdownFooter = document.getElementById("cartDropdownFooter")
  
      if (cartItemsList && cartTotal && emptyCartMessage && cartDropdownFooter) {
        if (this.cartItems.length === 0) {
          cartItemsList.innerHTML = ""
          emptyCartMessage.style.display = "block"
          cartDropdownFooter.style.display = "none"
          cartTotal.textContent = "۰"
        } else {
          emptyCartMessage.style.display = "none"
          cartDropdownFooter.style.display = "flex"
  
          // ایجاد لیست محصولات سبد خرید
          cartItemsList.innerHTML = ""
          let totalPrice = 0
  
          this.cartItems.forEach((item) => {
            const itemTotal = item.price * item.quantity
            totalPrice += itemTotal
  
            const itemElement = document.createElement("div")
            itemElement.className = "cart-item"
            itemElement.innerHTML = `
              <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${this.formatPrice(item.price)} تومان</div>
                <div class="cart-item-quantity">تعداد: ${item.quantity}</div>
              </div>
              <button class="remove-from-cart" data-id="${item.id}" data-type="${item.type}">
                <i class="fas fa-times"></i>
              </button>
            `
  
            cartItemsList.appendChild(itemElement)
          })
  
          // بروزرسانی مجموع قیمت
          cartTotal.textContent = this.formatPrice(totalPrice)
  
          // افزودن ایونت به دکمه‌های حذف
          const removeButtons = cartItemsList.querySelectorAll(".remove-from-cart")
          removeButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
              e.preventDefault()
              const itemId = button.getAttribute("data-id")
              const itemType = button.getAttribute("data-type")
              this.removeFromCart(itemId, itemType)
            })
          })
        }
      }
  
      // بروزرسانی تعداد آیتم‌ها
      this.updateCartCount()
    }
  
    // نمایش صفحه سبد خرید
    renderCartPage() {
      const cartTableBody = document.getElementById("cartTableBody")
      const cartSummaryTotal = document.getElementById("cartSummaryTotal")
      const emptyCartPage = document.getElementById("emptyCartPage")
      const cartContent = document.getElementById("cartContent")
  
      if (cartTableBody && cartSummaryTotal && emptyCartPage && cartContent) {
        if (this.cartItems.length === 0) {
          // نمایش پیام سبد خرید خالی
          emptyCartPage.style.display = "flex"
          cartContent.style.display = "none"
        } else {
          // نمایش محتوای سبد خرید
          emptyCartPage.style.display = "none"
          cartContent.style.display = "block"
  
          // ایجاد ردیف‌های جدول سبد خرید
          cartTableBody.innerHTML = ""
          let totalPrice = 0
  
          this.cartItems.forEach((item) => {
            const itemTotal = item.price * item.quantity
            totalPrice += itemTotal
  
            const row = document.createElement("tr")
            row.className = "cart-table-row"
            row.innerHTML = `
              <td class="cart-product">
                <div class="cart-product-info">
                  <img src="${item.image}" alt="${item.name}" class="cart-product-image">
                  <div class="cart-product-details">
                    <h4 class="cart-product-name">${item.name}</h4>
                    <p class="cart-product-type">${item.type === "hotel" ? "هتل" : "تور"}</p>
                  </div>
                </div>
              </td>
              <td class="cart-price">${this.formatPrice(item.price)} تومان</td>
              <td class="cart-quantity">
                <div class="quantity-control">
                  <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-id="${item.id}" data-type="${item.type}">
                  <button class="update-quantity-btn" data-id="${item.id}" data-type="${item.type}">بروزرسانی</button>
                </div>
              </td>
              <td class="cart-total">${this.formatPrice(itemTotal)} تومان</td>
              <td class="cart-actions">
                <button class="remove-item-btn" data-id="${item.id}" data-type="${item.type}">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            `
  
            cartTableBody.appendChild(row)
          })
  
          // بروزرسانی مجموع
          cartSummaryTotal.textContent = this.formatPrice(totalPrice)
        }
      }
    }
  
    // بروزرسانی مجموع قیمت‌ها در صفحه سبد خرید
    updateCartPageTotals() {
      const cartTableRows = document.querySelectorAll(".cart-table-row")
      const cartSummaryTotal = document.getElementById("cartSummaryTotal")
      let totalPrice = 0
  
      cartTableRows.forEach((row) => {
        const itemId = row.querySelector(".quantity-input").getAttribute("data-id")
        const itemType = row.querySelector(".quantity-input").getAttribute("data-type")
        const item = this.cartItems.find((i) => i.id === itemId && i.type === itemType)
  
        if (item) {
          const itemTotal = item.price * item.quantity
          totalPrice += itemTotal
  
          // بروزرسانی قیمت کل برای هر ردیف
          row.querySelector(".cart-total").textContent = `${this.formatPrice(itemTotal)} تومان`
        }
      })
  
      // بروزرسانی مجموع کل
      if (cartSummaryTotal) {
        cartSummaryTotal.textContent = this.formatPrice(totalPrice)
      }
    }
  
    // نمایش اعلان
    showNotification(message) {
      // بررسی وجود المان اعلان
      let notification = document.getElementById("cartNotification")
  
      // ایجاد المان اعلان اگر وجود ندارد
      if (!notification) {
        notification = document.createElement("div")
        notification.id = "cartNotification"
        notification.className = "cart-notification"
        document.body.appendChild(notification)
      }
  
      // نمایش پیام
      notification.textContent = message
      notification.classList.add("show")
  
      // پنهان کردن پیام بعد از 3 ثانیه
      setTimeout(() => {
        notification.classList.remove("show")
      }, 3000)
    }
  
    // قالب‌بندی قیمت
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }
  
  // راه‌اندازی سبد خرید در هنگام بارگذاری صفحه
  document.addEventListener("DOMContentLoaded", () => {
    window.shoppingCart = new ShoppingCart()
  })

document.addEventListener('DOMContentLoaded', function() {
    // تنظیمات مشترک برای همه کاروسل‌ها
    const commonSettings = {
        direction: 'rtl',
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        slidesPerView: 'auto',
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 25
            }
        }
    };

    // کاروسل تورها
    new Swiper('.tours-container', {
        ...commonSettings,
        pagination: {
            el: '.tours-pagination',
            clickable: true,
        },
    });

    // کاروسل هتل‌ها
    new Swiper('.hotels-container', {
        ...commonSettings,
        pagination: {
            el: '.hotels-pagination',
            clickable: true,
        },
    });

    // کاروسل مقالات
    new Swiper('.blog-posts-container', {
        ...commonSettings,
        pagination: {
            el: '.blog-pagination',
            clickable: true,
        },
    });

    // کاروسل دیدنی‌ها
    new Swiper('.attractions-container', {
        ...commonSettings,
        pagination: {
            el: '.attractions-pagination',
            clickable: true,
        },
    });
});
  