/* ======================================
   MATRIPOSHAN — Website JavaScript
   Animations, scroll effects, interactions
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    });

    // ===== MOBILE NAV TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    // ===== SCROLL REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll(
        '.problem-stat, .risk-section, .problem-detail, ' +
        '.visit-container, .solution-header, .components-section, ' +
        '.nutrition-section, .why-works, .pricing-card, .business-model, ' +
        '.timeline-item, .pillar-card, .capital-allocation, ' +
        '.scale-step, .impact-card, .sdg-section, .closing-statement, ' +
        '.team-card, .contact-container'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== STAGGERED REVEAL FOR GRIDS =====
    const staggerGroups = [
        '.risk-grid .risk-item',
        '.components-grid .component-card',
        '.nutrition-grid .nutrition-card',
        '.bm-grid .bm-card',
        '.pillars-grid .pillar-card',
        '.impact-grid .impact-card',
        '.team-grid .team-card',
        '.scale-timeline .scale-step'
    ];

    staggerGroups.forEach(selector => {
        const items = document.querySelectorAll(selector);
        items.forEach((item, i) => {
            item.classList.add('reveal');
            item.style.transitionDelay = `${i * 0.1}s`;
        });
    });

    // Re-observe stagger items
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        revealObserver.observe(el);
    });

    // ===== ANIMATED COUNTERS (Impact Section) =====
    const impactNumbers = document.querySelectorAll('.impact-number[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    impactNumbers.forEach(num => counterObserver.observe(num));

    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        const isDecimal = target % 1 !== 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ===== CAPITAL ALLOCATION BARS =====
    const allocBars = document.querySelectorAll('.alloc-fill');

    const allocObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pct = entry.target.getAttribute('data-pct');
                entry.target.style.width = pct + '%';
                allocObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    allocBars.forEach(bar => allocObserver.observe(bar));

    // ===== SMOOTH SCROLL for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== CONTACT FORM (basic handler) =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Message Sent! ✓';
            btn.style.background = '#4CAF50';
            btn.style.borderColor = '#4CAF50';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // ===== PARALLAX SUBTLE on hero =====
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroImages = document.querySelector('.hero-images');
        if (heroImages && scrolled < window.innerHeight) {
            heroImages.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    });

});
