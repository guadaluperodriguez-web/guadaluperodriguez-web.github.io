// ── CUSTOM CURSOR (sin delay, interpolación suave) ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
 
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;
 
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  // El punto sigue al instante
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});
 
function animateRing() {
  // Lerp suave: 0.18 = velocidad de seguimiento (0–1)
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();
 
// ── TICKER ──
const tickerItems = [
  'SQL · Intermediate', 'C# / .NET · Intermediate', 'Java · Intermediate',
  'HTML · Intermediate', 'CSS · Beginner', 'Python · Beginner',
  'Oracle NetSuite', 'Git', 'Salesforce', 'English C1',
  'Buenos Aires, Argentina', 'Systems Engineering'
];
const track = document.getElementById('ticker');
const tickerHTML = tickerItems
  .map(i => `<span class="ticker-item"><span>◆</span>${i}</span>`)
  .join('');
track.innerHTML = tickerHTML + tickerHTML;
 
// ── REVEAL ON SCROLL ──
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });
reveals.forEach(r => revealObs.observe(r));
 
// ── SKILL BARS ──
const skillList = document.getElementById('skills-list');
if (skillList) {
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          fill.style.width = fill.dataset.w + '%';
        });
      }
    });
  }, { threshold: 0.3 });
  skillObs.observe(skillList);
}
 
// ── EXPERIENCE NAV ──
document.querySelectorAll('.exp-nav-item').forEach(item => {
  item.addEventListener('click', function () {
    document.querySelectorAll('.exp-nav-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});