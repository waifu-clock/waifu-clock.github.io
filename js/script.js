const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...nav.querySelectorAll('a')];
const isLandingPage = document.querySelector('#home') !== null;

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

    navLinks.forEach(link => {
      const destination = new URL(link.getAttribute('href'), window.location.href);
      const isActive = destination.pathname === window.location.pathname && destination.hash === `#${activeSection}`;
      link.classList.toggle('active', isActive);
    });
    return;
  }

  navLinks.forEach(link => {
    const destination = new URL(link.getAttribute('href'), window.location.href);
    link.classList.toggle('active', destination.pathname === window.location.pathname);
  });
}

window.addEventListener('scroll', updateHeaderAndNavigation, { passive: true });
updateHeaderAndNavigation();

const revealItems = document.querySelectorAll('.reveal');
if (reduceMotion) {
  revealItems.forEach(item => item.classList.add('visible'));
} else if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }), { threshold: 0.14 });
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
