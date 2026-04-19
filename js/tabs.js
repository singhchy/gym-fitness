// Schedule filter tabs
function initTabs() {
    const filters = document.querySelectorAll('.filter');
    const scheduleRows = document.querySelectorAll('tbody tr');
    const dayTabs = document.querySelectorAll('.day-tab');
    const mobileDays = document.querySelectorAll('.mobile-day');

    if (filters.length) {
        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                const filterValue = filter.dataset.filter;

                // Update active filter
                filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');

                // Filter rows
                scheduleRows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    let hasClass = false;
                    cells.forEach(cell => {
                        const slot = cell.querySelector('.class-slot');
                        if (slot) {
                            const slotType = slot.classList.contains('teal') ? 'recovery' : 'strength'; // simplified
                            if (filterValue === 'all' || slotType === filterValue) {
                                hasClass = true;
                            }
                        }
                    });
                    row.style.display = hasClass ? '' : 'none';
                });
            });
        });
    }

    // Mobile day tabs
    if (dayTabs.length && mobileDays.length) {
        dayTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                dayTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                mobileDays.forEach(day => day.style.display = 'none');
                mobileDays[index].style.display = 'block';
            });
        });

        // Show first day by default
        if (dayTabs.length > 0) {
            dayTabs[0].click();
        }
    }
}