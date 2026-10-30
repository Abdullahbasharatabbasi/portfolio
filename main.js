/* =========================================================
   Abdullah Basharat Abbasi | Portfolio Scripts
   Vanilla JavaScript, no external libraries.
   ========================================================= */

(function () {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  /* ---------- Loader ---------- */
  const loader = $("#loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader && loader.classList.add("hidden"), 900);
  });

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle (dark / light, remembered) ---------- */
  const root = document.documentElement;
  const themeToggle = $("#theme-toggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const isLight = theme === "light";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    themeToggle.setAttribute("title", isLight ? "Switch to dark mode" : "Switch to light mode");
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isLight ? "#f5f7fc" : "#070b1a");
  }

  applyTheme(savedTheme || (prefersLight ? "light" : "dark"));

  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem("portfolio-theme", next);
  });

  /* ---------- Navbar scroll state + active link ---------- */
  const navbar = $("#navbar");
  const navLinks = $("#nav-links");
  const menuToggle = $("#menu-toggle");
  const sectionLinks = $$(".nav-link");

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
    backToTop.classList.toggle("visible", window.scrollY > 500);

    let current = "";
    $$("main section[id]").forEach((section) => {
      const top = section.offsetTop - 160;
      if (window.scrollY >= top) current = section.id;
    });
    sectionLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }

  /* ---------- Mobile menu ---------- */
  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("menu-open");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", isOpen);
  });

  sectionLinks.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Back to top ---------- */
  const backToTop = $("#back-to-top");
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Typing effect ---------- */
  const typedEl = $("#typed-text");
  const phrases = ["Computer Science Student", "Flutter Developer", "Software Developer"];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const word = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      typedEl.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        return setTimeout(type, 1800);
      }
      return setTimeout(type, 90);
    }

    charIndex--;
    typedEl.textContent = word.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      return setTimeout(type, 400);
    }
    setTimeout(type, 45);
  }

  if (typedEl) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typedEl.textContent = phrases[0];
    } else {
      type();
    }
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("active"));
  }

  /* ---------- Contact form (client-side validation + mailto fallback) ---------- */
  // Set this to your real email address. It is used only when the form is submitted.
  const CONTACT_EMAIL = "your.email@example.com";

  const form = $("#contact-form");
  const statusEl = $("#form-status");

  const validators = {
    name: (v) => (v.trim().length < 2 ? "Please enter your name." : ""),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address."),
    subject: (v) => (v.trim().length < 3 ? "Please enter a subject." : ""),
    message: (v) => (v.trim().length < 10 ? "Message should be at least 10 characters." : ""),
  };

  function validateField(input) {
    const group = input.closest(".form-group");
    const msg = group.querySelector(".error-msg");
    const error = validators[input.name] ? validators[input.name](input.value) : "";
    group.classList.toggle("invalid", Boolean(error));
    msg.textContent = error;
    return !error;
  }

  $$("input, textarea", form).forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.closest(".form-group").classList.contains("invalid")) validateField(input);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = $$("input, textarea", form);
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid) {
      statusEl.textContent = "Please correct the highlighted fields.";
      statusEl.className = "form-status error";
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      "",
      data.message,
    ].join("\n");

    const mailto =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(data.subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    statusEl.textContent = "Your email app should open. Thank you for reaching out!";
    statusEl.className = "form-status success";
    form.reset();
  });
})();
