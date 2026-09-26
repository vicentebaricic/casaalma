/* Casa Alma · interacciones */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // ---------- WhatsApp con mensajes pre-escritos ----------
  var WA_NUMBER = "56967532727";
  var messages = {
    reserva: "Hola Casa Alma, me gustaría reservar para la próxima Experiencia Casa Alma. ¿Tienen cupos disponibles?",
    evento: "Hola Casa Alma, quiero cotizar un evento privado. Fecha tentativa: ___ · N° de invitados: ___ · Tipo de evento: ___",
    contacto: "Hola Casa Alma, tengo una consulta."
  };

  function waLink(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  }

  document.querySelectorAll("[data-wa]").forEach(function (el) {
    var type = el.getAttribute("data-wa");
    var text = messages[type] || messages.contacto;
    if (type === "fecha") {
      text = "Hola Casa Alma, quiero reservar para la Experiencia Casa Alma del " + el.getAttribute("data-fecha") + ". ¿Quedan cupos?";
    }
    el.setAttribute("href", waLink(text));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  // ---------- Header al hacer scroll ----------
  var header = document.querySelector(".site-header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---------- Menú móvil ----------
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    nav.classList.toggle("is-open", open);
    header.classList.toggle("nav-active", open);
    document.body.classList.toggle("nav-open", open);
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 1025px)").addEventListener("change", function (mq) {
    if (mq.matches) setMenu(false);
  });

  // ---------- Sección activa en el menú ----------
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute("href") === "#" + entry.target.id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });

    // ---------- Revelado suave ----------
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 60 + "ms";
      revealer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---------- Tarifas por temporada ----------
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".season-toggle [role=tab]"));
  function selectTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(tab); });
    tab.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      selectTab(next);
      next.focus();
    });
  });
  // Muestra por defecto la temporada vigente (Nov–Mar = alta)
  var month = new Date().getMonth(); // 0 = enero
  if (tabs.length && (month >= 10 || month <= 2)) selectTab(tabs[1]);

  // ---------- Galería (lightbox) ----------
  var lb = document.getElementById("lightbox");
  if (lb && typeof lb.showModal === "function") {
    var lbImg = lb.querySelector("img");
    document.querySelectorAll(".g-item").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var thumb = btn.querySelector("img");
        lbImg.src = btn.getAttribute("data-full");
        lbImg.alt = thumb.alt;
        lb.showModal();
      });
    });
    lb.querySelector(".lightbox-close").addEventListener("click", function () { lb.close(); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  }

  // ---------- Año del footer ----------
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
