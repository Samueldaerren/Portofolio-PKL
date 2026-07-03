/* BACKGROUND PARTICLE SYSTEM */
const bgCanvas = document.getElementById('bgCanvas');
if (bgCanvas) {
  bgCanvas.style.opacity = '0';
}

const bgCtx = null;
let bgW, bgH, bgParticles = [];
function bgResize() {
  if (!bgCanvas) return;
  bgW = bgCanvas.width = window.innerWidth;
  bgH = bgCanvas.height = window.innerHeight;
}
if (bgCanvas) {
  bgResize();
  window.addEventListener('resize', bgResize);
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
