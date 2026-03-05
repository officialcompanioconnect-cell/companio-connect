document.addEventListener('DOMContentLoaded', () => {
  // --- 1. THEME TOGGLE SYSTEM ---
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  // Check localStorage or System Preference
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let currentTheme = savedTheme || (systemDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(currentTheme);
      localStorage.setItem('theme', currentTheme);
    });
  }

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    if (themeToggle) themeToggle.setAttribute('aria-checked', isDark);
  }

  // --- 2. STICKY NAV ON SCROLL ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // --- 3. SCROLL ANIMATIONS (Intersection Observer) ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal-group');
  if (revealElements.length > 0) {
    revealElements.forEach(el => observer.observe(el));
  } else {
    console.warn('No .reveal-group elements found');
  }

  // --- 4. MOUSE TRACKING FOR GLASS CARDS ---
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --- 5. FAQ ACCORDION (If present) ---
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(acc => {
    acc.addEventListener('click', () => {
      const isExpanded = acc.getAttribute('aria-expanded') === 'true';

      // Toggle current
      if (!isExpanded) {
        acc.setAttribute('aria-expanded', 'true');
        const content = acc.nextElementSibling;
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        acc.setAttribute('aria-expanded', 'false');
        acc.nextElementSibling.style.maxHeight = null;
      }
    });
  });
});
// FAQ Toggle
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    item.classList.toggle("active");
  });
});
