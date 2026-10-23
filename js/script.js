const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...nav.querySelectorAll('a')];
const navTargets = navLinks.map(link => {
  const destination = new URL(link.getAttribute('href'), window.location.href);
  return { link, pathname: destination.pathname, hash: destination.hash };
});
const isLandingPage = document.querySelector('#home') !== null;
let activeNavigationKey = '';

document.querySelectorAll([
  '.section-head',
  '.about-number',
  '.about-copy',
  '.requirements',
  '.community > .eyebrow',
  '.community > h2',
  '.community > p:not(.eyebrow)',
  '.community .telegram-link',
  '.release-heading',
  '.release-guide',
  '.release-card',
  '.release-end',
  '.release-archive'
].join(',')).forEach(item => item.classList.add('reveal'));

menu.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', isOpen);
});

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));

function updateHeaderAndNavigation() {
  header.classList.toggle('scrolled', window.scrollY > 16);

  if (isLandingPage) {
    let activeSection = sections[0]?.id;
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - window.innerHeight * 0.35) {
        activeSection = section.id;
      }
    });
    setActiveNavigation(`section:${activeSection}`, activeSection);
  } else {
    setActiveNavigation(`page:${window.location.pathname}`);
  }
}

function setActiveNavigation(key, activeSection) {
  if (key === activeNavigationKey) return;
  activeNavigationKey = key;

  navTargets.forEach(({ link, pathname, hash }) => {
    const isActive = isLandingPage
      ? pathname === window.location.pathname && hash === `#${activeSection}`
      : pathname === window.location.pathname;
    if (link.classList.contains('active') !== isActive) {
      link.classList.toggle('active', isActive);
    }
  });
}

let navigationFrame = 0;
function scheduleHeaderAndNavigationUpdate() {
  if (navigationFrame) return;
  navigationFrame = requestAnimationFrame(() => {
    navigationFrame = 0;
    updateHeaderAndNavigation();
  });
}

window.addEventListener('scroll', scheduleHeaderAndNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleHeaderAndNavigationUpdate, { passive: true });
updateHeaderAndNavigation();

const revealItems = document.querySelectorAll('.reveal');
const revealIndexes = new Map();
revealItems.forEach(item => {
  const parent = item.parentElement;
  const siblingIndex = revealIndexes.get(parent) || 0;
  revealIndexes.set(parent, siblingIndex + 1);
  item.style.setProperty('--reveal-delay', `${Math.min(siblingIndex, 3) * 70}ms`);
});

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach(item => item.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  revealItems.forEach(item => revealObserver.observe(item));
}

const scene = document.querySelector('.scene');
const portrait = document.querySelector('.portrait');
if (!reduceMotion && scene && portrait && matchMedia('(pointer:fine)').matches) {
  scene.addEventListener('pointermove', event => {
    const bounds = scene.getBoundingClientRect();
    portrait.style.setProperty('--mx', `${(event.clientX - bounds.left - bounds.width / 2) * 0.025}px`);
    portrait.style.setProperty('--my', `${(event.clientY - bounds.top - bounds.height / 2) * 0.018}px`);
  });
  scene.addEventListener('pointerleave', () => {
    portrait.style.setProperty('--mx', '0px');
    portrait.style.setProperty('--my', '0px');
  });
}
