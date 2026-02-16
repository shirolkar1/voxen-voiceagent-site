const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((el) => observer.observe(el));

document.querySelectorAll('.tab').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.tab;

    document.querySelectorAll('.tab').forEach((b) => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });

    document.querySelectorAll('.tab-panel').forEach((panel) => {
      panel.classList.remove('is-active');
    });

    button.classList.add('is-active');
    button.setAttribute('aria-selected', 'true');
    document.getElementById(key)?.classList.add('is-active');
  });
});

document.querySelectorAll('.toggle-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const cycle = button.dataset.cycle;

    document.querySelectorAll('.toggle-btn').forEach((b) => b.classList.remove('is-active'));
    button.classList.add('is-active');

    document.querySelectorAll('.price').forEach((price) => {
      const next = cycle === 'yearly' ? price.dataset.yearly : price.dataset.monthly;
      if (next) price.textContent = next;
    });
  });
});

const quoteText = document.getElementById('quote-text');
const quoteMeta = document.getElementById('quote-meta');
const testimonials = [
  {
    text: '“We went from missed after-hours calls to 38 additional appointments in the first month.”',
    meta: 'Operations Manager, Multi-location Clinic Group',
  },
  {
    text: '“Our intake team now focuses on edge cases while VoiceAgent handles repetitive first-call questions.”',
    meta: 'Head of Intake, Regional Law Practice',
  },
  {
    text: '“Booking speed is up and our sales reps spend more time closing than qualifying.”',
    meta: 'Revenue Lead, Home Services Franchise',
  },
];

let quoteIndex = 0;
setInterval(() => {
  quoteIndex = (quoteIndex + 1) % testimonials.length;
  quoteText.textContent = testimonials[quoteIndex].text;
  quoteMeta.textContent = testimonials[quoteIndex].meta;
}, 4500);

const counters = document.querySelectorAll('[data-counter]');
const animateCounter = (el) => {
  const target = Number(el.dataset.counter || 0);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 42));

  const tick = () => {
    current += step;
    if (current >= target) {
      el.textContent = `${target}${target === 12 ? '' : '+'}`;
      return;
    }
    el.textContent = `${current}`;
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

counters.forEach((counter) => animateCounter(counter));

const leadForm = document.getElementById('lead-form');
const formNote = document.getElementById('form-note');

leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  formNote.textContent = 'Thanks. We received your request and will reach out shortly.';
  formNote.style.color = 'var(--brand)';
  leadForm.reset();
});

document.getElementById('year').textContent = String(new Date().getFullYear());
