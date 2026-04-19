/**
 * V3 Teal Wellness Theme - JavaScript
 * Handles v3-specific interactions and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // V3-specific initialization
    initV3Animations();
    initV3ScrollEffects();
    initV3Parallax();
    initV3CountUp();
});

/**
 * Initialize V3-specific animations
 */
function initV3Animations() {
    // Add floating animation to hero elements
    const heroContent = document.querySelector('.hero-v3 .hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out forwards';
    }

    // Add pulse animation to featured pricing card
    const featuredCard = document.querySelector('.pricing-card.featured');
    if (featuredCard) {
        featuredCard.classList.add('pulse');
    }
}

/**
 * Initialize V3 scroll effects
 */
function initV3ScrollEffects() {
    // Enhanced reveal animations for v3
    const revealElements = document.querySelectorAll('.reveal, .from-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Add staggered delay for program cards
                if (entry.target.classList.contains('program-card')) {
                    const cards = document.querySelectorAll('.program-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Initialize V3 parallax effects
 */
function initV3Parallax() {
    const heroBackground = document.querySelector('.hero-v3 .hero-background img');
    const tealGradient = document.querySelector('.hero-v3 .teal-gradient');
    
    if (heroBackground || tealGradient) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
            
            if (tealGradient) {
                tealGradient.style.transform = `translateY(${rate * 0.5}px)`;
            }
        });
    }
}

/**
 * Initialize V3 count-up animation
 */
function initV3CountUp() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCount(entry.target, target);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => countObserver.observe(num));
}

/**
 * Animate count-up effect
 */
function animateCount(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

/**
 * V3 smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * V3 mobile menu enhancement
 */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * V3 pricing card hover effects
 */
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = '';
        } else {
            this.style.transform = 'scale(1.05)';
        }
    });
});

/**
 * V3 program card hover effects
 */
const programCards = document.querySelectorAll('.program-card');

programCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const image = this.querySelector('.program-image');
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
    });

    card.addEventListener('mouseleave', function() {
        const image = this.querySelector('.program-image');
        if (image) {
            image.style.transform = '';
        }
    });
});

/**
 * V3 navbar scroll effect
 */
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(13, 148, 136, 0.15)';
        } else {
            navbar.style.boxShadow = '';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * V3 testimonial carousel auto-rotation (if carousel exists)
 */
const testimonialGrid = document.querySelector('.testimonials-grid');
if (testimonialGrid) {
    let currentTestimonial = 0;
    const testimonials = testimonialGrid.querySelectorAll('.testimonial-card');
    
    if (testimonials.length > 1) {
        setInterval(() => {
            testimonials[currentTestimonial].style.opacity = '0.7';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.opacity = '1';
        }, 5000);
    }
}

/**
 * V3 form validation (if forms exist)
 */
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#EF4444';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Form submission logic here
            alert('Thank you for your submission!');
            this.reset();
        }
    });
});

/**
 * V3 lazy loading enhancement
 */
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
}

/**
 * V3 accessibility enhancements
 */
document.querySelectorAll('.btn, .cta-button, .pricing-cta, .program-cta').forEach(button => {
    button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

/**
 * V3 performance optimization - Debounce resize events
 */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle resize events
        initV3ScrollEffects();
    }, 250);
});

/**
 * V3 console welcome message
 */
console.log('%c APEX GYM - V3 Teal Wellness Theme ', 'background: #0D9488; color: #FFFFFF; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Wellness-focused design with organic shapes and soft aesthetics ', 'color: #0D9488; font-size: 12px;');
