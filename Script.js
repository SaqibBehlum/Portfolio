// Edit these three lines. Every link and email on the page updates from here.
var EMAIL = 'behlumsaqibali@gmail.com';
var GITHUB = 'https://github.com/SaqibBehlum';
var LINKEDIN = 'https://www.linkedin.com/in/saqibahmedbehlum/';

document.querySelectorAll('.em').forEach(function (e) { e.textContent = EMAIL; });
document.querySelectorAll('[data-l]').forEach(function (a) {
  var k = a.dataset.l;
  a.href = k === 'mail' ? 'mailto:' + EMAIL : k === 'github' ? GITHUB : LINKEDIN;
  if (k !== 'mail') { a.target = '_blank'; a.rel = 'noopener'; }
});
document.getElementById('y').textContent = new Date().getFullYear();

// Live clock for Pakistan
var clock = document.getElementById('clock');
function tick() {
  clock.textContent = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
tick(); setInterval(tick, 1000);

// Copy email buttons
document.querySelectorAll('.copy').forEach(function (b) {
  b.addEventListener('click', function () {
    var t = b.querySelector('.t');
    var done = function () {
      b.classList.add('ok'); if (t) t.textContent = 'Copied';
      setTimeout(function () { b.classList.remove('ok'); if (t) t.textContent = 'Copy Email'; }, 1600);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(EMAIL).then(done, done); else done();
  });
});

// Sidebar slides in after you scroll past most of the first screen
var home = document.getElementById('home');
function onScroll() { document.body.classList.toggle('side-on', window.scrollY > home.offsetHeight * 0.55); }
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

// Sidebar turns dark while the projects section is on screen
var projects = document.getElementById('projects');
new IntersectionObserver(function (l) { document.body.classList.toggle('on-dark', l[0].isIntersecting); },
  { rootMargin: '-50% 0px -50% 0px' }).observe(projects);

// Reveal sections as they scroll into view
var io = new IntersectionObserver(function (list) {
  list.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('vis'); io.unobserve(x.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.rv, .proj').forEach(function (s) { io.observe(s); });

// Highlight the current section in the sidebar
var links = document.querySelectorAll('.sn a');
var spy = new IntersectionObserver(function (list) {
  list.forEach(function (x) {
    if (x.isIntersecting) links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + x.target.id); });
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(function (s) { spy.observe(s); });

// Project filters and scroll progress bar
var rail = document.getElementById('rail'), bar = document.getElementById('bar');
function prog() {
  var w = rail.scrollWidth || 1;
  bar.style.width = Math.min(100, rail.clientWidth / w * 100) + '%';
  bar.style.left = rail.scrollLeft / w * 100 + '%';
}
rail.addEventListener('scroll', prog, { passive: true }); window.addEventListener('resize', prog); prog();
document.querySelectorAll('.fl').forEach(function (b) {
  b.addEventListener('click', function () {
    document.querySelectorAll('.fl').forEach(function (x) { x.classList.toggle('on', x === b); });
    document.querySelectorAll('.pc').forEach(function (p) { p.hidden = b.dataset.c !== 'all' && p.dataset.c !== b.dataset.c; });
    rail.scrollLeft = 0; prog();
  });
});

// Contact form opens the visitor's email app with the message filled in
document.getElementById('f').addEventListener('submit', function (ev) {
  ev.preventDefault();
  var d = new FormData(ev.target);
  var body = d.get('m') + '\n\nFrom: ' + d.get('n') + ' (' + d.get('e') + ')';
  location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Portfolio message from ' + d.get('n')) + '&body=' + encodeURIComponent(body);
});