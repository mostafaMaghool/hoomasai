// Enhanced Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle i');
    
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        menuToggle.classList.remove('fa-bars');
        menuToggle.classList.add('fa-times');
    } else {
        menuToggle.classList.remove('fa-times');
        menuToggle.classList.add('fa-bars');
    }
}

// Enhanced Search Toggle with Animation
function toggleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    searchInput.classList.toggle('active');
    
    if (searchInput.classList.contains('active')) {
        searchInput.focus();
        searchBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        searchBtn.innerHTML = '<i class="fas fa-search"></i><span>جستجو</span>';
        searchInput.value = '';
        showAllContent();
    }
}

// Enhanced Search Functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    if (query.length > 0) {
        searchContent(query);
    } else {
        showAllContent();
    }
});

function searchContent(query) {
    const cards = document.querySelectorAll('.prompt-card, .tool-card, .blog-card');
    let hasResults = false;
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show no results message if needed
    if (!hasResults) {
        console.log('No results found for:', query);
    }
}

function showAllContent() {
    const cards = document.querySelectorAll('.prompt-card, .tool-card, .blog-card');
    cards.forEach(card => {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.5s ease';
    });
}

// Enhanced Copy Prompt Function with Better Animation
function copyPrompt(button) {
    const promptText = button.parentElement.querySelector('p').textContent;
    
    navigator.clipboard.writeText(promptText).then(() => {
        const originalHTML = button.innerHTML;
        
        // Loading animation
        button.innerHTML = '<span class="loading"></span> در حال کپی...';
        button.style.background = 'rgba(255, 193, 7, 0.3)';
        
        setTimeout(() => {
            // Success animation
            button.innerHTML = '<i class="fas fa-check" style="margin-left: 5px;"></i> کپی شد!';
            button.style.background = 'rgba(76, 175, 80, 0.3)';
            button.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        }, 800);
        
        setTimeout(() => {
            // Reset to original
            button.innerHTML = originalHTML;
            button.style.background = 'rgba(255, 255, 255, 0.2)';
        }, 3000);
    }).catch(() => {
        button.innerHTML = '<i class="fas fa-exclamation-triangle" style="margin-left: 5px;"></i> خطا!';
        button.style.background = 'rgba(220, 53, 69, 0.3)';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = 'rgba(255, 255, 255, 0.2)';
        }, 2000);
    });
}

// Enhanced Smooth Scrolling with Offset for Fixed Header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Intersection Observer for Staggered Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); // Staggered animation
        }
    });
}, observerOptions);

// Enhanced Header Scroll Effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
    
    // Hide header on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Enhanced Tool Card Interactions
function initializeToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'pulse 0.6s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animation = '';
        });
        
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

// Parallax Effect for Hero Section
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Enhanced AI Hub Website Loaded Successfully!');
    
    // Initialize all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize enhanced features
    initializeToolCards();
    initializeParallax();
    
    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        const searchContainer = document.querySelector('.search-container');
        const searchInput = document.getElementById('searchInput');
        
        if (!searchContainer.contains(e.target) && searchInput.classList.contains('active')) {
            toggleSearch();
        }
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (!searchInput.classList.contains('active')) {
            toggleSearch();
        }
    }
    
    // Escape to close search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput.classList.contains('active')) {
            toggleSearch();
        }
    }
});
