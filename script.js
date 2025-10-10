// Smooth scrolling for nav links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Confetti on skill hover
    const skills = document.querySelectorAll('.skill-tag[data-confetti="true"]');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 }
            });
        });
    });

    // Hover scale for buttons and project links
    const interactiveElements = document.querySelectorAll('button, a');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            el.style.transform = 'scale(1.05)';
        });
        el.addEventListener('mouseout', () => {
            el.style.transform = 'scale(1)';
        });
    });
});