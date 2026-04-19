/* ===== V4 MAGAZINE LAYOUT JAVASCRIPT ===== */
// V4-specific functionality for magazine-style asymmetric layouts

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all V4 components
    initScrollReveal();
    initParallaxEffect();
    initSmoothScroll();
    initMobileMenu();
    initDropdownMenu();
    initCountUpAnimation();
    initProgramCardHover();
    initPricingCardHover();
});

// ===== SCROLL REVEAL ANIMATION =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-v4 .hero-background');
    
    if (!heroBackground) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        heroBackground.style.transform = `translateY(${rate}px)`;
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    
    if (!hamburger || !mobileMenu) return;
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// ===== DROPDOWN MENU =====
function initDropdownMenu() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!toggle || !menu) return;
        
        // Handle hover for desktop
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                menu.classList.add('active');
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                menu.classList.remove('active');
            }
        });
        
        // Handle click for mobile
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                menu.classList.toggle('active');
            }
        });
    });
}

// ===== COUNT UP ANIMATION =====
function initCountUpAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                
                animateCount(target, countTo);
                countObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(number => {
        countObserver.observe(number);
    });
}

function animateCount(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===== PROGRAM CARD HOVER EFFECT =====
function initProgramCardHover() {
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
}

// ===== PRICING CARD HOVER EFFECT =====
function initPricingCardHover() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Remove hover from all cards
            pricingCards.forEach(c => c.classList.remove('hovered'));
            // Add hover to current card
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
}

// ===== MAGAZINE LAYOUT UTILITIES =====
const V4Utils = {
    // Add staggered animation delay to elements
    addStaggerDelay: (elements, baseDelay = 100) => {
        elements.forEach((element, index) => {
            element.style.transitionDelay = `${index * baseDelay}ms`;
        });
    },
    
    // Create magazine-style text overlay
    createTextOverlay: (text, position = 'bottom-left') => {
        const overlay = document.createElement('div');
        overlay.className = `magazine-text-overlay ${position}`;
        overlay.textContent = text;
        return overlay;
    },
    
    // Add diagonal slash effect
    addDiagonalSlash: (element) => {
        element.classList.add('diagonal-slash');
    },
    
    // Create editorial badge
    createBadge: (text, type = 'default') => {
        const badge = document.createElement('span');
        badge.className = `editorial-badge ${type}`;
        badge.textContent = text;
        return badge;
    }
};

// Export for external use
window.V4Utils = V4Utils;

// ===== WINDOW RESIZE HANDLER =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle resize-specific logic
        handleResize();
    }, 250);
});

function handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const mobileMenu = document.querySelector('.mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});

// ===== LAZY LOADING ENHANCEMENT =====
// Enhance native lazy loading with fade-in effect
document.addEventListener('lazyloaded', function(e) {
    e.target.classList.add('loaded');
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c APEX GYM - V4 Magazine Layout ', 'background: #FF3B30; color: #FFFFFF; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%c Editorial design with asymmetric grids ', 'color: #8E8E93; font-size: 12px;');
