/* ============================================
   V2 Tunnel Vision Scripts — Enhanced
   ============================================ */

(() => {
  'use strict';

  const v2Sections = ['hero', 'about', 'timeline', 'skills', 'projects', 'contact'];
  let v2Current = 0;
  let v2IsTransitioning = false;
  const v2Visited = new Set(['hero']);

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
      .from(hero.querySelectorAll('.v2-nav-btn, a'), { y: 20, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out' }, '-=0.3');

    tl.call(() => {
      const subtitle = document.getElementById('hero-subtitle');
      if (subtitle) scrambleText(subtitle);
      showFirstVisitToast();
    }, null, '+=0.2');
  }

  function showFirstVisitToast() {
    if (localStorage.getItem('v2-first-visit-toast-dismissed')) return;
    const toast = document.getElementById('first-visit-toast');
    if (!toast) return;
    localStorage.setItem('v2-first-visit-toast-dismissed', '1');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { toast.classList.add('visible'); });
    });
    const dismiss = () => {
      toast.classList.remove('visible');
      setTimeout(() => { toast.style.display = 'none'; }, 500);
    };
    document.getElementById('dismiss-toast')?.addEventListener('click', dismiss);
    setTimeout(dismiss, 8000);
  }

  function scrambleText(el) {
    if (el._scrambleInterval) { clearInterval(el._scrambleInterval); el._scrambleInterval = null; }
    const finalText = el.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const duration = 1200;
    const steps = 10;
    const stepTime = duration / (finalText.length * steps);
    let iteration = 0;

    el._scrambleInterval = setInterval(() => {
      el.textContent = finalText.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (i < Math.floor(iteration / steps)) return finalText[i];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      iteration++;
      if (iteration >= finalText.length * steps) {
        clearInterval(el._scrambleInterval);
        el._scrambleInterval = null;
        el.textContent = finalText;
      }
    }, stepTime);
  }

  // ==========================================
  // THEME
  // ==========================================
  function v2InitTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    v2SetTheme(saved);
    const handler = () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      v2SetTheme(next);
    };
    document.getElementById('theme-toggle')?.addEventListener('click', handler);
  }

  function v2SetTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    ELState.theme = theme;
    const moon = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>';
    const sun = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>';
    const icon = theme === 'dark' ? moon : sun;
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.innerHTML = icon;
  }

  // ==========================================
  // LANGUAGE
  // ==========================================
  function v2InitLanguage() {
    ELinitLanguage();
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
  // WARP RAYS
  // ==========================================
  function initWarpRays() {
    const container = document.getElementById('v2-warp-rays');
    if (!container) return;
    const count = 24;
    for (let i = 0; i < count; i++) {
      const line = document.createElement('div');
      line.className = 'v2-warp-line';
      const angle = (i / count) * 360;
      const dist = 20 + Math.random() * 40;
      line.style.transform = `rotate(${angle}deg) translateZ(-200px)`;
      line.style.left = `calc(50% + ${Math.cos(angle * Math.PI / 180) * dist}px)`;
      line.style.top = `calc(50% + ${Math.sin(angle * Math.PI / 180) * dist}px)`;
      container.appendChild(line);
    }
  }

  function triggerWarpRays(direction) {
    if (prefersReducedMotion()) return;
    const container = document.getElementById('v2-warp-rays');
    if (!container) return;
    container.classList.add('active');

    const lines = container.querySelectorAll('.v2-warp-line');
    lines.forEach((line, i) => {
      const delay = i * 0.01;
      const duration = 0.4 + Math.random() * 0.3;
      gsap.fromTo(line,
        { opacity: 0, scaleY: 0.2 },
        {
          opacity: 1,
          scaleY: 1.5,
          duration: duration,
          delay: delay,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            if (i === lines.length - 1) container.classList.remove('active');
          }
        }
      );
    });
  }

  // ==========================================
  // TUNNEL
  // ==========================================
  function initTunnel() {
    v2Sections.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const dist = i - v2Current;
      const scale = dist === 0 ? 1 : (Math.abs(dist) === 1 ? 0.72 : 0.45);
      gsap.set(el, {
        z: i * 1200,
        rotateY: dist * -6,
        rotateX: dist * -3,
        scale: scale,
        opacity: i === 0 ? 1 : 0
      });
      if (i === 0) el.classList.add('active');
    });
    v2Current = 0;
    updateControls();
    updateProgress();
    showTrophyForSection(0);
  }

  function v2SwitchSection(index, instant = false) {
    if (index === v2Current) return;
    if (v2IsTransitioning) return;
    if (!canNavigateTo(index)) return;

    v2IsTransitioning = true;
    const duration = instant ? 0 : 0.9;
    const direction = index > v2Current ? 1 : -1;

    // Mark visited
    v2Visited.add(v2Sections[index]);

    // Trigger warp rays
    triggerWarpRays(direction);

    // Animate data packet on progress bar
    animateDataPacket(v2Current, index);

    v2Sections.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const dist = i - index;
      const absDist = Math.abs(dist);
      const scale = absDist === 0 ? 1 : (absDist === 1 ? 0.72 : 0.45);
      const opacity = absDist === 0 ? 1 : 0;

      gsap.to(el, {
        z: dist * 1200,
        rotateY: dist * -6,
        rotateX: dist * -3,
        scale: scale,
        opacity: opacity,
        duration: duration,
        ease: 'power3.inOut',
        onComplete: () => {
          if (i === index) {
            animateSectionEntrance(id);
            el.scrollTop = 0;
          }
          if (i === v2Sections.length - 1) {
            v2IsTransitioning = false;
            updateProgress();
            // Scroll progress bar to center active node on mobile
            requestAnimationFrame(() => {
              const progress = document.getElementById('v2-progress');
              const activeNode = progress?.querySelector('.v2-node-wrapper.active');
              if (progress && activeNode) {
                const scrollLeft = activeNode.offsetLeft - progress.clientWidth / 2 + activeNode.clientWidth / 2;
                progress.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
              }
            });
          }
        }
      });

      if (i === index) {
        el.classList.add('active');
        el.setAttribute('aria-hidden', 'false');
      } else {
        el.classList.remove('active');
        el.setAttribute('aria-hidden', 'true');
      }
    });

    v2Current = index;
    updateControls();
    showTrophyForSection(index);
  }

  function canNavigateTo(index) {
    if (index < 0 || index >= v2Sections.length) return false;
    return true;
  }

  function updateControls() {
    const prevBtn = document.getElementById('v2-prev');
    const nextBtn = document.getElementById('v2-next');
    if (prevBtn) prevBtn.disabled = v2Current === 0;
    if (nextBtn) nextBtn.disabled = !canNavigateTo(v2Current + 1);
  }

  // ==========================================
  // PROGRESS BAR WITH WORKFLOW CONNECTORS
  // ==========================================
  function updateProgress() {
    const container = document.getElementById('v2-progress');
    if (!container) return;
    container.innerHTML = '';

    const total = v2Sections.length;
    const nodeWidth = 120;
    const connectorWidth = 16;
    const packetWrapWidth = (nodeWidth + connectorWidth) * (total - 1) + nodeWidth;

    container.style.position = 'relative';
    container.style.flexWrap = 'nowrap';

    v2Sections.forEach((id, i) => {
      // Connector line (except before first node)
      if (i > 0) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const conn = document.createElementNS(svgNS, 'svg');
        conn.setAttribute('class', 'v2-node-connector');
        conn.setAttribute('width', '16');
        conn.setAttribute('height', '8');
        conn.setAttribute('viewBox', '0 0 16 8');
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', '0');
        line.setAttribute('y1', '4');
        line.setAttribute('x2', '11');
        line.setAttribute('y2', '4');
        line.setAttribute('stroke', 'rgba(36,145,182,0.25)');
        line.setAttribute('stroke-width', '2');
        conn.appendChild(line);
        const arrow = document.createElementNS(svgNS, 'polygon');
        arrow.setAttribute('points', '11,1 16,4 11,7');
        arrow.setAttribute('fill', 'rgba(36,145,182,0.35)');
        conn.appendChild(arrow);
        container.appendChild(conn);
      }

      // Node wrapper
      const wrapper = document.createElement('div');
      wrapper.style.width = nodeWidth + 'px';

      let stateClass = '';
      if (i === v2Current) stateClass = ' active';
      else if (id === 'contact' && typeof ELTOTAL_ACHIEVEMENTS !== 'undefined' && ELState.unlocked.size < ELTOTAL_ACHIEVEMENTS) stateClass = ' locked';
      else if (v2Visited.has(id)) stateClass = ' visited';
      wrapper.className = 'v2-node-wrapper' + stateClass;
      wrapper.addEventListener('click', () => v2SwitchSection(i));

      // Node card
      const node = document.createElement('div');
      node.className = 'v2-node';

      const pinLeft = document.createElement('span');
      pinLeft.className = 'v2-node-pin';
      node.appendChild(pinLeft);

      const status = document.createElement('span');
      status.className = 'v2-node-status';
      node.appendChild(status);

      const label = document.createElement('span');
      label.className = 'v2-node-label';
      label.setAttribute('data-i18n', 'nav.' + id);
      const t = ELi18n[ELState.lang];
      label.textContent = t && t['nav.' + id] ? t['nav.' + id] : id;
      node.appendChild(label);

      const pinRight = document.createElement('span');
      pinRight.className = 'v2-node-pin';
      node.appendChild(pinRight);

      wrapper.appendChild(node);
      container.appendChild(wrapper);
    });

    // Data packet (absolute positioned inside container)
    const packet = document.createElement('div');
    packet.id = 'v2-data-packet';
    container.appendChild(packet);
  }

  function animateDataPacket(fromIndex, toIndex) {
    const packet = document.getElementById('v2-data-packet');
    if (!packet || prefersReducedMotion()) return;

    const nodeWidth = 120;
    const connectorWidth = 16;
    const step = fromIndex < toIndex ? 1 : -1;

    const getX = (i) => i * (nodeWidth + connectorWidth) + nodeWidth / 2 - 3;

    gsap.set(packet, { opacity: 1, left: getX(fromIndex) + 'px' });

    const tl = gsap.timeline({
      onComplete: () => gsap.to(packet, { opacity: 0, duration: 0.2 })
    });

    for (let i = fromIndex; i !== toIndex; i += step) {
      const nextI = i + step;
      tl.to(packet, {
        left: getX(nextI) + 'px',
        duration: 0.2,
        ease: 'power2.inOut'
      }, i === fromIndex ? 0 : '+=0');
    }
  }

  function animateSectionEntrance(sectionId) {
    if (prefersReducedMotion()) return;
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Staggered unlock for active section (one by one, 600ms apart)
    const cards = Array.from(section.querySelectorAll('[data-achievement]'));
    cards.forEach((card, i) => {
      setTimeout(() => {
        const id = card.getAttribute('data-achievement');
        if (id && typeof ELunlockAchievement === 'function') ELunlockAchievement(id);
      }, i * 1000);
    });

    if (sectionId === 'hero') {
      gsap.fromTo(section.querySelector('img'), { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.1 });
      gsap.fromTo('#hero-name', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('#hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo('#hero-company', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.4 });
      gsap.fromTo(section.querySelectorAll('.v2-nav-btn, a'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power3.out', delay: 0.5 });
    } else if (sectionId === 'about') {
      gsap.fromTo(section.querySelectorAll('h2, p'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.1 });
    } else if (sectionId === 'timeline') {
      gsap.to(section.querySelector('.timeline-line'), { scaleY: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 });
      gsap.fromTo(section.querySelectorAll('.timeline-item'), { x: (i) => i % 2 === 0 ? -30 : 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
    } else if (sectionId === 'skills') {
      gsap.fromTo(section.querySelectorAll('.skill-card'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out', delay: 0.1 });
      gsap.fromTo(section.querySelectorAll('.soft-skill'),
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'back.out(1.7)', delay: 0.3 }
      );
    } else if (sectionId === 'projects') {
      gsap.fromTo(section.querySelectorAll('.project-card'), { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.1 });
    } else if (sectionId === 'contact') {
      gsap.fromTo(section.querySelector('form'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 });
    }
  }

  // ==========================================
  // CONTROLS
  // ==========================================
  function initControls() {
    document.getElementById('v2-prev')?.addEventListener('click', () => v2SwitchSection(v2Current - 1));
    document.getElementById('v2-next')?.addEventListener('click', () => v2SwitchSection(v2Current + 1));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        v2SwitchSection(v2Current + 1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        v2SwitchSection(v2Current - 1);
      }
    });

    let touchStartX = 0;
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].clientX - touchStartX;
      const diffY = e.changedTouches[0].clientY - touchStartY;

      // Swipe horizontal (mantém)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX < 0) v2SwitchSection(v2Current + 1);
        else v2SwitchSection(v2Current - 1);
        return;
      }

      // Swipe vertical (novo) — scroll com dedo
      if (Math.abs(diffY) > 50) {
        if (diffY < 0) v2SwitchSection(v2Current + 1); // para baixo → próxima
        else v2SwitchSection(v2Current - 1);           // para cima → anterior
      }
    }, { passive: true });

    // Scroll wheel navigation — only switches sections when at top/bottom of current section
    let wheelTimeout = null;
    let wheelAccumulated = 0;
    const wheelThreshold = 60;

    function getActiveSectionScrollInfo() {
      const activeSection = document.querySelector('.v2-section.active');
      if (!activeSection) return { canScrollDown: false, canScrollUp: false };
      const scrollTop = activeSection.scrollTop;
      const scrollHeight = activeSection.scrollHeight;
      const clientHeight = activeSection.clientHeight;
      const maxScroll = Math.max(0, scrollHeight - clientHeight);
      // Tolerance of 2px for rounding errors
      return {
        canScrollDown: scrollTop < maxScroll - 2,
        canScrollUp: scrollTop > 2,
        atTop: scrollTop <= 2,
        atBottom: scrollTop >= maxScroll - 2,
      };
    }

    document.addEventListener('wheel', (e) => {
      // Only intercept wheel when not inside an overlay or modal
      if (e.target.closest('.v1-overlay.active, .swal2-popup, #mobile-achievements-drawer.open')) return;

      const scrollInfo = getActiveSectionScrollInfo();

      // If section has scrollable content, let it scroll first
      if (e.deltaY > 0 && scrollInfo.canScrollDown) {
        // Scrolling down and content below — let section scroll
        return;
      }
      if (e.deltaY < 0 && scrollInfo.canScrollUp) {
        // Scrolling up and content above — let section scroll
        return;
      }

      e.preventDefault();

      wheelAccumulated += e.deltaY;

      if (wheelTimeout) clearTimeout(wheelTimeout);

      wheelTimeout = setTimeout(() => {
        wheelAccumulated = 0;
      }, 150);

      if (Math.abs(wheelAccumulated) > wheelThreshold) {
        if (wheelAccumulated > 0) {
          v2SwitchSection(v2Current + 1);
        } else {
          v2SwitchSection(v2Current - 1);
        }
        wheelAccumulated = 0;
        if (wheelTimeout) clearTimeout(wheelTimeout);
      }
    }, { passive: false });
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

    // Show mobile toggle button
    drawerToggle?.classList.remove('mobile-btn-hidden');
    drawerToggle?.classList.add('mobile-btn-visible');
  }

  // ==========================================
  // TROPHY BUTTON + ACHIEVEMENT MODAL
  // ==========================================
  let trophyPulseTimeout = null;

  function openAchievementModal() {
    document.getElementById('achievement-modal')?.classList.add('open');
    setTimeout(() => {
      if (typeof ELTOTAL_ACHIEVEMENTS === 'undefined') return;
      const pct = ELState.unlocked.size / ELTOTAL_ACHIEVEMENTS;
      try { if (ELState.progressBar) ELState.progressBar.animate(pct); } catch(e) {}
    }, 50);
  }

  function closeAchievementModal() {
    document.getElementById('achievement-modal')?.classList.remove('open');
  }

  function updateTrophyCount() {
    const count = document.getElementById('trophy-count');
    const total = typeof ELTOTAL_ACHIEVEMENTS !== 'undefined' ? ELTOTAL_ACHIEVEMENTS : 22;
    if (count) count.textContent = ELState.unlocked.size + '/' + total;
  }

  function pulseTrophy() {
    const btn = document.getElementById('trophy-btn');
    if (!btn) return;
    btn.classList.add('pulse');
    if (trophyPulseTimeout) clearTimeout(trophyPulseTimeout);
    trophyPulseTimeout = setTimeout(() => btn.classList.remove('pulse'), 2000);
  }

  function showTrophyForSection(index) {
    const btn = document.getElementById('trophy-btn');
    if (!btn) return;
    index === 0 ? btn.classList.add('hidden') : btn.classList.remove('hidden');
  }

  function initTrophyButton() {
    try {
      document.getElementById('trophy-btn')?.addEventListener('click', openAchievementModal);
      document.getElementById('achievement-modal-backdrop')?.addEventListener('click', closeAchievementModal);
      document.getElementById('achievement-modal-close')?.addEventListener('click', closeAchievementModal);
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeAchievementModal();
      });
      updateTrophyCount();
      var lockProgress = document.getElementById('contact-lock-progress');
      var total = typeof ELTOTAL_ACHIEVEMENTS !== 'undefined' ? ELTOTAL_ACHIEVEMENTS : 22;
      if (lockProgress) lockProgress.textContent = '0 / ' + total;
    } catch(e) { /* silently ignore init errors */ }
  }

  // ==========================================
  // PATCHES FOR SHARED MODULES
  // ==========================================
  function patchRevealContact() {
    const orig = ELrevealContact;
    ELrevealContact = function() {
      orig();
      // Hide lock overlay
      const overlay = document.getElementById('contact-lock-overlay');
      overlay?.classList.add('hidden');
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const index = v2Sections.indexOf('contact');
        const dist = index - v2Current;
        gsap.set(contactSection, {
          z: dist * 1200,
          rotateY: dist * -6,
          rotateX: dist * -3,
          scale: Math.abs(dist) === 0 ? 1 : (Math.abs(dist) === 1 ? 0.72 : 0.45)
        });
      }
      updateControls();
      updateProgress();
    };
  }

  function patchCheckAllAchievements() {
    ELcheckAllAchievements = function() {
      if (ELState.unlocked.size >= ELTOTAL_ACHIEVEMENTS && !ELState.allUnlockedShown) {
        ELState.allUnlockedShown = true;
        const trophyBtn = document.getElementById('trophy-btn');
        trophyBtn?.classList.remove('hidden');
        trophyBtn?.classList.add('all-unlocked');
        // Hide lock overlay
        const overlay = document.getElementById('contact-lock-overlay');
        overlay?.classList.add('hidden');
        updateTrophyCount();
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
            v2SwitchSection(v2Sections.indexOf('contact'));
            const btnDesktop = document.getElementById('btn-contact-sidebar');
            if (btnDesktop) {
              btnDesktop.classList.add('animate-pulse-glow');
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

  function patchUnlockAchievement() {
    const orig = ELunlockAchievement;
    ELunlockAchievement = function(id) {
      orig(id);
      updateTrophyCount();
      // Update lock overlay progress
      const progress = document.getElementById('contact-lock-progress');
      if (progress) progress.textContent = ELState.unlocked.size + ' / ' + ELTOTAL_ACHIEVEMENTS;
      if (v2Current !== 0) {
        pulseTrophy();
      }
    };
  }

  // ==========================================
  // NAV BUTTONS INSIDE CONTENT
  // ==========================================
  function initContentNav() {
    document.querySelectorAll('[data-v2-target]').forEach(el => {
      el.addEventListener('click', (e) => {
        if (el.tagName === 'A' && el.getAttribute('href')?.startsWith('#')) return;
        e.preventDefault();
        const target = el.getAttribute('data-v2-target');
        const index = v2Sections.indexOf(target);
        if (index !== -1) v2SwitchSection(index);
      });
    });
  }

  // ==========================================
  // INIT
  // ==========================================
  function init() {
    try {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    v2InitTheme();
    v2InitLanguage();
    initPreloader();
    initHeroSpotlight();
    initWarpRays();
    initTunnel();
    initControls();
    initMobileAchievements();
    initTrophyButton();
    initContentNav();

    ELinitGamification();
    ELinitContactForm();
    patchRevealContact();
    patchCheckAllAchievements();
    patchUnlockAchievement();
    } catch(e) { /* v2 init error */ }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
