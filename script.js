const form = document.getElementById('urlForm');
const result = document.getElementById('formResult');
const textarea = document.getElementById('urls');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const urls = textarea.value.split(/\s+/).map(v => v.trim()).filter(Boolean);
  const valid = urls.filter(url => {
    try { return ['http:', 'https:'].includes(new URL(url).protocol); } catch { return false; }
  });
  if (!valid.length) {
    result.style.display = 'block';
    result.style.color = '#ffb4a8';
    result.style.background = 'rgba(255,110,90,.08)';
    result.textContent = 'Please enter at least one valid http:// or https:// URL.';
    return;
  }
  result.style.display = 'block';
  result.style.color = '';
  result.style.background = '';
  result.textContent = `${valid.length} URL${valid.length === 1 ? '' : 's'} validated and added to the demo queue.`;
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => document.querySelector('.nav-links')?.classList.remove('open'));
});