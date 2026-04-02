/**
 * nav.js — single source of truth for the site nav.
 * To add a page: append one entry to NAV_PAGES, done.
 * All pages load this file and call buildNav() on DOMContentLoaded.
 */
(function () {
  var NAV_PAGES = [
    { href: 'christos_tlg_report.html',       label: '\u03C7\u03C1\u03B9\u03C3\u03C4\u03CC\u03C2 Research' },
    { href: 'pharmakon_hypothesis.html',       label: 'Pharmakon' },
    { href: 'jason_jesus_sidequest.html',      label: 'Jason / Jesus' },
    { href: 'demeter_jesus_drink_refusal.html',label: 'Demeter \u0026 Jesus' },
    { href: 'holy_week.html',                  label: 'Holy Week' },
    { href: 'messiahs/index.html',             label: 'Messianic Claimants' },
    { href: 'nwt_exclusivity.html',            label: 'NWT \u0026 Exegesis' },
    { href: 'related_works.html',              label: 'Related Works' },
    { href: 'search.html',                     label: 'Search' },
  ];

  function buildNav() {
    var linksEl = document.getElementById('nav-links');
    if (!linksEl) return;

    // Reuse the page-authored nav.js path as the relative prefix back to docs root.
    var navScript = document.querySelector('script[src$="nav.js"], script[src$="/nav.js"]');
    var navSrc = navScript ? (navScript.getAttribute('src') || '') : '';
    var docsRoot = navSrc.replace(/nav\.js(?:\?.*)?$/, '');
    if (docsRoot === './') docsRoot = '';

    // Match current page by suffix so GitHub Pages project paths still highlight correctly.
    var normalizedPath = window.location.pathname.replace(/\/$/, '/index.html');
    var current = '';
    NAV_PAGES.some(function (p) {
      if (normalizedPath.endsWith('/' + p.href) || normalizedPath.endsWith(p.href)) {
        current = p.href;
        return true;
      }
      return false;
    });

    var html = '';
    NAV_PAGES.forEach(function (p) {
      html += '<span class="nav-sep">|</span>';
      if (p.href === current) {
        html += '<span class="nav-branch">' + p.label + '</span>';
      } else {
        html += '<a href="' + docsRoot + p.href + '">' + p.label + '</a>';
      }
    });
    linksEl.innerHTML = html;

    // Inject search form into .nav-controls (always-visible area).
    var controlsEl = document.querySelector('nav .nav-controls');
    if (controlsEl && !document.getElementById('nav-search-form')) {
      var form = document.createElement('form');
      form.id = 'nav-search-form';
      form.className = 'nav-search-form';
      form.action = docsRoot + 'search.html';
      form.method = 'GET';
      var input = document.createElement('input');
      input.type = 'search';
      input.name = 'q';
      input.className = 'nav-search-input';
      input.placeholder = 'Search\u2026';
      input.setAttribute('aria-label', 'Search site');
      input.setAttribute('autocomplete', 'off');
      form.appendChild(input);
      controlsEl.insertBefore(form, controlsEl.firstChild);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
}());
