// Main initialization script
document.addEventListener('DOMContentLoaded', () => {
    console.log('APEX GYM — Premium Fitness Website');

    // Initialize modules
    if (typeof initNavbar === 'function') initNavbar();
    if (typeof initObserver === 'function') initObserver();
    if (typeof initParallax === 'function') initParallax();
    if (typeof initCountUp === 'function') initCountUp();
    if (typeof initCarousel === 'function') initCarousel();
    if (typeof initToggle === 'function') initToggle();
    if (typeof initTabs === 'function') initTabs();
    if (typeof initBeforeAfter === 'function') initBeforeAfter();

    // Populate dynamic content
    populatePrograms();
    populateTrainers();
    populateTestimonials();
    populateSchedule();
    populateFAQ();
    if (typeof initAccordion === 'function') initAccordion();
    populateGallery();

    // Set current year in footer
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
});

// Dynamic content generators (simulated data)
function populatePrograms() {
    const programs = [
        { category: 'STRENGTH', name: 'Strength & Powerlifting', desc: 'Build raw power with barbell fundamentals.', duration: '60 min', difficulty: 'Hard' },
        { category: 'CARDIO', name: 'HIIT & Cardio Blast', desc: 'High‑intensity intervals for maximum calorie burn.', duration: '45 min', difficulty: 'Medium' },
        { category: 'FUNCTIONAL', name: 'CrossFit / Functional Training', desc: 'Constantly varied functional movements.', duration: '60 min', difficulty: 'Hard' },
        { category: 'MOBILITY', name: 'Yoga & Mobility', desc: 'Improve flexibility and mind‑body connection.', duration: '50 min', difficulty: 'Easy' },
        { category: 'COMBAT', name: 'Boxing & MMA', desc: 'Learn striking, grappling, and self‑defense.', duration: '55 min', difficulty: 'Medium' },
        { category: 'TRANSFORM', name: 'Body Transformation Program', desc: 'Personalized plan for fat loss & muscle gain.', duration: '12 weeks', difficulty: 'Medium' },
        { category: 'PERSONAL', name: 'Personal Training (1‑on‑1)', desc: 'Tailored coaching for your specific goals.', duration: 'Custom', difficulty: 'Any' },
        { category: 'GROUP', name: 'Group Classes', desc: 'Motivating group sessions with expert trainers.', duration: '50 min', difficulty: 'Varied' }
    ];

    const container = document.querySelector('.programs-track');
    if (!container) return;
    // If container already has cards (static HTML), skip population
    if (container.children.length > 0) return;

    container.innerHTML = programs.map((program, index) => `
        <article class="program-card reveal">
            <div class="program-image-container">
                <img src="images/programs/program-${index + 1}.jpg" alt="${program.name}" class="program-image" loading="lazy">
                <span class="program-badge">${program.category}</span>
            </div>
            <div class="program-content">
                <h3 class="program-title">${program.name}</h3>
                <p class="program-description">${program.desc}</p>
                <div class="program-meta">
                    <span>${program.duration}</span>
                    <span class="difficulty">${program.difficulty}</span>
                </div>
                <a href="#" class="program-cta" aria-label="Explore ${program.name} program">Explore →</a>
            </div>
        </article>
    `).join('');
}

function populateTrainers() {
    const trainers = [
        { name: 'Marcus Stone', specialty: 'Strength & Conditioning', exp: '12 years', bio: 'Former competitive powerlifter, specializes in strength programming.', insta: '@marcusstone' },
        { name: 'Chloe Zhang', specialty: 'HIIT & Metabolic Training', exp: '8 years', bio: 'Certified HIIT coach with a background in sports science.', insta: '@chloezhang' },
        { name: 'David Rivera', specialty: 'Yoga & Mobility', exp: '10 years', bio: 'Yoga therapist focused on injury prevention and recovery.', insta: '@davidrivera' },
        { name: 'Jordan Lee', specialty: 'Boxing & Combat Sports', exp: '15 years', bio: 'Professional boxing coach with multiple championship fighters.', insta: '@jordanlee' },
        { name: 'Sophia Chen', specialty: 'Nutrition & Dietetics', exp: '9 years', bio: 'Registered dietitian creating personalized meal plans.', insta: '@sophiachen' },
        { name: 'Alex Morgan', specialty: 'Recovery & Physiotherapy', exp: '11 years', bio: 'Physiotherapist specializing in athletic recovery and rehab.', insta: '@alexmorgan' }
    ];

    const container = document.querySelector('.trainers-grid');
    if (!container) return;
    if (container.children.length > 0) return;

    container.innerHTML = trainers.map((trainer, index) => {
        const imageNum = index + 1;
        const extension = index < 4 ? '.jpg' : '.jpg.svg';
        return `
        <div class="trainer-card reveal">
            <img src="images/trainers/trainer-${imageNum}${extension}" alt="${trainer.name}" class="trainer-image" loading="lazy">
            <div class="trainer-overlay">
                <h3 class="trainer-name">${trainer.name}</h3>
                <p class="trainer-specialty">${trainer.specialty}</p>
                <p class="trainer-experience">${trainer.exp} experience</p>
                <p class="trainer-bio">${trainer.bio}</p>
                <div class="trainer-social">
                    <a href="#" aria-label="Instagram">IG</a>
                    <a href="#" aria-label="Book session">Book</a>
                </div>
            </div>
            <div class="trainer-content">
                <h3 class="trainer-name">${trainer.name}</h3>
                <p class="trainer-specialty">${trainer.specialty}</p>
            </div>
        </div>
        `;
    }).join('');
}

