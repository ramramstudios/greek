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
    { href: 'nwt_exclusivity.html',            label: 'NWT \u0026 Exegesis' },
    { href: 'related_works.html',              label: 'Related Works' },
    { href: 'search.html',                     label: 'Search' },
  ];

  function buildNav() {
    var linksEl = document.getElementById('nav-links');
    if (!linksEl) return;

    // Derive current filename from URL; fall back to 'index.html' for bare paths.
    var current = window.location.pathname.split('/').pop() || 'index.html';

    var html = '';
    NAV_PAGES.forEach(function (p) {
      html += '<span class="nav-sep">|</span>';
      if (p.href === current) {
        html += '<span class="nav-branch">' + p.label + '</span>';
      } else {
        html += '<a href="' + p.href + '">' + p.label + '</a>';
      }
    });
    linksEl.innerHTML = html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
}());
