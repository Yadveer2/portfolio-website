const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    navMenu.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open navigation');
        });
    });
}

const currentYear = document.getElementById('current-year');
if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}

const scrollToTopButton = document.createElement('button');
scrollToTopButton.className = 'scroll-to-top';
scrollToTopButton.type = 'button';
scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
document.body.appendChild(scrollToTopButton);

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const updateScrollState = () => {
    const isScrolled = window.scrollY > 20;
    if (navbar) {
        navbar.classList.toggle('scrolled', isScrolled);
    }
    scrollToTopButton.classList.toggle('visible', window.scrollY > 350);
};

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

const sections = document.querySelectorAll('main section[id], body > section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (!activeLink) return;

        document.querySelectorAll('.nav-link.active').forEach((link) => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));
