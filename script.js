const form = document.getElementById('enquiryForm');
const result = document.getElementById('formResult');
const plan = document.getElementById('plan');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const contact = document.getElementById('contact').value.trim();
  const requirements = document.getElementById('requirements').value.trim();
  if (!name || !contact || !plan.value || !requirements) return;
  const message = ['Hello Hyper Indexing, I want to enquire about backlink indexing.','',`Name: ${name}`,`Email / Phone: ${contact}`,`Plan: ${plan.value}`,`Requirements: ${requirements}`].join('\n');
  const whatsappUrl = `https://wa.me/919310271105?text=${encodeURIComponent(message)}`;
  result.style.display = 'block'; result.style.color = '#7df2a3'; result.style.background = 'rgba(37,211,102,.08)'; result.textContent = 'Opening WhatsApp with your enquiry...';
  window.open(whatsappUrl, '_blank', 'noopener');
});

document.querySelectorAll('.whatsapp-plan').forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const message = ['Hello Hyper Indexing, I am interested in your Backlink Indexing Service.','',`Plan: ${button.dataset.plan}`,`Plan Details: ${button.dataset.details}`,'','Please share the next steps to get started.'].join('\n');
    window.open(`https://wa.me/919310271105?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
});

// Mobile navigation
const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuButton && navLinks) {
  menuButton.setAttribute('aria-expanded', 'false');
  const closeMenu = () => { navLinks.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.textContent = '☰'; };
  menuButton.addEventListener('click', (event) => { event.stopPropagation(); const isOpen = navLinks.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(isOpen)); menuButton.textContent = isOpen ? '✕' : '☰'; });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => { if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
}

// Responsive multi-card testimonial carousel
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = testimonialTrack ? Array.from(testimonialTrack.querySelectorAll('.testimonial-card')) : [];
const testimonialDots = document.querySelector('.testimonial-dots');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');

if (testimonialSlider && testimonialTrack && testimonialCards.length && testimonialDots) {
  let index = 0;
  let timer;
  let startX = 0;

  const getVisibleCards = () => {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  };

  const getMaxIndex = () => Math.max(0, testimonialCards.length - getVisibleCards());

  const getStep = () => {
    const firstCard = testimonialCards[0];
    if (!firstCard) return testimonialSlider.clientWidth;
    const styles = window.getComputedStyle(testimonialTrack);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return firstCard.getBoundingClientRect().width + gap;
  };

  const renderDots = () => {
    const maxIndex = getMaxIndex();
    testimonialDots.innerHTML = '';
    for (let i = 0; i <= maxIndex; i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `testimonial-dot${i === index ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Show testimonial group ${i + 1}`);
      dot.setAttribute('aria-selected', String(i === index));
      dot.addEventListener('click', () => { goTo(i); restart(); });
      testimonialDots.appendChild(dot);
    }
  };

  const goTo = (nextIndex) => {
    const maxIndex = getMaxIndex();
    index = Math.min(Math.max(nextIndex, 0), maxIndex);
    testimonialTrack.style.transform = `translate3d(-${index * getStep()}px,0,0)`;
    testimonialDots.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-selected', String(i === index));
    });
  };

  const next = () => goTo(index >= getMaxIndex() ? 0 : index + 1);
  const prev = () => goTo(index <= 0 ? getMaxIndex() : index - 1);
  const start = () => { clearInterval(timer); timer = setInterval(next, 5000); };
  const restart = () => { clearInterval(timer); start(); };

  testimonialNext.addEventListener('click', () => { next(); restart(); });
  testimonialPrev.addEventListener('click', () => { prev(); restart(); });
  testimonialSlider.addEventListener('mouseenter', () => clearInterval(timer));
  testimonialSlider.addEventListener('mouseleave', start);
  testimonialSlider.addEventListener('touchstart', event => { startX = event.touches[0].clientX; clearInterval(timer); }, { passive: true });
  testimonialSlider.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].clientX - startX;
    if (Math.abs(distance) > 45) distance < 0 ? next() : prev();
    start();
  }, { passive: true });
  window.addEventListener('resize', () => { renderDots(); goTo(index); });

  renderDots();
  goTo(0);
  start();
}
