document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Confetti on skill hover (with cooldown to prevent spam)
    const confettiCooldown = new Set();
    document.querySelectorAll('.skill-tag[data-confetti="true"]').forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            if (confettiCooldown.has(skill)) return;
            confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
            confettiCooldown.add(skill);
            setTimeout(() => confettiCooldown.delete(skill), 1000);
        });
    });

    // Hover scale (smooth + accessible)
    document.querySelectorAll('button, a').forEach(el => {
        el.style.transition = 'transform 0.2s ease';
        el.addEventListener('mouseenter', () => (el.style.transform = 'scale(1.05)'));
        el.addEventListener('mouseleave', () => (el.style.transform = 'scale(1)'));
    });
});
