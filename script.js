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
