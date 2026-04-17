// Before/after drag slider with touch gestures and accessibility
function initBeforeAfter() {
    const containers = document.querySelectorAll('.before-after-container');
    if (!containers.length) return;

    containers.forEach(container => {
        const beforeImage = container.querySelector('.before-image');
        const afterImage = container.querySelector('.after-image');
        const slider = container.querySelector('.slider-handle');
        let isDragging = false;
        let currentPosition = 50; // Start at 50%

        function updateSlider(x, updateAria = true) {
            const rect = container.getBoundingClientRect();
            let position = ((x - rect.left) / rect.width) * 100;
            position = Math.max(0, Math.min(100, position));
            currentPosition = position;

            beforeImage.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
            afterImage.style.clipPath = `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`;
            slider.style.left = `${position}%`;

            if (updateAria) {
                slider.setAttribute('aria-valuenow', Math.round(position));
                slider.setAttribute('aria-valuetext', `${Math.round(position)} percent`);
            }
        }

        function startDrag(e) {
            isDragging = true;
            container.classList.add('dragging');
            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag, { passive: false });
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
            e.preventDefault();
        }

        function drag(e) {
            if (!isDragging) return;
            const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            updateSlider(x);
            e.preventDefault();
        }

        function stopDrag() {
            isDragging = false;
            container.classList.remove('dragging');
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchend', stopDrag);
        }

        // Keyboard support
        function handleKeydown(e) {
            const step = 5;
            let newPosition = currentPosition;

            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowDown':
                    newPosition = Math.max(0, currentPosition - step);
                    break;
                case 'ArrowRight':
                case 'ArrowUp':
                    newPosition = Math.min(100, currentPosition + step);
                    break;
                case 'Home':
                    newPosition = 0;
                    break;
                case 'End':
                    newPosition = 100;
                    break;
                case 'PageUp':
                    newPosition = Math.min(100, currentPosition + 10);
                    break;
                case 'PageDown':
                    newPosition = Math.max(0, currentPosition - 10);
                    break;
                default:
                    return; // Exit if not a relevant key
            }

            if (newPosition !== currentPosition) {
                const rect = container.getBoundingClientRect();
                const x = rect.left + (rect.width * newPosition / 100);
                updateSlider(x);
                e.preventDefault();
            }
        }

        // Click/tap on container to move slider
        function handleContainerClick(e) {
            if (e.target === slider) return; // Don't interfere with slider drag
            const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            updateSlider(x);
        }

        // Event listeners
        slider.addEventListener('mousedown', startDrag);
        slider.addEventListener('touchstart', startDrag, { passive: false });
        container.addEventListener('mousedown', handleContainerClick);
        container.addEventListener('touchstart', handleContainerClick, { passive: false });
        slider.addEventListener('keydown', handleKeydown);

        // Prevent image drag
        beforeImage.addEventListener('dragstart', (e) => e.preventDefault());
        afterImage.addEventListener('dragstart', (e) => e.preventDefault());

        // Initialize at 50%
        const rect = container.getBoundingClientRect();
        updateSlider(rect.left + rect.width * 0.5, false);

        // Update on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newRect = container.getBoundingClientRect();
                updateSlider(newRect.left + newRect.width * (currentPosition / 100), false);
            }, 100);
        });
    });
}