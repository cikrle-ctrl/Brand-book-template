/* Navigace brand booku: mobilní menu + zvýraznění aktivní sekce. */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var sidebar = document.getElementById('sidebar');
  var backdrop = document.querySelector('.backdrop');
  var desktop = window.matchMedia('(min-width: 1024px)');

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    sidebar.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-visible', open);
    document.body.classList.toggle('nav-open', open);
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  backdrop.addEventListener('click', function () { setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  sidebar.addEventListener('click', function (e) {
    if (e.target.closest('a') && !desktop.matches) setOpen(false);
  });
  desktop.addEventListener('change', function () { setOpen(false); });

  // Stáhnout PDF: stáhne hotový PDF manuál z assets/downloads/.
  // Dokud soubor neexistuje, zobrazí hlášku místo chybové stránky.
  var pdfLink = document.querySelector('[data-pdf]');
  var toast = document.querySelector('.toast');
  var toastTimer;
  if (pdfLink && toast && location.protocol !== 'file:') {
    pdfLink.addEventListener('click', function (e) {
      e.preventDefault();
      var url = pdfLink.getAttribute('href');
      fetch(url, { method: 'HEAD' })
        .then(function (res) {
          if (!res.ok) throw new Error('missing');
          var a = document.createElement('a');
          a.href = url;
          a.download = '';
          document.body.appendChild(a);
          a.click();
          a.remove();
        })
        .catch(function () {
          toast.textContent = 'PDF manuál zatím není nahraný (' + url + ').';
          toast.classList.add('is-visible');
          clearTimeout(toastTimer);
          toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 4000);
        });
    });
  }

  // Scroll-spy: zvýrazní odkaz na sekci, která je právě u horního okraje.
  var links = Array.prototype.slice.call(sidebar.querySelectorAll('.toc a[href^="#"]'));
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
  var targets = links
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  function activate(id) {
    links.forEach(function (a) {
      a.classList.remove('is-active');
      a.removeAttribute('aria-current');
    });
    var link = byId[id];
    if (!link) return;
    link.classList.add('is-active');
    link.setAttribute('aria-current', 'true');
    // Zvýrazni i nadřazenou kapitolu.
    var parent = link.closest('ol ol');
    if (parent) parent.parentElement.querySelector(':scope > a').classList.add('is-active');
    // Udrž aktivní odkaz viditelný v dlouhém sidebaru (bez posunu celé stránky).
    if (desktop.matches) {
      var r = link.getBoundingClientRect();
      var sr = sidebar.getBoundingClientRect();
      if (r.top < sr.top || r.bottom > sr.bottom) {
        sidebar.scrollTop += r.top - sr.top - sr.height / 2;
      }
    }
  }

  if ('IntersectionObserver' in window) {
    var visible = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { visible[entry.target.id] = entry.isIntersecting; });
      // Poslední viditelný cíl v pořadí dokumentu = nejhlubší aktuální sekce.
      var current = null;
      targets.forEach(function (t) { if (visible[t.id]) current = t.id; });
      if (current) activate(current);
    }, { rootMargin: '-10% 0px -75% 0px' });
    targets.forEach(function (t) { observer.observe(t); });
  }
})();
