/**
 * Membership Pricing Toggle
 * Handles monthly/annual pricing switch with smooth animations
 */

(function() {
    'use strict';

    // Pricing data - matches HTML structure
    const pricingData = {
        monthly: {
            prices: [29, 59, 99],
            period: 'per month',
            annualText: '$348 billed annually',
            saveText: 'Save 20%'
        },
        annual: {
            prices: [23, 47, 79], // 20% off monthly prices
            period: 'per year',
            annualText: 'Billed annually',
            saveText: 'Save 20%'
        }
    };

    // DOM Elements
    let toggle = null;
    let priceElements = [];
    let periodElements = [];
    let annualElements = [];
    let toggleButtons = [];

    /**
     * Initialize the pricing toggle
     */
    function initToggle() {
        // Get DOM elements
        toggle = document.getElementById('annual-toggle');
        priceElements = document.querySelectorAll('.price-amount');
        periodElements = document.querySelectorAll('.price-period');
        annualElements = document.querySelectorAll('.price-annual');
        toggleButtons = document.querySelectorAll('.toggle-label');

        // Exit if required elements don't exist
        if (!toggle || !priceElements.length) {
            console.warn('Membership toggle: Required elements not found');
            return;
        }

        // Add event listener to checkbox
        toggle.addEventListener('change', handleToggleChange);

        // Add click handlers to toggle buttons
        toggleButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const isAnnual = index === 1; // Second button is annual
                toggle.checked = isAnnual;
                handleToggleChange();
            });
        });

        // Add keyboard support for checkbox
        toggle.addEventListener('keydown', handleKeyDown);

        // Initialize with monthly prices
        updatePrices(false);

        // Add ARIA attributes for accessibility
        enhanceAccessibility();
    }

    /**
     * Handle toggle change event
     */
    function handleToggleChange() {
        const isAnnual = toggle.checked;
        updatePrices(isAnnual);
        updateLabels(isAnnual);
    }

    /**
     * Handle keyboard events for accessibility
     */
    function handleKeyDown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle.checked = !toggle.checked;
            handleToggleChange();
        }
    }

    /**
     * Update prices with animation
     */
    function updatePrices(isAnnual) {
        const data = isAnnual ? pricingData.annual : pricingData.monthly;

        priceElements.forEach((el, index) => {
            if (data.prices[index] !== undefined) {
                // Add animation class
                el.classList.add('animate');

                // Update price after a small delay for visual effect
                setTimeout(() => {
                    el.textContent = `$${data.prices[index]}`;
                }, 100);

                // Remove animation class after animation completes
                setTimeout(() => {
                    el.classList.remove('animate');
                }, 400);
            }
        });

        // Update period text
        periodElements.forEach(el => {
            el.textContent = data.period;
        });

        // Update annual billing text
        annualElements.forEach(el => {
            el.textContent = data.annualText;
        });
    }

    /**
     * Update toggle buttons for active state
     */
    function updateLabels(isAnnual) {
        toggleButtons.forEach((button, index) => {
            if (isAnnual) {
                if (index === 1) { // Annual button
                    button.classList.add('active');
                    button.setAttribute('aria-pressed', 'true');
                } else {
                    button.classList.remove('active');
                    button.setAttribute('aria-pressed', 'false');
                }
            } else {
                if (index === 0) { // Monthly button
                    button.classList.add('active');
                    button.setAttribute('aria-pressed', 'true');
                } else {
                    button.classList.remove('active');
                    button.setAttribute('aria-pressed', 'false');
                }
            }
        });
    }

    /**
     * Enhance accessibility with ARIA attributes
     */
    function enhanceAccessibility() {
        // Add aria-label to toggle
        toggle.setAttribute('aria-label', 'Switch between monthly and annual pricing');

        // Initialize aria-pressed on buttons
        toggleButtons.forEach((button, index) => {
            const isPressed = index === 0 ? 'true' : 'false';
            button.setAttribute('aria-pressed', isPressed);
        });
    }

    /**
     * Public API for external control
     */
    window.MembershipToggle = {
        init: initToggle,
        setAnnual: function(value) {
            if (toggle) {
                toggle.checked = value;
                handleToggleChange();
            }
        },
        getCurrentPrices: function() {
            return toggle.checked ? pricingData.annual.prices : pricingData.monthly.prices;
        }
    };

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initToggle);
    } else {
        initToggle();
    }

})();
