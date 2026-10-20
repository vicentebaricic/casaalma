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

/* MT · tracking, cotización rápida, postulación de artistas, reseñas */
(function () {
  'use strict';

  function track(event, params) {
    if (!window.mtTrackEvents) return;
    try { if (typeof window.fbq === 'function') window.fbq('track', event, params || {}); } catch (e) {}
  }

  // Cada clic a WhatsApp → Contact
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-mt-track], a[href*="wa.me/"]');
    if (!a) return;
    track(a.getAttribute('data-mt-track') || 'Contact', { content_name: a.getAttribute('data-mt-source') || 'web_whatsapp' });
  });

  function waUrl(number, text, source, withRef) {
    if (withRef === 'true' && source) text += '\n\nref: source=' + source;
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(text);
  }

  function fill(tpl, data) {
    return tpl.replace(/\{(\w+)\}/g, function (m, k) { return data[k] != null ? data[k] : m; });
  }

  // Copia opcional al correo de la tienda (formulario de contacto de Shopify)
  function emailCopy(card, subject, body, contact) {
    if (card.getAttribute('data-email-copy') !== 'true') return;
    var params = new URLSearchParams();
    params.append('form_type', 'contact');
    params.append('utf8', '✓');
    params.append('contact[name]', subject);
    if (/@/.test(contact || '')) params.append('contact[email]', contact.trim());
    params.append('contact[body]', body);
    try { fetch('/contact#contact_form', { method: 'POST', body: params, credentials: 'same-origin' }).catch(function () {}); } catch (e) {}
  }

  function validate(form) {
    var ok = true;
    form.querySelectorAll('[required]').forEach(function (el) {
      var valid = el.value.trim() !== '' && (!el.checkValidity || el.checkValidity());
      el.setAttribute('aria-invalid', valid ? 'false' : 'true');
      if (!valid) ok = false;
    });
    var err = form.querySelector('.mt-form__error');
    if (err) err.hidden = ok;
    if (!ok) { var first = form.querySelector('[aria-invalid="true"]'); if (first) first.focus(); }
    return ok;
  }

  function fmtDate(iso) {
    var p = iso.split('-');
    return p.length === 3 ? p[2] + '-' + p[1] + '-' + p[0] : iso;
  }

  function initQuote(root) {
    root.querySelectorAll('[data-mt-quote]').forEach(function (card) {
      if (card.dataset.mtReady) return;
      card.dataset.mtReady = '1';
      var form = card.querySelector('[data-mt-quote-form]');
      var result = card.querySelector('[data-mt-quote-result]');
      var cfg = {};
      try { cfg = JSON.parse(card.querySelector('[data-mt-rates]').textContent); } catch (e) {}
      var highMonths = (card.dataset.highMonths || '').split(',').map(function (m) { return parseInt(m, 10); });
      var dateInput = form.querySelector('input[type="date"]');
      if (dateInput) dateInput.min = new Date().toISOString().slice(0, 10);

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validate(form)) return;
        var data = Object.fromEntries(new FormData(form).entries());
        var p = data.fecha.split('-');
        var d = new Date(+p[0], +p[1] - 1, +p[2]);
        var dow = d.getDay();
        var dayKey = dow === 6 ? 'sat' : dow === 5 ? 'fri' : dow === 0 ? 'sun' : 'weekday';
        var season = highMonths.indexOf(d.getMonth() + 1) > -1 ? 'high' : 'low';
        var rate = (cfg.rates || {})[dayKey] || {};
        var value = (rate[season] || '').trim();
        var seasonLabel = (cfg.labels || {})[season] || '';
        var note = (rate.name || '') + (seasonLabel ? ' · ' + seasonLabel : '');

        var valueEl = card.querySelector('[data-mt-quote-value]');
        var noteEl = card.querySelector('[data-mt-quote-note]');
        if (value) {
          valueEl.textContent = value + (cfg.suffix ? ' ' + cfg.suffix : '');
          noteEl.textContent = note;
        } else {
          valueEl.textContent = note;
          noteEl.textContent = cfg.pending || '';
        }

        data.fecha = fmtDate(data.fecha);
        data.valor = value ? value + (cfg.suffix ? ' ' + cfg.suffix : '') + ' (' + note + ')' : 'por confirmar (' + note + ')';
        var text = fill(card.dataset.msg || '', data);
        card.querySelector('[data-mt-quote-wa]').href = waUrl(card.dataset.wa, text, 'web_cotizacion', card.dataset.ref);

        form.hidden = true;
        result.hidden = false;
        result.focus();
        track('Lead', { content_name: 'web_cotizacion', content_category: data.tipo });
        emailCopy(card, 'Cotización web · ' + data.tipo, text, data.contacto);
      });

      card.querySelector('[data-mt-quote-reset]').addEventListener('click', function () {
        result.hidden = true;
        form.hidden = false;
      });
    });
  }

  function initArtist(root) {
    root.querySelectorAll('[data-mt-artist]').forEach(function (card) {
      if (card.dataset.mtReady) return;
      card.dataset.mtReady = '1';
      var form = card.querySelector('[data-mt-artist-form]');
      var result = card.querySelector('[data-mt-artist-result]');
      var ta = form.querySelector('[data-mt-counter]');
      var count = form.querySelector('[data-mt-count]');
      if (ta && count) ta.addEventListener('input', function () { count.textContent = ta.value.length; });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validate(form)) return;
        var data = Object.fromEntries(new FormData(form).entries());
        data.mensaje = (data.mensaje || '').slice(0, 200) || '—';
        var text = fill(card.dataset.msg || '', data);
        card.querySelector('[data-mt-artist-wa]').href = waUrl(card.dataset.wa, text, 'web_artistas', card.dataset.ref);
        form.hidden = true;
        result.hidden = false;
        result.focus();
        track('Lead', { content_name: 'web_artistas', content_category: data.disciplina });
        emailCopy(card, 'Postulación artista · ' + data.nombre, text, '');
      });
    });
  }

  function initReviews(root) {
    root.querySelectorAll('[data-mt-reviews-more]').forEach(function (btn) {
      if (btn.dataset.mtReady) return;
      btn.dataset.mtReady = '1';
      btn.addEventListener('click', function () {
        var section = btn.closest('section');
        section.querySelectorAll('.mt-review--more').forEach(function (el) { el.hidden = false; el.classList.add('is-visible'); });
        btn.remove();
      });
    });
  }

  function init(root) { initQuote(root); initArtist(root); initReviews(root); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(document); });
  else init(document);
  document.addEventListener('shopify:section:load', function (e) { init(e.target); });
})();

