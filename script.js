document.addEventListener('DOMContentLoaded', () => {
    // ✅ Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 🎉 Confetti on Skill Hover (requires canvas-confetti)
    const confettiCooldown = new Set();
    if (typeof confetti !== "undefined") {
        document.querySelectorAll('.skill-tag[data-confetti="true"]').forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                if (confettiCooldown.has(skill)) return;
                confetti({
                    particleCount: 40,
                    spread: 60,
                    origin: { y: 0.6 },
                    colors: ['#00c6ff', '#ff00ff', '#ffff00']
                });
                confettiCooldown.add(skill);
                setTimeout(() => confettiCooldown.delete(skill), 1000);
            });
        });
    }

    // ✨ Hover Scaling for Buttons and Links (Accessibility Friendly)
    document.querySelectorAll('button, a').forEach(el => {
        el.style.transition = 'transform 0.2s ease';
        el.addEventListener('mouseenter', () => el.style.transform = 'scale(1.05)');
        el.addEventListener('mouseleave', () => el.style.transform = 'scale(1)');
    });
});
