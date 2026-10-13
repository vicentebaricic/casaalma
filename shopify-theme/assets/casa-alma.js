/* Casa Alma · interacciones de las secciones "ca-*" */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && !(window.Shopify && window.Shopify.designMode)) {
    document.documentElement.classList.add('ca-js');
  }

  // ---------- Revelado al hacer scroll ----------
  var observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    : null;

  function initReveal(root) {
    root.querySelectorAll('.ca-reveal:not(.is-visible)').forEach(function (el) {
      if (observer) observer.observe(el);
      else el.classList.add('is-visible');
    });
  }

  // ---------- Selector de temporada (tarifas) ----------
  function initSeasons(root) {
    root.querySelectorAll('[data-ca-seasons]').forEach(function (wrap) {
      if (wrap.dataset.caReady) return;
      wrap.dataset.caReady = '1';
      var tabs = Array.prototype.slice.call(wrap.querySelectorAll('[role="tab"]'));

      function select(tab) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !on;
        });
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(tab); });
        tab.addEventListener('keydown', function (e) {
          if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
          var next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
          select(next);
          next.focus();
        });
      });
    });
  }

  // ---------- Galería con lightbox ----------
  var lightbox;
  function getLightbox() {
    if (lightbox) return lightbox;
    lightbox = document.createElement('dialog');
    lightbox.className = 'ca-lightbox';
    lightbox.setAttribute('aria-label', 'Imagen ampliada');
    lightbox.innerHTML = '<button class="ca-lightbox__close" type="button" aria-label="Cerrar">&times;</button><img alt="">';
    lightbox.querySelector('button').addEventListener('click', function () { lightbox.close(); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.close(); });
    document.body.appendChild(lightbox);
    return lightbox;
  }

  function initGallery(root) {
    root.querySelectorAll('[data-ca-full]').forEach(function (btn) {
      if (btn.dataset.caReady) return;
      btn.dataset.caReady = '1';
      btn.addEventListener('click', function () {
        var box = getLightbox();
        if (typeof box.showModal !== 'function') {
          window.open(btn.dataset.caFull, '_blank', 'noopener');
          return;
        }
        var img = box.querySelector('img');
        img.src = btn.dataset.caFull;
        img.alt = (btn.querySelector('img') || {}).alt || '';
        box.showModal();
      });
    });
  }

  function init(root) {
    initReveal(root);
    initSeasons(root);
    initGallery(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(document); });
  } else {
    init(document);
  }

  // Editor visual de Shopify: re-inicializar cuando se edita una sección
  document.addEventListener('shopify:section:load', function (e) { init(e.target); });
})();