/* MT · Reserva con pago online: total en vivo y directo al pago con la cantidad elegida */
(function () {
  'use strict';
  var fmt = function (n) { return '$' + Math.round(n).toLocaleString('es-CL'); };

  function update(form) {
    var qty = parseInt(form.querySelector('[data-mt-qty]').value, 10) || 1;
    var total = fmt((parseFloat(form.dataset.unit) || 0) * qty);
    var sum = form.querySelector('[data-mt-sum]');
    if (sum) sum.textContent = qty + (qty === 1 ? ' persona' : ' personas') + ' · ' + total;
    var btn = form.querySelector('[data-mt-btn]');
    if (btn) btn.textContent = (form.dataset.label || 'Reservar y pagar') + ' · ' + total;
  }

  document.addEventListener('change', function (e) {
    if (e.target.matches && e.target.matches('[data-mt-qty]')) update(e.target.closest('[data-mt-buy]'));
  });

  function root() { return (window.Shopify && Shopify.routes && Shopify.routes.root) || '/'; }

  document.addEventListener('submit', function (e) {
    var form = e.target.closest && e.target.closest('[data-mt-buy]');
    if (!form) return;
    e.preventDefault();
    var qty = parseInt(form.querySelector('[data-mt-qty]').value, 10) || 1;
    var diet = form.querySelector('[name="properties[Restricciones alimentarias]"]');
    var dietTxt = diet ? diet.value.trim() : '';
    var btn = form.querySelector('[data-mt-btn]');
    if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }

    try {
      if (window.mtTrackEvents && typeof window.fbq === 'function') {
        var params = { content_ids: [form.dataset.variant], content_type: 'product', content_name: form.dataset.name, value: (parseFloat(form.dataset.unit) || 0) * qty, currency: form.dataset.currency, num_items: qty };
        window.fbq('track', 'AddToCart', params);
        window.fbq('track', 'InitiateCheckout', params);
      }
    } catch (err) {}

    var permalink = root() + 'cart/' + form.dataset.variant + ':' + qty;
    // La reserva es de una sola fecha: se deja el carrito solo con ella (y sus restricciones) y se va al pago.
    var item = { id: parseInt(form.dataset.variant, 10), quantity: qty };
    if (dietTxt) item.properties = { 'Restricciones alimentarias': dietTxt.slice(0, 200) };
    fetch(root() + 'cart/clear.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })
      .then(function (r) { if (!r.ok) throw new Error('clear'); return fetch(root() + 'cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ items: [item] }) }); })
      .then(function (r) { if (!r.ok) throw new Error('add'); window.location.href = root() + 'checkout'; })
      .catch(function () { window.location.href = permalink; });
  });

  // Si el usuario vuelve con "Atrás", reactivar el botón y recalcular.
  window.addEventListener('pageshow', function () {
    document.querySelectorAll('[data-mt-buy]').forEach(function (f) {
      var b = f.querySelector('[data-mt-btn]'); if (b) { b.disabled = false; b.removeAttribute('aria-busy'); }
      update(f);
    });
  });
})();
