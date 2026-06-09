// The Almanac — shared scripts
// Page-specific logic lives in each HTML file's <script> block.

(function () {
  const nav   = document.querySelector('nav');
  const links = nav && nav.querySelector('.nav-links');
  if (!nav || !links) return;

  // Inject Home link at top of list (only visible on mobile)
  const homeItem = document.createElement('li');
  homeItem.className = 'nav-home';
  homeItem.innerHTML = '<a href="index.html">Home</a>';
  links.prepend(homeItem);

  // Inject hamburger button
  const btn = document.createElement('button');
  btn.className = 'nav-hamburger';
  btn.setAttribute('aria-label', 'Open menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML =
    '<span class="ham-bar"></span>' +
    '<span class="ham-bar"></span>' +
    '<span class="ham-bar"></span>';
  nav.appendChild(btn);

  function open()  { nav.classList.add('nav-open');    btn.setAttribute('aria-expanded', 'true');  btn.setAttribute('aria-label', 'Close menu'); }
  function close() { nav.classList.remove('nav-open'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Open menu'); }

  btn.addEventListener('click', e => {
    e.stopPropagation();
    nav.classList.contains('nav-open') ? close() : open();
  });

  // Close on link click or outside click
  links.addEventListener('click', e => { if (e.target.tagName === 'A') close(); });
  document.addEventListener('click', e => { if (!nav.contains(e.target)) close(); });

  // Keep hero elements flush below the nav via --nav-h CSS variable
  const root   = document.documentElement;
  const setNavH = h => root.style.setProperty('--nav-h', h + 'px');
  setNavH(nav.offsetHeight);
  window.addEventListener('resize', () => setNavH(nav.offsetHeight), { passive: true });

  // Hide on scroll down, reappear on scroll up
  let lastY   = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y > lastY && y > nav.offsetHeight) {
        nav.style.top = `-${nav.offsetHeight}px`;
        setNavH(0);
        close();
      } else {
        nav.style.top = '0';
        setNavH(nav.offsetHeight);
      }
      lastY   = y;
      ticking = false;
    });
  }, { passive: true });
})();
