// Parallax scrolling effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements.length) return;

    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.3;
            const offset = scrollY * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);
    // Initial call
    updateParallax();

    // Hero background parallax
    const heroBg = document.querySelector('.hero-background');
    if (heroBg) {
        const heroParallax = () => {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.3;
            heroBg.style.transform = `translateY(${rate}px)`;
        };
        window.addEventListener('scroll', heroParallax);
    }

    // Why section image parallax
    const whyImage = document.querySelector('.why-image img');
    if (whyImage) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.addEventListener('scroll', whyParallax);
                } else {
                    window.removeEventListener('scroll', whyParallax);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(whyImage);

        function whyParallax() {
            const rect = whyImage.getBoundingClientRect();
            const offset = rect.top * 0.2;
            whyImage.style.transform = `translateY(${offset}px)`;
        }
    }
}