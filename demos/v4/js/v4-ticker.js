/* ===== V4 TICKER / MARQUEE FUNCTIONALITY ===== */
// Magazine-style scrolling ticker for announcements and featured content

document.addEventListener('DOMContentLoaded', function() {
    initTicker();
});

// ===== TICKER INITIALIZATION =====
function initTicker() {
    const tickers = document.querySelectorAll('.v4-ticker');
    
    tickers.forEach(ticker => {
        const track = ticker.querySelector('.ticker-track');
        const items = ticker.querySelectorAll('.ticker-item');
        
        if (!track || items.length === 0) return;
        
        // Clone items for seamless looping
        items.forEach(item => {
            const clone = item.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
        });
        
        // Pause on hover
        ticker.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        ticker.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
        
        // Pause on focus for accessibility
        ticker.addEventListener('focusin', () => {
            track.style.animationPlayState = 'paused';
        });
        
        ticker.addEventListener('focusout', () => {
            track.style.animationPlayState = 'running';
        });
    });
}

// ===== TICKER CONTROLS =====
function pauseTicker(tickerId) {
    const ticker = document.getElementById(tickerId);
    if (ticker) {
        const track = ticker.querySelector('.ticker-track');
        if (track) {
            track.style.animationPlayState = 'paused';
        }
    }
}

function resumeTicker(tickerId) {
    const ticker = document.getElementById(tickerId);
    if (ticker) {
        const track = ticker.querySelector('.ticker-track');
        if (track) {
            track.style.animationPlayState = 'running';
        }
    }
}

// ===== DYNAMIC TICKER CONTENT =====
function addTickerItem(tickerId, content) {
    const ticker = document.getElementById(tickerId);
    if (ticker) {
        const track = ticker.querySelector('.ticker-track');
        if (track) {
            const newItem = document.createElement('div');
            newItem.className = 'ticker-item';
            newItem.innerHTML = content;
            track.appendChild(newItem);
        }
    }
}

// Export functions for external use
window.V4Ticker = {
    pause: pauseTicker,
    resume: resumeTicker,
    addItem: addTickerItem
};
