// IntersectionObserver for scroll‑triggered animations
function initObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it's a stagger parent, also trigger child animations
                if (entry.target.classList.contains('stagger')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        child.style.transitionDelay = `${index * 100}ms`;
                    });
                }
                // Stop observing after animation triggered
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all .reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Observe all .stagger containers
    document.querySelectorAll('.stagger').forEach(el => {
        revealObserver.observe(el);
    });

    // Observe stats for countup (handled in countup.js)
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });
}