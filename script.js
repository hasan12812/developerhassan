/* =========================================================
   HASSAN RAZA — PORTFOLIO SCRIPT
   Handles: typing animation, mobile nav, scroll reveals,
   skill bar animation, and EmailJS contact form.
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Active link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id], .hero');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------- Typing animation ---------- */
  const roles = [
    'Full-Stack Web Developer',
    'WordPress & Elementor Expert',
    'SEO & Google My Business Specialist',
    'SaaS & Custom Software Developer',
    'Turning Ideas Into Digital Products'
  ];
  const typedEl = document.getElementById('typedRole');
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
      }
    }

    typedEl.textContent = current.slice(0, charIndex);
    setTimeout(typeLoop, deleting ? 35 : 55);
  }
  setTimeout(typeLoop, 900);

  /* ---------- Animate skill bars on view ---------- */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillFills.forEach(el => skillObserver.observe(el));

  /* ---------- EmailJS contact form ---------- */
  const EMAILJS_SERVICE_ID = 'service_zqfj72u';
  const EMAILJS_TEMPLATE_ID = 'template_2ozarep';
  const EMAILJS_PUBLIC_KEY = 'EkXXeEBzgNBlk7I7B';

  if (window.emailjs) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.getElementById('toastIcon');

  function showToast(message, isError = false) {
    toastMsg.textContent = message;
    toastIcon.textContent = isError ? '!' : '✓';
    toast.classList.toggle('error', isError);
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 4200);
  }

  function validateField(field) {
    const valid = field.checkValidity();
    field.classList.toggle('invalid', !valid);
    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameField = document.getElementById('userName');
    const emailField = document.getElementById('userEmail');
    const messageField = document.getElementById('userMessage');

    const allValid = [nameField, emailField, messageField]
      .map(validateField)
      .every(Boolean);

    if (!allValid) {
      showToast('Please fill in every field correctly.', true);
      return;
    }

    if (!window.emailjs) {
      showToast('Contact service failed to load. Please email me directly.', true);
      return;
    }

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        showToast("Message sent! I'll get back to you soon.");
        form.reset();
      })
      .catch(() => {
        showToast('Something went wrong. Please try again.', true);
      })
      .finally(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      });
  });

  [document.getElementById('userName'), document.getElementById('userEmail'), document.getElementById('userMessage')]
    .forEach(field => {
      field.addEventListener('input', () => {
        if (field.classList.contains('invalid')) validateField(field);
      });
    });

});
