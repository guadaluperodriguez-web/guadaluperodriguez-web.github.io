// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
 
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  }, 80);
});
 
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