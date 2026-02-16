const pills = document.querySelectorAll('.pill');
const revealTargets = document.querySelectorAll(
  '.block, .feature-card, .stats-grid div, .lang-grid article, .compliance-grid article, .chat-card, .site-footer'
);

pills.forEach((pill) => {
  pill.addEventListener('click', () => {
    pills.forEach((p) => p.classList.remove('active'));
    pill.classList.add('active');
  });
});

document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq-list details').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

revealTargets.forEach((el, i) => {
  el.classList.add('reveal-item');
  el.style.setProperty('--delay', `${(i % 8) * 70}ms`);
  observer.observe(el);
});

// Logo marquee cloning for continuous motion.
const track = document.querySelector('.logo-track');
if (track) {
  const items = Array.from(track.children);
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
}

// Parallax aura movement.
const auras = document.querySelectorAll('.aura');
const onScroll = () => {
  const y = window.scrollY;
  auras.forEach((aura, index) => {
    const drift = (index + 1) * 0.06;
    aura.style.transform = `translate3d(0, ${y * drift}px, 0)`;
  });
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Subtle tilt interaction for key cards.
const tiltTargets = document.querySelectorAll('.feature-card, .panel, .dash-card, .use-image');

tiltTargets.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Animate stats once visible.
const stats = document.querySelectorAll('.stats-grid strong');
stats.forEach((node) => {
  const source = node.textContent.trim();
  const match = source.match(/[\d.]+/);
  if (!match) return;
  const target = Number(match[0]);
  const suffix = source.replace(match[0], '');

  const run = () => {
    let current = 0;
    const steps = 45;
    const increment = target / steps;
    const tick = () => {
      current += increment;
      if (current >= target) {
        node.textContent = `${match[0]}${suffix}`;
        return;
      }
      const decimals = match[0].includes('.') ? 1 : 0;
      node.textContent = `${current.toFixed(decimals)}${suffix}`;
      requestAnimationFrame(tick);
    };
    tick();
  };

  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    run();
    io.disconnect();
  });

  io.observe(node);
});
