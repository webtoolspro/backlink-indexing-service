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
    'Hello IndexPilot, I want to enquire about backlink indexing.',
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

document.querySelectorAll('[data-plan]').forEach(button => {
  button.addEventListener('click', () => {
    plan.value = `${button.dataset.plan} - ` + {
      'Demo Plan':'5 URLs - ₹100',
      'Starter Plan':'20 URLs - ₹400',
      'Growth Plan':'100 URLs - ₹1,899',
      'Mega Plan':'500 URLs - ₹8,999',
      'Enterprise Plan':'2,000 URLs - ₹34,999'
    }[button.dataset.plan];
  });
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => document.querySelector('.nav-links')?.classList.remove('open'));
});