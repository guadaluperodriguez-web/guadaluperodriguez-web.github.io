// ── STARFIELD ──
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'starfield';
  document.body.insertBefore(canvas, document.body.firstChild);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Star layers: [count, size, speed, opacity]
  const layers = [
    { count: 120, size: .6,  speed: .12, opacity: .45 },
    { count: 80,  size: 1.1, speed: .22, opacity: .6  },
    { count: 40,  size: 1.8, speed: .38, opacity: .8  },
  ];

  const stars = [];
  layers.forEach(layer => {
    for (let i = 0; i < layer.count; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: layer.size * (.8 + Math.random() * .4),
        speed: layer.speed * (.7 + Math.random() * .6),
        opacity: layer.opacity * (.6 + Math.random() * .4),
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: .003 + Math.random() * .006,
      });
    }
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
      s.twinkle += s.twinkleSpeed;
      const alpha = s.opacity * (.75 + .25 * Math.sin(s.twinkle));

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();

      // Tiny cross glint on larger stars
      if (s.r > 1.4) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * .4})`;
        ctx.lineWidth = .5;
        ctx.beginPath();
        ctx.moveTo(s.x - s.r * 2.5, s.y);
        ctx.lineTo(s.x + s.r * 2.5, s.y);
        ctx.moveTo(s.x, s.y - s.r * 2.5);
        ctx.lineTo(s.x, s.y + s.r * 2.5);
        ctx.stroke();
      }

      // Slow upward drift
      s.y -= s.speed;
      if (s.y < -4) {
        s.y = canvas.height + 4;
        s.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

// ── CUSTOM CURSOR (sin delay, interpolación suave) ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
 
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;
 
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});
 
function animateRing() {
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
