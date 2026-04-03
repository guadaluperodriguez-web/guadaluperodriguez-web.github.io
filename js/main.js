// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('button, a, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    ring.style.width    = '52px';
    ring.style.height   = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '12px';
    cursor.style.height = '12px';
    ring.style.width    = '36px';
    ring.style.height   = '36px';
  });
});


// ─── STAR / METEOR CANVAS ────────────────────────────────────────────────────
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let W, H, stars = [], meteors = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

for (let i = 0; i < 220; i++) {
  stars.push({
    x:  Math.random() * W,
    y:  Math.random() * H,
    r:  Math.random() * 1.3 + 0.2,
    o:  Math.random() * 0.7 + 0.1,
    do: Math.random() * 0.006 - 0.003
  });
}

function spawnMeteor() {
  const colors = ['#F472B6', '#A855F7', '#EC4899'];
  meteors.push({
    x:       Math.random() * W,
    y:       Math.random() * H * 0.5,
    vx:      3 + Math.random() * 5,
    vy:      2 + Math.random() * 4,
    life:    0,
    maxLife: 60 + Math.random() * 60,
    len:     60 + Math.random() * 120,
    color:   colors[Math.floor(Math.random() * colors.length)],
    alpha:   0.6 + Math.random() * 0.4
  });
}
setInterval(spawnMeteor, 1200);

function draw() {
  ctx.clearRect(0, 0, W, H);

  // Stars
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,220,255,${s.o})`;
    ctx.fill();
    s.o += s.do;
    if (s.o < 0.05 || s.o > 0.8) s.do *= -1;
  });

  // Meteors
  meteors.forEach((m, i) => {
    const progress = m.life / m.maxLife;
    const alpha    = m.alpha * (1 - progress);
    ctx.save();
    ctx.globalAlpha  = alpha;
    ctx.strokeStyle  = m.color;
    ctx.lineWidth    = 1.5;
    ctx.shadowColor  = m.color;
    ctx.shadowBlur   = 8;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - m.len * 0.7, m.y - m.len * 0.4);
    ctx.stroke();
    ctx.restore();
    m.x += m.vx; m.y += m.vy; m.life++;
    if (m.life >= m.maxLife) meteors.splice(i, 1);
  });

  requestAnimationFrame(draw);
}
draw();


// ─── TICKER ──────────────────────────────────────────────────────────────────
const tickerItems = [
  'React', 'Node.js', 'TypeScript', 'Python', 'Figma',
  'Next.js', 'GraphQL', 'PostgreSQL', 'AWS', 'Docker',
  'Vue.js', 'FastAPI', 'Redis', 'Tailwind'
];
const track = document.getElementById('ticker');
const html  = tickerItems
  .map(t => `<span class="ticker-item"><span class="sep">◆</span>${t}</span>`)
  .join('');
track.innerHTML = html + html; // duplicate for seamless loop


// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));


// ─── SKILL BAR ANIMATION ─────────────────────────────────────────────────────
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    }
  });
}, { threshold: 0.3 });

const skillsList = document.getElementById('skills-list');
if (skillsList) skillObserver.observe(skillsList);


// ─── EXPERIENCE NAV ──────────────────────────────────────────────────────────
document.querySelectorAll('.exp-nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.exp-nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});


// ─── HERO PARALLAX ───────────────────────────────────────────────────────────
document.addEventListener('mousemove', e => {
  const dx      = (e.clientX / window.innerWidth  - 0.5) * 20;
  const dy      = (e.clientY / window.innerHeight - 0.5) * 10;
  const heroVis = document.querySelector('.hero-visual');
  if (heroVis) heroVis.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
});
