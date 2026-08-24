const form = document.getElementById('enquiryForm');
const result = document.getElementById('formResult');
const plan = document.getElementById('plan');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const contact = document.getElementById('contact').value.trim();
  const requirements = document.getElementById('requirements').value.trim();
  if (!name || !contact || !plan.value || !requirements) return;

  const message = [
    'Hello Hyper Indexing, I want to enquire about backlink indexing.',
    '',
    `Name: ${name}`,
    `Email / Phone: ${contact}`,
    `Plan: ${plan.value}`,
    `Requirements: ${requirements}`
  ].join('\n');

  const whatsappUrl = `https://wa.me/919310271105?text=${encodeURIComponent(message)}`;
  result.style.display = 'block';
  result.style.color = '#7df2a3';
  result.style.background = 'rgba(37,211,102,.08)';
  result.textContent = 'Opening WhatsApp with your enquiry...';
  window.open(whatsappUrl, '_blank', 'noopener');
});

document.querySelectorAll('.whatsapp-plan').forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const selectedPlan = button.dataset.plan;
    const details = button.dataset.details;
    const message = [
      'Hello Hyper Indexing, I am interested in your Backlink Indexing Service.',
      '',
      `Plan: ${selectedPlan}`,
      `Plan Details: ${details}`,
      '',
      'Please share the next steps to get started.'
    ].join('\n');
    const whatsappUrl = `https://wa.me/919310271105?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener');
  });
});

// Mobile navigation
const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.setAttribute('aria-expanded', 'false');

  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  };

  menuButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

// Client testimonial slider
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = testimonialTrack ? Array.from(testimonialTrack.querySelectorAll('.testimonial-card')) : [];
const testimonialDots = document.querySelector('.testimonial-dots');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');

if (testimonialSlider && testimonialTrack && testimonialCards.length && testimonialDots) {
  let testimonialIndex = 0;
  let autoplayTimer;
  let startX = 0;
  let dragging = false;

  const getVisibleCards = () => {
    if (window.innerWidth <= 900) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  };

  const getMaxIndex = () => Math.max(0, testimonialCards.length - getVisibleCards());

  const buildDots = () => {
    testimonialDots.innerHTML = '';
    const dotCount = getMaxIndex() + 1;
    for (let i = 0; i < dotCount; i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `testimonial-dot${i === testimonialIndex ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Show testimonial group ${i + 1}`);
      dot.setAttribute('aria-selected', String(i === testimonialIndex));
      dot.addEventListener('click', () => {
        goTo(i);
        restartAutoplay();
      });
      testimonialDots.appendChild(dot);
    }
  };

  const goTo = (index) => {
    const maxIndex = getMaxIndex();
    testimonialIndex = Math.min(Math.max(index, 0), maxIndex);
    const cardWidth = testimonialCards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(testimonialTrack).gap) || 0;
    testimonialTrack.style.transform = `translateX(-${testimonialIndex * (cardWidth + gap)}px)`;
    testimonialDots.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === testimonialIndex);
      dot.setAttribute('aria-selected', String(i === testimonialIndex));
    });
  };

  const next = () => goTo(testimonialIndex >= getMaxIndex() ? 0 : testimonialIndex + 1);
  const prev = () => goTo(testimonialIndex <= 0 ? getMaxIndex() : testimonialIndex - 1);

  const startAutoplay = () => {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(next, 5000);
  };

  const restartAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  testimonialNext?.addEventListener('click', () => { next(); restartAutoplay(); });
  testimonialPrev?.addEventListener('click', () => { prev(); restartAutoplay(); });

  testimonialSlider.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  testimonialSlider.addEventListener('mouseleave', startAutoplay);
  testimonialSlider.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    dragging = true;
    clearInterval(autoplayTimer);
  }, { passive: true });
  testimonialSlider.addEventListener('touchend', (event) => {
    if (!dragging) return;
    const distance = event.changedTouches[0].clientX - startX;
    if (Math.abs(distance) > 45) distance < 0 ? next() : prev();
    dragging = false;
    startAutoplay();
  }, { passive: true });

  window.addEventListener('resize', () => {
    testimonialIndex = Math.min(testimonialIndex, getMaxIndex());
    buildDots();
    goTo(testimonialIndex);
  });

  buildDots();
  goTo(0);
  startAutoplay();
}
