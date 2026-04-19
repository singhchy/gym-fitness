/* ===== V4 VIDEO HANDLING ===== */
// Hero video background and video player functionality for magazine layout

document.addEventListener('DOMContentLoaded', function() {
    initHeroVideo();
    initVideoPlayers();
});

// ===== HERO VIDEO BACKGROUND =====
function initHeroVideo() {
    const heroSection = document.querySelector('.hero-v4');
    const videoContainer = heroSection?.querySelector('.hero-video-container');
    const video = videoContainer?.querySelector('video');
    const fallbackImage = heroSection?.querySelector('.hero-background img');
    
    if (!video || !videoContainer) return;
    
    // Video loading state
    let videoLoaded = false;
    
    // Load video when in viewport
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !videoLoaded) {
                loadVideo(video);
                videoLoaded = true;
            }
        });
    }, {
        threshold: 0.1
    });
    
    videoObserver.observe(heroSection);
    
    // Handle video errors
    video.addEventListener('error', () => {
        console.warn('Hero video failed to load, using fallback image');
        if (fallbackImage) {
            fallbackImage.style.display = 'block';
            videoContainer.style.display = 'none';
        }
    });
    
    // Pause video when not in viewport (performance)
    const pauseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && videoLoaded) {
                video.pause();
            } else if (entry.isIntersecting && videoLoaded) {
                video.play().catch(() => {
                    // Autoplay was prevented, that's okay
                });
            }
        });
    }, {
        threshold: 0.1
    });
    
    pauseObserver.observe(heroSection);
}

// ===== LOAD VIDEO =====
function loadVideo(video) {
    const src = video.getAttribute('data-src');
    if (src) {
        video.src = src;
        video.load();
        
        video.play().catch(error => {
            console.log('Autoplay prevented:', error);
            // Show play button overlay
            const playButton = document.createElement('button');
            playButton.className = 'video-play-button';
            playButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            `;
            playButton.addEventListener('click', () => {
                video.play();
                playButton.remove();
            });
            video.parentElement.appendChild(playButton);
        });
    }
}

// ===== VIDEO PLAYERS =====
function initVideoPlayers() {
    const videoPlayers = document.querySelectorAll('.v4-video-player');
    
    videoPlayers.forEach(player => {
        const video = player.querySelector('video');
        const playButton = player.querySelector('.play-button');
        const pauseButton = player.querySelector('.pause-button');
        const muteButton = player.querySelector('.mute-button');
        const progressBar = player.querySelector('.progress-bar');
        const currentTimeDisplay = player.querySelector('.current-time');
        const durationDisplay = player.querySelector('.duration');
        
        if (!video) return;
        
        // Play/Pause toggle
        const togglePlay = () => {
            if (video.paused) {
                video.play();
                playButton?.classList.add('hidden');
                pauseButton?.classList.remove('hidden');
            } else {
                video.pause();
                playButton?.classList.remove('hidden');
                pauseButton?.classList.add('hidden');
            }
        };
        
        playButton?.addEventListener('click', togglePlay);
        pauseButton?.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);
        
        // Mute toggle
        muteButton?.addEventListener('click', () => {
            video.muted = !video.muted;
            muteButton.classList.toggle('muted', video.muted);
        });
        
        // Progress bar
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = formatTime(video.currentTime);
            }
        });
        
        video.addEventListener('loadedmetadata', () => {
            if (durationDisplay) {
                durationDisplay.textContent = formatTime(video.duration);
            }
        });
        
        // Seek functionality
        player.querySelector('.progress-container')?.addEventListener('click', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        });
        
        // Keyboard controls
        player.addEventListener('keydown', (e) => {
            switch(e.key) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'm':
                    video.muted = !video.muted;
                    muteButton?.classList.toggle('muted', video.muted);
                    break;
                case 'ArrowLeft':
                    video.currentTime -= 5;
                    break;
                case 'ArrowRight':
                    video.currentTime += 5;
                    break;
                case 'f':
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    } else {
                        player.requestFullscreen();
                    }
                    break;
            }
        });
    });
}

// ===== FORMAT TIME =====
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ===== VIDEO LAZY LOADING =====
function initLazyVideos() {
    const lazyVideos = document.querySelectorAll('video[data-src]');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const src = video.getAttribute('data-src');
                
                if (src) {
                    video.src = src;
                    video.load();
                    video.removeAttribute('data-src');
                }
                
                videoObserver.unobserve(video);
            }
        });
    }, {
        rootMargin: '200px'
    });
    
    lazyVideos.forEach(video => {
        videoObserver.observe(video);
    });
}

// Export functions for external use
window.V4Video = {
    loadVideo,
    initLazyVideos
};
