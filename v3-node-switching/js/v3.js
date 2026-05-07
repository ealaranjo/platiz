/* ============================================
   V3 Node-Switching Scripts
   ============================================ */

(() => {
  'use strict';

  // ==========================================
  // STATE
  // ==========================================
  let v3CurrentSection = 'hero';
  let v3Connectors = [];
  let v3NodeGroups = [];

  const v3SectionOrder = ['hero', 'about', 'timeline', 'skills', 'projects', 'contact'];

  // ==========================================
  // PRELOADER
  // ==========================================
  function initPreloader() {
    const bar = document.getElementById('preloader-bar');
    const text = document.getElementById('preloader-text');
    const pct = document.getElementById('preloader-percent');
    let progress = 0;

    const steps = [
      { t: 200,  msg: '> Initializing Emanuel Laranjo OS...' },
      { t: 600,  msg: '> Loading modules: CRM, Automation, AI...' },
      { t: 1100, msg: '> Compiling achievements...' },
      { t: 1600, msg: '> Rendering interface...' },
      { t: 2000, msg: '> Ready.' },
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress > 100) progress = 100;
      bar.style.width = progress + '%';
      pct.textContent = Math.round(progress) + '%';

      if (stepIdx < steps.length && progress >= (stepIdx + 1) * (100 / steps.length)) {
        text.textContent = steps[stepIdx].msg;
        stepIdx++;
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          document.getElementById('preloader').classList.add('hidden');
          setTimeout(() => { document.getElementById('preloader').style.display = 'none'; }, 700);
          animateHeroEntrance();
        }, 400);
      }
    }, 120);
  }

  function animateHeroEntrance() {
    if (prefersReducedMotion()) return;
    const hero = document.getElementById('hero');
    if (!hero) return;
    const tl = gsap.timeline();
    tl.from(hero.querySelector('img'), { scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out' })
      .from('#hero-name', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('#hero-subtitle', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from('#hero-company', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from(hero.querySelectorAll('.v3-nav-btn, a'), { y: 20, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out' }, '-=0.3');

    tl.call(() => {
      const subtitle = document.getElementById('hero-subtitle');
      if (subtitle) scrambleText(subtitle);
    }, null, '+=0.2');
  }

  function scrambleText(el) {
    const finalText = el.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const duration = 1200;
    const steps = 10;
    const stepTime = duration / (finalText.length * steps);
    let iteration = 0;

    const interval = setInterval(() => {
      el.textContent = finalText.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (i < Math.floor(iteration / steps)) return finalText[i];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      iteration++;
      if (iteration >= finalText.length * steps) {
        clearInterval(interval);
        el.textContent = finalText;
      }
    }, stepTime);
  }

  // ==========================================
  // THEME
  // ==========================================
  function v3InitTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    v3SetTheme(saved);

    const handler = () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      v3SetTheme(next);
    };
    document.getElementById('theme-toggle')?.addEventListener('click', handler);
    document.getElementById('theme-toggle-mobile')?.addEventListener('click', handler);
  }

  function v3SetTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    ELState.theme = theme;
    const moon = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>';
    const sun = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>';
    const icon = theme === 'dark' ? moon : sun;
    const btn = document.getElementById('theme-toggle');
    const btnMobile = document.getElementById('theme-toggle-mobile');
    if (btn) btn.innerHTML = icon;
    if (btnMobile) btnMobile.innerHTML = icon;
  }

  // ==========================================
  // LANGUAGE
  // ==========================================
  function v3InitLanguage() {
    ELinitLanguage();
    // Redraw map labels when language changes
    const toggle = document.getElementById('lang-toggle');
    const toggleMobile = document.getElementById('lang-toggle-mobile');
    const handler = () => {
      setTimeout(() => {
        drawMap(document.getElementById('v3-map-svg'));
        drawMap(document.getElementById('v3-mobile-map-svg'));
      }, 50);
    };
    if (toggle) toggle.addEventListener('click', handler);
    if (toggleMobile) toggleMobile.addEventListener('click', handler);
  }

  // ==========================================
  // HERO SPOTLIGHT
  // ==========================================
  function initHeroSpotlight() {
    const hero = document.getElementById('hero');
    if (!hero || prefersReducedMotion()) return;
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--mouse-x', x + '%');
      hero.style.setProperty('--mouse-y', y + '%');
    });
  }

  // ==========================================
  // NODE MAP
  // ==========================================
  function drawMap(svg) {
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const w = Math.max(rect.width, 200);
    const h = Math.max(rect.height, 300);
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.innerHTML = '';
    v3Connectors = [];
    v3NodeGroups = [];

    const nodes = [
      { id: 'hero',     labelKey: 'nav.logo',     locked: false },
      { id: 'about',    labelKey: 'nav.about',    locked: false },
      { id: 'timeline', labelKey: 'nav.timeline', locked: false },
      { id: 'skills',   labelKey: 'nav.skills',   locked: false },
      { id: 'projects', labelKey: 'nav.projects', locked: false },
      { id: 'contact',  labelKey: 'nav.contact',  locked: true },
    ];

    const nodeCount = nodes.length;
    const availableH = h * 0.65;
    const startY = (h - availableH) / 2 + 20;
    const gap = availableH / (nodeCount - 1);
    const cx = w / 2;
    const pillW = Math.min(140, w * 0.65);
    const pillH = 32;

    // Draw connectors
    for (let i = 0; i < nodeCount - 1; i++) {
      const y1 = startY + i * gap;
      const y2 = startY + (i + 1) * gap;
      const midY = (y1 + y2) / 2;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const d = `M ${cx} ${y1 + pillH/2} C ${cx + 35} ${midY}, ${cx - 35} ${midY}, ${cx} ${y2 - pillH/2}`;
      path.setAttribute('d', d);
      path.setAttribute('class', 'v3-connector');
      svg.appendChild(path);
      v3Connectors.push({ el: path, from: nodes[i].id, to: nodes[i+1].id });
    }

    // Draw nodes
    nodes.forEach((node, i) => {
      const y = startY + i * gap;
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', `v3-node-group ${node.id === v3CurrentSection ? 'active' : ''} ${node.locked ? 'locked' : ''}`);
      g.setAttribute('data-v3-target', node.id);

      const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      r.setAttribute('x', cx - pillW/2);
      r.setAttribute('y', y - pillH/2);
      r.setAttribute('width', pillW);
      r.setAttribute('height', pillH);
      r.setAttribute('rx', 12);
      r.setAttribute('class', 'v3-node-rect');
      g.appendChild(r);

      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', cx - pillW/2 + 16);
      dot.setAttribute('cy', y);
      dot.setAttribute('r', 3);
      dot.setAttribute('class', 'v3-status');
      g.appendChild(dot);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', cx + 4);
      text.setAttribute('y', y + 1);
      text.setAttribute('class', 'v3-label');
      text.setAttribute('data-i18n', node.labelKey);
      const label = ELi18n[ELState.lang]?.[node.labelKey] || node.id;
      text.textContent = label;
      g.appendChild(text);

      g.addEventListener('click', () => {
        if (!g.classList.contains('locked')) v3SwitchSection(node.id);
      });

      svg.appendChild(g);
      v3NodeGroups.push({ el: g, id: node.id, y });
    });
  }

  // ==========================================
  // SECTION SWITCHING
  // ==========================================
  function v3SwitchSection(targetId) {
    if (targetId === v3CurrentSection) return;
    const currentEl = document.getElementById(v3CurrentSection);
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const svg = document.getElementById('v3-map-svg') || document.getElementById('v3-mobile-map-svg');

    // Animate connector if adjacent
    const currentIdx = v3SectionOrder.indexOf(v3CurrentSection);
    const targetIdx = v3SectionOrder.indexOf(targetId);
    if (svg && Math.abs(currentIdx - targetIdx) === 1) {
      const conn = v3Connectors.find(c =>
        (c.from === v3CurrentSection && c.to === targetId) ||
        (c.from === targetId && c.to === v3CurrentSection)
      );
      if (conn) {
        const activePath = conn.el.cloneNode(true);
        activePath.setAttribute('class', 'v3-connector-active');
        svg.appendChild(activePath);
        const len = activePath.getTotalLength();
        activePath.style.strokeDasharray = len;
        activePath.style.strokeDashoffset = len;
        gsap.to(activePath, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', onComplete: () => activePath.remove() });

        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('r', 5);
        dot.setAttribute('class', 'v3-flow-dot');
        svg.appendChild(dot);
        const startTime = performance.now();
        function animateDot(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / 500, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const point = activePath.getPointAtLength(len * eased);
          dot.setAttribute('cx', point.x);
          dot.setAttribute('cy', point.y);
          if (progress < 1) requestAnimationFrame(animateDot);
          else dot.remove();
        }
        requestAnimationFrame(animateDot);
      }
    }

    // Update map active states
    v3NodeGroups.forEach(n => {
      if (n.id === targetId) n.el.classList.add('active');
      else n.el.classList.remove('active');
    });

    // Animate sections
    if (currentEl) {
      gsap.to(currentEl, { opacity: 0, y: -10, duration: 0.25, ease: 'power2.in', onComplete: () => {
        currentEl.classList.remove('active');
        currentEl.setAttribute('aria-hidden', 'true');
      }});
    }

    targetEl.classList.remove('hidden');
    gsap.fromTo(targetEl, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.4, delay: 0.15, ease: 'power2.out',
      onStart: () => {
        targetEl.classList.add('active');
        targetEl.setAttribute('aria-hidden', 'false');
      }
    });

    v3CurrentSection = targetId;

    // Trigger entrance animations for the new section
    animateSectionEntrance(targetId);

    // Close mobile map
    const mobileMap = document.getElementById('v3-mobile-map');
    if (mobileMap) {
      mobileMap.classList.add('hidden');
      mobileMap.classList.remove('flex');
    }
  }

  function animateSectionEntrance(sectionId) {
    if (prefersReducedMotion()) return;
    const section = document.getElementById(sectionId);
    if (!section) return;

    if (sectionId === 'about') {
      gsap.from(section.querySelectorAll('h2, p'), { y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.2 });
    } else if (sectionId === 'timeline') {
      gsap.to(section.querySelector('.timeline-line'), { scaleY: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 });
      gsap.from(section.querySelectorAll('.timeline-item'), { x: (i) => i % 2 === 0 ? -30 : 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
    } else if (sectionId === 'skills') {
      gsap.from(section.querySelectorAll('.skill-card'), { y: 40, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out', delay: 0.1 });
      gsap.from(section.querySelectorAll('.soft-skill'), { scale: 0.9, opacity: 0, stagger: 0.05, duration: 0.4, ease: 'back.out(1.7)', delay: 0.3 });
    } else if (sectionId === 'projects') {
      gsap.from(section.querySelectorAll('.project-card'), { y: 50, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.1 });
    } else if (sectionId === 'contact') {
      gsap.from(section.querySelector('form'), { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 });
    }
  }

  // ==========================================
  // MOBILE MAP
  // ==========================================
  function initMobileMap() {
    const toggle = document.getElementById('v3-mobile-map-toggle');
    const overlay = document.getElementById('v3-mobile-map');
    const close = document.getElementById('v3-mobile-map-close');

    toggle?.addEventListener('click', () => {
      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
      requestAnimationFrame(() => {
        drawMap(document.getElementById('v3-mobile-map-svg'));
      });
    });

    close?.addEventListener('click', () => {
      overlay.classList.add('hidden');
      overlay.classList.remove('flex');
    });
  }

  // ==========================================
  // MOBILE ACHIEVEMENTS
  // ==========================================
  function initMobileAchievements() {
    const drawerToggle = document.getElementById('mobile-achievements-toggle');
    const drawer = document.getElementById('mobile-achievements-drawer');

    drawerToggle?.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !drawerToggle.contains(e.target)) {
        drawer.classList.remove('open');
      }
    });

    // Show sidebar & mobile button after preloader
    setTimeout(() => {
      const sidebar = document.getElementById('achievements-sidebar');
      const mobileBtn = document.getElementById('mobile-achievements-toggle');
      sidebar?.classList.remove('sidebar-hidden');
      sidebar?.classList.add('sidebar-visible');
      mobileBtn?.classList.remove('mobile-btn-hidden');
      mobileBtn?.classList.add('mobile-btn-visible');
    }, 2500);
  }

  // ==========================================
  // PATCH REVEAL CONTACT FOR V3
  // ==========================================
  function patchRevealContact() {
    const orig = ELrevealContact;
    ELrevealContact = function() {
      orig();
      document.querySelectorAll('.v3-node-group[data-v3-target="contact"]').forEach(g => {
        g.classList.remove('locked');
      });
    };
  }

  // ==========================================
  // NAV BUTTONS INSIDE CONTENT
  // ==========================================
  function initContentNav() {
    document.querySelectorAll('[data-v3-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        if (el.tagName === 'A' && el.getAttribute('href')?.startsWith('#')) {
          // Allow external links
          return;
        }
        e.preventDefault();
        const target = el.getAttribute('data-v3-target');
        if (target) v3SwitchSection(target);
      });
    });
  }

  // ==========================================
  // INIT
  // ==========================================
  function init() {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    v3InitTheme();
    v3InitLanguage();
    initPreloader();
    initHeroSpotlight();
    initMobileMap();
    initMobileAchievements();
    initContentNav();

    // Shared modules
    ELinitGamification();
    ELinitContactForm();
    patchRevealContact();

    // Draw maps after layout
    setTimeout(() => {
      drawMap(document.getElementById('v3-map-svg'));
    }, 100);

    // Redraw on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        drawMap(document.getElementById('v3-map-svg'));
      }, 300);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