function populateTestimonials() {
    const testimonials = [
        { text: 'I lost 28 lbs in 12 weeks. The trainers are incredible and the community kept me motivated every single day.', author: 'Mike R.', role: 'Pro Member, 2 years', rating: 5 },
        { text: 'Best gym I’ve ever joined. The equipment is top‑notch and the recovery zone is a game‑changer.', author: 'Sarah L.', role: 'Elite Member, 1 year', rating: 5 },
        { text: 'The nutrition coaching transformed my relationship with food. I’ve never felt stronger or more energized.', author: 'James K.', role: 'Starter Member, 6 months', rating: 5 },
        { text: 'As a busy professional, the 24/7 access is a lifesaver. I can train at 5am or midnight—no compromises.', author: 'Priya M.', role: 'Pro Member, 8 months', rating: 5 },
        { text: 'The group classes are so much fun! I’ve made friends and actually look forward to working out.', author: 'Tom B.', role: 'Starter Member, 1 year', rating: 5 },
        { text: 'Incredible results. The before/after slider on this site is exactly what convinced me to join.', author: 'Lisa G.', role: 'Elite Member, 3 months', rating: 5 }
    ];

    const container = document.querySelector('.carousel-track');
    if (!container) return;

    container.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <div class="quote-icon">“</div>
            <p class="testimonial-text">${t.text}</p>
            <div class="testimonial-author">
                <img src="images/hero/hero-bg.jpg" alt="${t.author}" class="author-avatar" loading="lazy">
                <div class="author-info">
                    <h4>${t.author}</h4>
                    <p>${t.role}</p>
                    <div class="rating">
                        ${'★'.repeat(t.rating)}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function populateSchedule() {
    const container = document.querySelector('.schedule-table');
    if (!container) return;

    // Create table if not exists
    let table = container.querySelector('table');
    if (!table) {
        table = document.createElement('table');
        container.appendChild(table);
    }

    // Days of the week (Sunday first)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Generate time slots from 7:00 AM to 10:00 PM in 30-minute increments
    const timeSlots = [];
    for (let hour = 7; hour <= 22; hour++) {
        for (let minute of [0, 30]) {
            if (hour === 22 && minute === 30) break; // Stop at 10:00 PM (22:00)
            const time = new Date(0, 0, 0, hour, minute);
            const timeString = time.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            timeSlots.push(timeString);
        }
    }

    // Sample events: each event has day (0=Sunday), timeIndex (row index), and details
    const sampleEvents = [
        { day: 1, timeIndex: 4, title: 'Strength Basics', trainer: 'Marcus', duration: '60 min', difficulty: 'medium', color: 'lime' },
        { day: 2, timeIndex: 6, title: 'Morning Yoga', trainer: 'David', duration: '50 min', difficulty: 'easy', color: 'teal' },
        { day: 3, timeIndex: 8, title: 'HIIT Blast', trainer: 'Chloe', duration: '45 min', difficulty: 'hard', color: 'lime' },
        { day: 4, timeIndex: 10, title: 'Boxing Skills', trainer: 'Jordan', duration: '55 min', difficulty: 'medium', color: 'lime' },
        { day: 5, timeIndex: 12, title: 'Recovery Stretch', trainer: 'Sophia', duration: '40 min', difficulty: 'easy', color: 'teal' },
        { day: 6, timeIndex: 14, title: 'Powerlifting Workshop', trainer: 'Marcus', duration: '90 min', difficulty: 'hard', color: 'lime' },
    ];

    // Build a quick lookup map: eventsByDayAndTime[day][timeIndex] = event
    const eventsByDayAndTime = Array.from({ length: days.length }, () => ({}));
    sampleEvents.forEach(event => {
        eventsByDayAndTime[event.day][event.timeIndex] = event;
    });

    // Build table HTML
    let html = `
        <thead>
            <tr>
                <th></th>
                ${days.map(day => `<th>${day}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
    `;

    timeSlots.forEach((time, timeIdx) => {
        // Alternate row shading
        const rowClass = timeIdx % 2 === 0 ? 'even' : 'odd';
        html += `<tr class="${rowClass}">`;
        html += `<td class="time-slot">${time}</td>`;
        // Cells for each day
        for (let dayIdx = 0; dayIdx < days.length; dayIdx++) {
            const event = eventsByDayAndTime[dayIdx][timeIdx];
            if (event) {
                const difficultyClass = event.difficulty;
                const colorClass = event.color === 'teal' ? 'teal' : '';
                html += `
                    <td class="schedule-cell" data-day="${dayIdx}" data-time="${time}" tabindex="0">
                        <div class="class-slot ${colorClass}" data-filter="${difficultyClass}">
                            <div class="class-name">${event.title}</div>
                            <div class="class-trainer">${event.trainer}</div>
                            <div class="class-meta">
                                <span>${event.duration}</span>
                                <span class="difficulty">
                                    <span class="difficulty-dot ${difficultyClass}"></span>
                                    ${event.difficulty.charAt(0).toUpperCase() + event.difficulty.slice(1)}
                                </span>
                            </div>
                        </div>
                    </td>
                `;
            } else {
                html += `<td class="schedule-cell" data-day="${dayIdx}" data-time="${time}" tabindex="0"></td>`;
            }
        }
        html += '</tr>';
    });

    html += '</tbody>';
    table.innerHTML = html;

    // Add click event for interactive cell placement (optional)
    table.addEventListener('click', (e) => {
        const cell = e.target.closest('.schedule-cell');
        if (cell) {
            cell.classList.toggle('selected');
            // In a real app, you could open a modal to add an event
        }
    });
}

function populateFAQ() {
    const faqs = [
        { q: 'Is there a joining fee?', a: 'No, we have zero joining fees. Your first month’s membership is all you pay.' },
        { q: 'Can I freeze or pause my membership?', a: 'Yes, you can freeze your membership for up to 3 months per year at no extra cost.' },
        { q: 'Do I need prior experience to join?', a: 'Not at all! We offer beginner‑friendly programs and personal training to get you started.' },
        { q: 'What’s included in group classes?', a: 'All group classes are included in your membership—no extra charges.' },
        { q: 'Can I bring a guest or family member?', a: 'Yes, Pro and Elite members get guest passes each month.' },
        { q: 'Do you offer student or corporate discounts?', a: 'We offer 15% discount for students and corporate group packages.' },
        { q: 'What are your opening hours?', a: 'Main gym: 5am–11pm daily. 24/7 access for Pro and Elite members.' },
        { q: 'Is parking available on site?', a: 'Yes, we have a dedicated parking lot for members.' },
        { q: 'How do I book a personal training session?', a: 'Through our member app or at the front desk. First session is free for new members.' },
        { q: 'What is your cancellation policy?', a: 'Cancel anytime with 30 days’ notice. No lock‑in contracts.' }
    ];

    const container = document.querySelector('.accordion');
    if (!container) return;

    container.innerHTML = faqs.map((faq, i) => `
        <div class="accordion-item ${i === 0 ? 'active' : ''}">
            <button class="accordion-header">
                ${faq.q}
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content" style="${i === 0 ? 'max-height: 200px' : ''}">
                <div class="accordion-content-inner">
                    <p>${faq.a}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function populateGallery() {
    const gallery = [
        { title: 'Main Gym Floor', desc: 'State‑of‑the‑art equipment' },
        { title: 'Free Weights Zone', desc: 'Powerlifting & strength area' },
        { title: 'Cardio Deck', desc: 'Treadmills, bikes, rowers' },
        { title: 'Group Class Studio', desc: 'HIIT, yoga, spin' },
        { title: 'Boxing Ring & Bags', desc: 'Combat sports training' },
        { title: 'Recovery & Sauna', desc: 'Post‑workout relaxation' },
        { title: 'Locker Rooms', desc: 'Luxury amenities' },
        { title: 'Nutrition Bar', desc: 'Smoothies & healthy snacks' }
    ];

    const container = document.querySelector('.masonry');
    if (!container) return;

    const sizes = ['', 'wide', 'tall', 'large'];
    container.innerHTML = gallery.map((item, i) => `
        <div class="masonry-item ${sizes[i % sizes.length]}" data-index="${i}">
            <img src="images/gallery/gallery-${i + 1}.jpg" alt="${item.title}" loading="lazy">
            <div class="masonry-item-overlay">
                <h4 class="masonry-item-title">${item.title}</h4>
                <p class="masonry-item-desc">${item.desc}</p>
            </div>
        </div>
    `).join('');
}