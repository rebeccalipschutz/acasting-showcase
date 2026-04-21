// ===== ACASTING SHOWCASE — INTERACTIVE SCRIPT =====

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollObserver();
});

function initNavigation() {
    const slides = document.querySelectorAll('.slide');
    const navDots = document.getElementById('navDots');

    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => {
            slides[i].scrollIntoView({ behavior: 'smooth' });
        });
        navDots.appendChild(dot);
    });

    document.addEventListener('keydown', (e) => {
        const current = getCurrentSlideIndex();
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (current < slides.length - 1) {
                slides[current + 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            if (current > 0) {
                slides[current - 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    function getCurrentSlideIndex() {
        let closest = 0;
        let minDist = Infinity;
        slides.forEach((slide, i) => {
            const dist = Math.abs(slide.getBoundingClientRect().top);
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        });
        return closest;
    }
}

function initScrollObserver() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');
    const counter = document.getElementById('currentSlide');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(slides).indexOf(entry.target);
                dots.forEach(d => d.classList.remove('active'));
                if (dots[index]) dots[index].classList.add('active');
                if (counter) counter.textContent = index + 1;

                entry.target.querySelectorAll('.slide-content > *').forEach((el, i) => {
                    el.style.animation = 'none';
                    el.offsetHeight;
                    el.style.animation = `fadeInUp 0.6s ease-out ${i * 0.1}s both`;
                });
            }
        });
    }, { threshold: 0.5 });

    slides.forEach(slide => observer.observe(slide));
}
