/* ============================================================
   ISHEGBE JESSE | HEALTH-TECH PORTFOLIO — SCRIPT
   ============================================================
   1. Mobile Navigation & Hamburger Menu
   2. Typewriter Effect
   3. Blood Compatibility Tool
   4. Skills Meter — IntersectionObserver
   5. Project Modal
   6. Theme Toggle
   7. Header Scroll Shadow
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================
       1. MOBILE NAVIGATION & HAMBURGER MENU
       ======================================================== */
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu   = document.getElementById('mobile-nav');
    const navLinks  = document.querySelectorAll('.top-nav a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    /* ========================================================
       2. TYPEWRITER EFFECT
       ======================================================== */
    const typewriterEl = document.getElementById('typewriter');
    const roles        = ['Medical Lab Scientist', 'Data Analyst', 'Web Developer', 'Python Programmer'];
    let roleIndex  = 0;
    let charIndex  = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        let typeSpeed = isDeleting ? 70 : 150;
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true; typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex  = (roleIndex + 1) % roles.length;
            typeSpeed  = 500;
        }
        setTimeout(type, typeSpeed);
    }
    if (typewriterEl) type();

    /* ========================================================
       3. BLOOD COMPATIBILITY TOOL
       ======================================================== */
    const compatibilityMap = {
        'O-':  ['O-'],
        'O+':  ['O-', 'O+'],
        'A-':  ['O-', 'A-'],
        'A+':  ['O-', 'O+', 'A-', 'A+'],
        'B-':  ['O-', 'B-'],
        'B+':  ['O-', 'O+', 'B-', 'B+'],
        'AB-': ['O-', 'A-', 'B-', 'AB-'],
        'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
    };

    const immunologyNotes = {
        'O-':  'Lacks A, B, and Rh antigens — preventing immune reactions in any recipient. Recognised as the Universal Donor in emergency transfusions.',
        'O+':  'Lacks A and B antigens but carries the Rh (D) factor. Compatible with all Rh-positive blood types.',
        'A-':  'Carries A antigens but no Rh factor. Individuals naturally produce anti-B and anti-Rh antibodies.',
        'A+':  'Carries A and Rh antigens. Produces anti-B antibodies; compatible with A and AB positive recipients.',
        'B-':  'Carries B antigens but no Rh factor. Individuals produce anti-A and anti-Rh antibodies.',
        'B+':  'Carries B and Rh antigens. Produces anti-A antibodies; compatible with B and AB positive recipients.',
        'AB-': 'Carries A and B antigens but lacks Rh. Produces no ABO antibodies; the rarest major blood group.',
        'AB+': 'Carries A, B, and Rh antigens. Produces no ABO antibodies — the Universal Recipient, capable of receiving any blood type.'
    };

    const bloodSelector = document.getElementById('blood-selector');
    const resultDiv     = document.getElementById('compatibility-result');
    const reportBox     = document.getElementById('clinical-report');
    const reportText    = document.getElementById('report-text');

    if (bloodSelector && resultDiv) {
        bloodSelector.addEventListener('change', (e) => {
            const selected = e.target.value;
            if (selected) {
                resultDiv.innerHTML     = '<span class="placeholder-text">Scanning Antigens…</span>';
                resultDiv.style.opacity = '0.5';
                if (reportBox) reportBox.style.display = 'none';

                setTimeout(() => {
                    resultDiv.style.opacity = '1';
                    resultDiv.innerHTML     = '';
                    compatibilityMap[selected].forEach(bloodType => {
                        const badge       = document.createElement('span');
                        badge.className   = 'donor-badge';
                        badge.textContent = bloodType;
                        resultDiv.appendChild(badge);
                    });
                    if (reportBox && reportText && immunologyNotes[selected]) {
                        reportText.textContent  = immunologyNotes[selected];
                        reportBox.style.display = 'block';
                    }
                }, 400);
            } else {
                resultDiv.style.opacity = '1';
                resultDiv.innerHTML     = '<span class="placeholder-text">Waiting for input…</span>';
                if (reportBox) reportBox.style.display = 'none';
            }
        });
    }

    /* ========================================================
       4. SKILLS METER — INTERSECTIONOBSERVER
       ======================================================== */
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('untethered-fill');
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skills-box').forEach(box => skillObserver.observe(box));

    /* ========================================================
       5. PROJECT MODAL
          Opens when "Launch Quiz" is clicked — shows project
          details with a direct link to the live quiz.
       ======================================================== */
    const overlay      = document.getElementById('projectOverlay');
    const closeBtn     = document.getElementById('closeModal');
    const openModalBtn = document.getElementById('openModal');

    function openModal(e) {
        if (!overlay) return;
        // If it's a direct link, open modal instead of following href
        if (e) e.preventDefault();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!overlay) return;
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (closeBtn)     closeBtn.addEventListener('click', closeModal);

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) closeModal();
    });

    /* ========================================================
       6. THEME TOGGLE
       ======================================================== */
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        const savedTheme = localStorage.getItem('portfolio_theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        themeToggle.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

        themeToggle.addEventListener('click', () => {
            const isDark   = document.body.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            themeToggle.innerText = newTheme === 'dark' ? '☀️' : '🌙';
            localStorage.setItem('portfolio_theme', newTheme);
        });
    }

    /* ========================================================
       7. HEADER SCROLL SHADOW
       ======================================================== */
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
    }

}); // end DOMContentLoaded
