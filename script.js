const pageReveal = document.getElementById('page-reveal');
const revCols = pageReveal ? pageReveal.querySelectorAll('.reveal-bar') : [];
const origins = ['top','bottom','top','bottom','top','bottom'];
const delays  = [0, 60, 30, 90, 15, 75];
revCols.forEach((col, i) => {
  col.style.transformOrigin = origins[i];
  col.style.transition = `transform 0.95s cubic-bezier(0.77,0,0.18,1) ${delays[i]}ms`;
  requestAnimationFrame(() => { col.style.transform = 'scaleY(0)'; });
});
setTimeout(() => { if (pageReveal) pageReveal.style.display = 'none'; }, 1200);

/* BACKGROUND PARTICLE SYSTEM */
const bgCanvas = document.getElementById('bgCanvas');
if (bgCanvas) bgCanvas.style.opacity = '1';
const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
let bgW, bgH, bgParticles = [];
function bgResize() {
  if (!bgCanvas) return;
  bgW = bgCanvas.width = window.innerWidth;
  bgH = bgCanvas.height = window.innerHeight;
}
if (bgCanvas) {
  bgResize();
  window.addEventListener('resize', bgResize);

  function mkBgParticle() {
    const colors = [[232,255,71],[77,255,239],[255,107,53]];
    const c = colors[Math.floor(Math.random() * colors.length)];
    return { x: Math.random() * bgW, y: Math.random() * bgH, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: Math.random() * 2 + .5, life: Math.random() * Math.PI * 2, speed: Math.random() * .015 + .005, color: c };
  }
  for (let i = 0; i < 80; i++) bgParticles.push(mkBgParticle());

  function drawBgParticles() {
    if (!bgCtx) return;
    bgCtx.clearRect(0, 0, bgW, bgH);
    for (let i = 0; i < bgParticles.length; i++) {
      for (let j = i + 1; j < bgParticles.length; j++) {
        const dx = bgParticles[i].x - bgParticles[j].x, dy = bgParticles[i].y - bgParticles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const a = (1 - dist / 140) * .07;
          const c = bgParticles[i].color;
          bgCtx.beginPath();
          bgCtx.moveTo(bgParticles[i].x, bgParticles[i].y);
          bgCtx.lineTo(bgParticles[j].x, bgParticles[j].y);
          bgCtx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${a})`;
          bgCtx.lineWidth = .4;
          bgCtx.stroke();
        }
      }
    }
    bgParticles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.life += p.speed;
      if (p.x < 0) p.x = bgW; if (p.x > bgW) p.x = 0;
      if (p.y < 0) p.y = bgH; if (p.y > bgH) p.y = 0;
      const alpha = (.4 + .4 * Math.sin(p.life)) * .8;
      const [r, g, b] = p.color;
      bgCtx.beginPath();
      bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      bgCtx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      bgCtx.fill();
    });
  }
  function animateBg() { drawBgParticles(); requestAnimationFrame(animateBg); }
  animateBg();
}

/* ═══ CURSOR ═══ */
document.body.style.cursor='default';
const cur=document.getElementById('cursor');
const fol=document.getElementById('cursor-follower');
if(cur && fol){
  cur.style.display='none';
  fol.style.display='none';
}

/* ═══ NAV ═══ */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>60));

/* ═══ REVEAL ═══ */
const revObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');revObs.unobserve(e.target);}});},{threshold:.04});
document.querySelectorAll('.reveal').forEach(r=>revObs.observe(r));

/* ═══ ACTIVE NAV ═══ */
const sections=document.querySelectorAll('[id]');
const navLinks=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let current='';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-200)current=s.id;});
  navLinks.forEach(a=>{a.style.color=a.getAttribute('href')==='#'+current?'var(--accent)':'';});
});
