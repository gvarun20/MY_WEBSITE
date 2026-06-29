/* ============================================
   VARUN GURUPURANDAR — Portfolio Script
   ============================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Custom Cursor ----
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .project-card, .skill-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
      cursorRing.style.borderColor = 'rgba(0, 245, 160, 0.8)';
      cursorDot.style.transform = 'translate(-50%, -50%) scale(0)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.borderColor = 'rgba(0, 245, 160, 0.5)';
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
} else {
  cursorDot.style.display = 'none';
  cursorRing.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// ---- Particle Canvas Background ----
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let particlesRunning = !prefersReducedMotion;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.7 ? '#00f5a0' : Math.random() > 0.5 ? '#00d9f5' : '#ffffff';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 12000);
  for (let i = 0; i < Math.min(count, 120); i++) particles.push(new Particle());
}

function drawConnections() {
  const maxDist = 120;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = '#00f5a0';
        ctx.globalAlpha = (1 - dist / maxDist) * 0.05;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  if (!particlesRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}

if (particlesRunning) {
  initParticles();
  window.addEventListener('resize', initParticles);
  animateParticles();
  document.addEventListener('visibilitychange', () => {
    particlesRunning = !document.hidden;
    if (particlesRunning) animateParticles();
  });
} else {
  canvas.style.display = 'none';
}

// ---- Navbar Scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ---- Hamburger / Mobile Nav ----
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

document.querySelectorAll('.mobile-link, .mobile-resume').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  }
});

// ---- Typing Animation ----
const phrases = [
  'intelligent NLP systems.',
  'ML-powered APIs.',
  'data engineering pipelines.',
  'AI that scales.',
  'PyTorch deep learning models.',
  'impactful data products.',
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeLoop() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeLoop, 500);
      return;
    }
    setTimeout(typeLoop, 40);
  } else {
    typingEl.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
    setTimeout(typeLoop, 70);
  }
}

if (!prefersReducedMotion) typeLoop();
else typingEl.textContent = phrases[0];

// ---- Animated Stats Counter ----
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = 'true';
  const target = parseInt(el.dataset.target);
  let current = 0;
  const duration = 1500;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

// ---- Skill Bar Animations ----
function animateSkillBars(container) {
  container.querySelectorAll('.skill-bar').forEach(bar => {
    bar.style.width = bar.dataset.width + '%';
  });
  container.querySelectorAll('.lang-fill').forEach(fill => {
    fill.style.width = fill.dataset.width + '%';
  });
}

// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('skills') ||
          entry.target.querySelector('.skill-bar') ||
          entry.target.querySelector('.lang-fill')) {
        animateSkillBars(entry.target);
      }
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(sec => {
  revealObserver.observe(sec);
  sec.querySelectorAll('.skill-card, .project-card, .cert-card, .timeline-item, .focus-card').forEach(el => {
    el.classList.add('scroll-reveal');
    revealObserver.observe(el);
  });
});

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars(entry.target);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  skillObserver.observe(skillsSection);
}

// ---- Project Filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'revealUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ---- Active nav link ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35, rootMargin: '-20% 0px -55% 0px' });

sections.forEach(sec => navObserver.observe(sec));

// ---- Contact form (FormSubmit) ----
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = 'Sending...';
    btn.style.opacity = '0.7';
    formStatus.className = 'form-status';
    formStatus.classList.remove('show');

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = 'Message sent! I\'ll get back to you soon.';
        formStatus.className = 'form-status show success';
        contactForm.reset();
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Sent!`;
      } else {
        throw new Error('Failed');
      }
    } catch {
      formStatus.textContent = 'Something went wrong. Please email me directly at vargu125@student.liu.se';
      formStatus.className = 'form-status show error';
      btn.innerHTML = originalHTML;
    }

    btn.disabled = false;
    btn.style.opacity = '1';
    setTimeout(() => { btn.innerHTML = originalHTML; }, 3000);
  });
}

// ---- Parallax on hero photo ----
if (!prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && scrollY < window.innerHeight) {
      heroVisual.style.transform = `translateY(${scrollY * 0.08}px)`;
    }
  });
}
