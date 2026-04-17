// Social Media Icons Component
// Provides scalable vector icons for Instagram, YouTube, Facebook, and TikTok
// Usage:
// 1. Include this script in your HTML: <script src="js/social-icons.js" defer></script>
// 2. Add a container with class "social-container" where you want icons to appear.
//    Or call renderSocialIcons(container) manually.

(function() {
    'use strict';

    // SVG paths for each platform (Feather Icons style)
    const icons = {
        instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>`,
        youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>`,
        facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>`,
        tiktok: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
        </svg>`
    };

    // Default configuration
    const defaultConfig = {
        platforms: ['instagram', 'youtube', 'facebook', 'tiktok'],
        urls: {
            instagram: '#',
            youtube: '#',
            facebook: '#',
            tiktok: '#'
        },
        ariaLabels: {
            instagram: 'Instagram',
            youtube: 'YouTube',
            facebook: 'Facebook',
            tiktok: 'TikTok'
        },
        className: 'social',
        iconClass: 'social-icon'
    };

    /**
     * Render social media icons into a container element.
     * @param {HTMLElement} container - The DOM element to insert icons into.
     * @param {Object} config - Configuration options (optional).
     */
    function renderSocialIcons(container, config = {}) {
        const cfg = { ...defaultConfig, ...config };
        const { platforms, urls, ariaLabels, className, iconClass } = cfg;

        const socialDiv = document.createElement('div');
        socialDiv.className = className;

        platforms.forEach(platform => {
            const link = document.createElement('a');
            link.href = urls[platform] || '#';
            link.setAttribute('aria-label', ariaLabels[platform] || platform);
            link.className = iconClass;
            link.innerHTML = icons[platform];
            socialDiv.appendChild(link);
        });

        // Clear container and append new icons
        container.innerHTML = '';
        container.appendChild(socialDiv);
    }

    /**
     * Auto‑initialize all containers with class 'social-container'.
     */
    function autoInit() {
        const containers = document.querySelectorAll('.social-container');
        containers.forEach(container => {
            renderSocialIcons(container);
        });
    }

    // Export to global scope
    window.SocialIcons = {
        render: renderSocialIcons,
        autoInit
    };

    // Auto‑initialize on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInit);
    } else {
        autoInit();
    }

})();