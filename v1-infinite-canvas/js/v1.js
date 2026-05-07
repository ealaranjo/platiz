/* ============================================
   V1 Infinite Canvas Scripts
   ============================================ */

(() => {
  'use strict';

  // ==========================================
  // PAN / ZOOM STATE
  // ==========================================
  let panX = 0, panY = 0, zoom = 1;
  let isDragging = false, dragStartX, dragStartY;
  let pinchStartDist, pinchStartZoom;

  const v1Nodes = [
    { id: 'hero',     x: 0,    y: 0,    locked: false },
    { id: 'about',    x: 500,  y: -300, locked: false },
    { id: 'timeline', x: 700,  y: 150,  locked: false },
    { id: 'skills',   x: 300,  y: 400,  locked: false },
    { id: 'projects', x: -300, y: 300,  locked: false },
    { id: 'contact',  x: -500, y: -200, locked: true },
  ];

  const viewport = document.getElementById('v1-viewport');
  const canvas   = document.getElementById('v1-canvas');
  const svg      = document.getElementById('v1-connectors');

  function updateTransform() {
    canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
  }

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
    const overlay = document.getElementById('overlay-hero');
    if (!overlay) return;
    const tl = gsap.timeline();
    tl.from(overlay.querySelector('img'), { scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out' })
      .from(overlay.querySelector('.hero-name'), { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from(overlay.querySelector('.hero-subtitle'), { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from(overlay.querySelector('.hero-company'), { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from(overlay.querySelectorAll('.hero-cta'), { y: 20, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out' }, '-=0.3');
    tl.call(() => {
      const st = overlay.querySelector('.hero-subtitle');
      if (st) scrambleText(st);
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
  // THEME / LANGUAGE
  // ==========================================
  function v1InitTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    v1SetTheme(saved);
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      v1SetTheme(next);
    });
  }

  function v1SetTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    ELState.theme = theme;
    const moon = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>';
    const sun = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>';
    const icon = theme === 'dark' ? moon : sun;
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.innerHTML = icon;
  }

  function v1InitLanguage() {
    ELinitLanguage();
  }

  // ==========================================
  // PAN / ZOOM
  // ==========================================
  function initPanZoom() {
    viewport.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      if (e.target.closest('.v1-node') || e.target.closest('.v1-overlay.active')) return;
      isDragging = true;
      dragStartX = e.clientX - panX;
      dragStartY = e.clientY - panY;
      viewport.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      panX = e.clientX - dragStartX;
      panY = e.clientY - dragStartY;
      updateTransform();
    });
    window.addEventListener('mouseup', () => {
      isDragging = false;
      viewport.style.cursor = 'grab';
    });

    viewport.addEventListener('wheel', (e) => {
      if (e.target.closest('.v1-overlay.active')) return;
      e.preventDefault();
      const factor = e.deltaY > 0 ? 0.92 : 1.08;
      zoom = Math.min(Math.max(zoom * factor, 0.3), 2.5);
      updateTransform();
    }, { passive: false });

    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        if (t.target.closest('.v1-node') || t.target.closest('.v1-overlay.active')) return;
        isDragging = true;
        dragStartX = t.clientX - panX;
        dragStartY = t.clientY - panY;
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchStartDist = Math.sqrt(dx*dx + dy*dy);
        pinchStartZoom = zoom;
      }
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (e.touches.length === 1 && isDragging) {
        panX = e.touches[0].clientX - dragStartX;
        panY = e.touches[0].clientY - dragStartY;
        updateTransform();
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        zoom = Math.min(Math.max(pinchStartZoom * (dist / pinchStartDist), 0.3), 2.5);
        updateTransform();
      }
    }, { passive: false });

    viewport.addEventListener('touchend', () => { isDragging = false; });
  }

  // ==========================================
  // CONNECTORS
  // ==========================================
  function drawConnectors() {
    if (!svg) return;
    svg.innerHTML = '';
    for (let i = 0; i < v1Nodes.length - 1; i++) {
      const n1 = v1Nodes[i];
      const n2 = v1Nodes[i+1];
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const mx = (n1.x + n2.x) / 2;
      const my = (n1.y + n2.y) / 2;
      const d = `M ${n1.x + 1500} ${n1.y + 1500} Q ${mx + 1500} ${my + 1500 + 50} ${n2.x + 1500} ${n2.y + 1500}`;
      path.setAttribute('d', d);
      path.setAttribute('class', 'v1-connector');
      svg.appendChild(path);
    }
  }

  // ==========================================
  // OVERLAYS
  // ==========================================
  function openOverlay(id) {
    const overlay = document.getElementById('overlay-' + id);
    if (!overlay) return;
    overlay.classList.add('active');
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    animateSectionEntrance(id);
  }

  function closeOverlay(id) {
    const overlay = document.getElementById('overlay-' + id);
    if (!overlay) return;
    gsap.to(overlay, { opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: () => overlay.classList.remove('active') });
  }

  function initOverlays() {
    document.querySelectorAll('.v1-node').forEach(node => {
      node.addEventListener('click', () => {
        const target = node.getAttribute('data-v1-target');
        if (node.classList.contains('locked')) return;
        openOverlay(target);
      });
    });
    document.querySelectorAll('.v1-overlay-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const overlay = btn.closest('.v1-overlay');
        const id = overlay.id.replace('overlay-', '');
        closeOverlay(id);
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const active = document.querySelector('.v1-overlay.active');
        if (active) closeOverlay(active.id.replace('overlay-', ''));
      }
    });
  }

  function animateSectionEntrance(id) {
    if (prefersReducedMotion()) return;
    const overlay = document.getElementById('overlay-' + id);
    if (!overlay) return;
    if (id === 'hero') {
      gsap.from(overlay.querySelector('img'), { scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1 });
      gsap.from(overlay.querySelector('.hero-name'), { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
      gsap.from(overlay.querySelector('.hero-subtitle'), { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.3 });
      gsap.from(overlay.querySelector('.hero-company'), { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.4 });
      gsap.from(overlay.querySelectorAll('.hero-cta'), { y: 20, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out', delay: 0.5 });
    } else if (id === 'about') {
      gsap.from(overlay.querySelectorAll('h2, p'), { y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.1 });
    } else if (id === 'timeline') {
      gsap.to(overlay.querySelector('.timeline-line'), { scaleY: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 });
      gsap.from(overlay.querySelectorAll('.timeline-item'), { x: (i) => i % 2 === 0 ? -30 : 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
    } else if (id === 'skills') {
      gsap.from(overlay.querySelectorAll('.skill-card'), { y: 40, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out', delay: 0.1 });
      gsap.from(overlay.querySelectorAll('.soft-skill'), { scale: 0.9, opacity: 0, stagger: 0.05, duration: 0.4, ease: 'back.out(1.7)', delay: 0.3 });
    } else if (id === 'projects') {
      gsap.from(overlay.querySelectorAll('.project-card'), { y: 50, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.1 });
    } else if (id === 'contact') {
      gsap.from(overlay.querySelector('form'), { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 });
    }
  }

  // ==========================================
  // CONTROLS
  // ==========================================
  function initControls() {
    document.getElementById('v1-zoom-in')?.addEventListener('click', () => {
      zoom = Math.min(zoom * 1.2, 2.5); updateTransform();
    });
    document.getElementById('v1-zoom-out')?.addEventListener('click', () => {
      zoom = Math.max(zoom / 1.2, 0.3); updateTransform();
    });
    document.getElementById('v1-reset')?.addEventListener('click', () => {
      panX = 0; panY = 0; zoom = 1; updateTransform();
    });
  }

  // ==========================================
  // MOBILE ACHIEVEMENTS
  // ==========================================
  function initMobileAchievements() {
    const drawerToggle = document.getElementById('mobile-achievements-toggle');
    const drawer = document.getElementById('mobile-achievements-drawer');
    drawerToggle?.addEventListener('click', () => drawer.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !drawerToggle.contains(e.target)) drawer.classList.remove('open');
    });
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
  // PATCHES
  // ==========================================
  function patchRevealContact() {
    const orig = ELrevealContact;
    ELrevealContact = function() {
      orig();
      document.querySelectorAll('.v1-node[data-v1-target="contact"]').forEach(n => n.classList.remove('locked'));
    };
  }

  function patchCheckAllAchievements() {
    ELcheckAllAchievements = function() {
      if (ELState.unlocked.size >= ELTOTAL_ACHIEVEMENTS && !ELState.allUnlockedShown) {
        ELState.allUnlockedShown = true;
        setTimeout(() => {
          ELfireConfetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
          Swal.fire({
            title: ELi18n[ELState.lang]['alert.all.title'],
            text: ELi18n[ELState.lang]['alert.all.text'],
            icon: 'success',
            confirmButtonText: 'OK',
            background: ELState.theme === 'dark' ? '#0f172a' : '#ffffff',
            color: ELState.theme === 'dark' ? '#f8fafc' : '#0f172a',
            confirmButtonColor: '#2491b6',
          }).then(() => {
            openOverlay('contact');
            const btnDesktop = document.getElementById('btn-contact-sidebar');
            if (btnDesktop) {
              btnDesktop.classList.add('animate-pulse-glow');
              const sidebar = document.getElementById('achievements-sidebar');
              if (sidebar) sidebar.scrollTop = btnDesktop.offsetTop - sidebar.offsetTop;
            }
            const btnMobile = document.getElementById('btn-contact-mobile');
            if (btnMobile) {
              btnMobile.classList.add('animate-pulse-glow');
              const drawer = document.getElementById('mobile-achievements-drawer');
              if (drawer) {
                drawer.classList.add('open');
                drawer.scrollTop = btnMobile.offsetTop - drawer.offsetTop;
              }
            }
          });
        }, 600);
        ELrevealContact();
      }
    };
  }

  // ==========================================
  // INIT
  // ==========================================
  function init() {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    v1InitTheme();
    v1InitLanguage();
    initPreloader();
    initPanZoom();
    drawConnectors();
    initOverlays();
    initControls();
    initMobileAchievements();

    ELinitGamification();
    ELinitContactForm();
    patchRevealContact();
    patchCheckAllAchievements();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
