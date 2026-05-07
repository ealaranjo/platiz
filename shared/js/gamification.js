/* ============================================
   Shared Gamification
   ============================================ */

window.ELachievementsData = [
  { id: 'caetano',        icon: '💼' },
  { id: 'alta',           icon: '📈' },
  { id: 'mds',            icon: '🏢' },
  { id: 'webow',          icon: '🌐' },
  { id: 'crm',            icon: '🤝' },
  { id: 'programming',    icon: '💻' },
  { id: 'automation',     icon: '⚡' },
  { id: 'ai',             icon: '🧠' },
  { id: 'analytics',      icon: '📊' },
  { id: 'databases',      icon: '🗄️' },
  { id: 'marketing-auto', icon: '📧' },
  { id: 'data-flow',      icon: '🔄' },
  { id: 'soft-proactivity',   icon: '🚀' },
  { id: 'soft-problem',       icon: '🧩' },
  { id: 'soft-adaptability',  icon: '🔄' },
  { id: 'soft-hyperfocus',    icon: '🎯' },
  { id: 'proj-crm',       icon: '🔧' },
  { id: 'proj-email',     icon: '📨' },
  { id: 'proj-data',      icon: '📉' },
  { id: 'proj-custom',    icon: '⚙️' },
  { id: 'proj-ai',        icon: '🤖' },
  { id: 'proj-workflow',  icon: '🔗' },
];

window.ELTOTAL_ACHIEVEMENTS = ELachievementsData.length;

function ELrenderAchievementList() {
  const list = document.getElementById('achievement-list');
  const listMobile = document.getElementById('achievement-list-mobile');
  const t = ELi18n[ELState.lang];
  const items = ELachievementsData.map(a => {
    const titleKey = 'achievements.' + a.id;
    let title = a.id;
    if (t[titleKey]) title = t[titleKey];
    else {
      title = a.id.replace(/-/g, ' ').replace(/proj-/g, '').replace(/soft-/g, '');
      title = title.charAt(0).toUpperCase() + title.slice(1);
    }
    return { ...a, title };
  });

  const html = items.map(a => `<li data-aid="${a.id}"><span class="trophy">🏆</span> ${a.icon} ${a.title}</li>`).join('');
  if (list) list.innerHTML = html;
  if (listMobile) listMobile.innerHTML = html;
}

function ELinitProgressBars() {
  const opts = {
    strokeWidth: 3,
    easing: 'easeInOut',
    duration: 800,
    color: '#2491b6',
    trailColor: 'rgba(128,128,128,0.2)',
    trailWidth: 3,
    svgStyle: { width: '100%', height: '6px', borderRadius: '3px' },
  };
  const container = document.getElementById('achievement-progress');
  const containerMobile = document.getElementById('achievement-progress-mobile');
  if (container && typeof ProgressBar !== 'undefined') {
    ELState.progressBar = new ProgressBar.Line(container, opts);
    ELState.progressBar.animate(0);
  }
  if (containerMobile && typeof ProgressBar !== 'undefined') {
    ELState.progressBarMobile = new ProgressBar.Line(containerMobile, opts);
    ELState.progressBarMobile.animate(0);
  }
}

function ELunlockAchievement(id) {
  if (ELState.unlocked.has(id)) return;
  ELState.unlocked.add(id);

  const mainEls = document.querySelectorAll(`[data-achievement="${id}"]`);
  mainEls.forEach(el => {
    el.classList.add('unlocked');
    const title = el.querySelector('h3');
    if (title && !title.querySelector('.trophy-main')) {
      const trophy = document.createElement('span');
      trophy.className = 'trophy-main ml-2 text-primary-400';
      trophy.textContent = '🏆';
      title.appendChild(trophy);
    }
  });

  document.querySelectorAll(`#achievement-list li[data-aid="${id}"], #achievement-list-mobile li[data-aid="${id}"]`).forEach(li => {
    li.classList.add('unlocked');
  });

  ELupdateProgress();

  if (!ELState.firstUnlockShown) {
    ELState.firstUnlockShown = true;
    ELfireConfetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    Swal.fire({
      title: ELi18n[ELState.lang]['alert.first.title'],
      text: ELi18n[ELState.lang]['alert.first.text'],
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: ELState.theme === 'dark' ? '#0f172a' : '#ffffff',
      color: ELState.theme === 'dark' ? '#f8fafc' : '#0f172a',
    });
  }

  ELcheckAllAchievements();
}

function ELupdateProgress() {
  const pct = ELState.unlocked.size / ELTOTAL_ACHIEVEMENTS;
  try {
    if (ELState.progressBar) ELState.progressBar.animate(pct);
  } catch (e) {}
  try {
    if (ELState.progressBarMobile) ELState.progressBarMobile.animate(pct);
  } catch (e) {}

  const pctText = Math.round(pct * 100) + '%';
  const textEl = document.getElementById('achievement-text');
  const textMobile = document.getElementById('achievement-text-mobile');
  const label = `${pctText} (${ELState.unlocked.size} / ${ELTOTAL_ACHIEVEMENTS})`;
  if (textEl) textEl.textContent = label;
  if (textMobile) textMobile.textContent = label;
}

function ELcheckAllAchievements() {
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
        if (window.ELlenisInstance) {
          window.ELlenisInstance.scrollTo('#contact', { offset: -80, duration: 1.5 });
        } else {
          const contactSection = document.getElementById('contact');
          if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

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
}

function ELrevealContact() {
  const contact = document.getElementById('contact');
  if (contact) contact.classList.remove('hidden');
  ['nav-contact', 'mobile-nav-contact', 'btn-contact-sidebar', 'btn-contact-mobile', 'congrats-msg', 'congrats-msg-mobile'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
  });
  const navContact = document.getElementById('nav-contact');
  const mobileNavContact = document.getElementById('mobile-nav-contact');
  if (navContact) navContact.classList.add('nav-highlight');
  if (mobileNavContact) mobileNavContact.classList.add('nav-highlight');
}

function ELfireConfetti(opts) {
  if (typeof confetti !== 'undefined') {
    confetti({ ...opts, colors: ['#2491b6', '#2bb3e0', '#0ea5e9', '#ffffff'] });
  }
}

function ELunlockSectionAchievements(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.querySelectorAll('[data-achievement]').forEach(el => {
    const id = el.getAttribute('data-achievement');
    ELunlockAchievement(id);
  });
}

function ELinitGamification() {
  ELrenderAchievementList();
  ELinitProgressBars();

  document.querySelectorAll('[data-achievement]').forEach(el => {
    const handler = () => {
      const id = el.getAttribute('data-achievement');
      ELunlockAchievement(id);
    };
    el.addEventListener('mouseenter', handler, { once: true });
    el.addEventListener('focus', handler, { once: true });
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-achievement');
      if (!ELState.unlocked.has(id)) ELunlockAchievement(id);
    });
  });

  const sidebarBtn = document.getElementById('btn-contact-sidebar');
  if (sidebarBtn) sidebarBtn.addEventListener('click', (e) => { e.preventDefault(); ELrevealContact(); });
  const mobileBtn = document.getElementById('btn-contact-mobile');
  if (mobileBtn) mobileBtn.addEventListener('click', (e) => {
    e.preventDefault();
    ELrevealContact();
    const drawer = document.getElementById('mobile-achievements-drawer');
    if (drawer) drawer.classList.remove('open');
  });
}
