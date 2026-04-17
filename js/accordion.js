// FAQ accordion
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (!accordionItems.length) return;

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            });

            // Open clicked item if it was closed
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Open first item by default
    if (accordionItems.length > 0) {
        const firstContent = accordionItems[0].querySelector('.accordion-content');
        accordionItems[0].classList.add('active');
        firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
    }
}