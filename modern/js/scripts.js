/* ============================================
   Emanuel Laranjo — Modern CV Scripts
   ============================================ */

(() => {
  'use strict';

  // ==========================================
  // CONFIG
  // ==========================================
  const CONFIG = {
    recaptchaSiteKey: '6Le1n9ErAAAAAN_cU3czJkA4YNJU71ZmDVGGthkb',
    gaId:             'G-0LX61SBVQW',
  };

  // ==========================================
  // STATE
  // ==========================================
  const state = {
    lang: 'en',
    theme: 'dark',
    unlocked: new Set(),
    firstUnlockShown: false,
    allUnlockedShown: false,
    progressBar: null,
    progressBarMobile: null,
    isMobile: window.innerWidth < 1024,
  };

  // ==========================================
  // ACHIEVEMENTS DATA
  // ==========================================
  const achievementsData = [
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

  const TOTAL_ACHIEVEMENTS = achievementsData.length;

  // ==========================================
  // I18N DATA
  // ==========================================
  const i18n = {
    en: {
      'meta.title': 'Emanuel Laranjo | CRM & Automation Specialist',
      'nav.logo': 'EL',
      'nav.about': 'About',
      'nav.timeline': 'Timeline',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',
      'hero.subtitle': 'CRM and Process Automation Specialist',
      'hero.company': '@ Caetano Automotive Portugal',
      'hero.cta.primary': 'Explore Profile',
      'hero.scroll': 'Scroll',
      'about.label': 'About Me',
      'about.title': 'Bridging Technology & Business',
      'about.years': 'Years Experience',
      'about.p1': 'Professional specializing in CRM solution architecture, workflow automation, and API integration, currently working in the automotive industry in Portugal.',
      'about.p2': 'I design and implement CRM, automation and AI-powered solutions, integrating multiple platforms and tools to deliver scalable, end-to-end digital workflows.',
      'about.p3': 'Passionate about AI integration, process optimization, and building intelligent digital experiences that align technology with business goals.',
      'timeline.label': 'Career Path',
      'timeline.title': 'Professional Timeline',
      'timeline.t1.title': 'CRM and Process Automation Specialist',
      'timeline.t1.desc': 'Acting as the most senior technical member of the Business Development team, architecting CRM solutions, automating end-to-end processes and implementing AI-powered integrations to streamline retail operations and enhance customer engagement. Focused on Zoho CRM customization, workflow automation and performance dashboards to support strategic decision-making.',
      'timeline.t2.title': 'CRM & Software Developer',
      'timeline.t2.desc': 'Developed and maintained CRM functionality for multiple clients, ensuring stability, issue resolution, and continuous improvement. Worked with SuiteCRM, PHP, Node.js, Docker, MySQL, and REST APIs to support integrations and business requirements.',
      'timeline.t3.title': 'CRM Consultant, CRM & Integration Developer',
      'timeline.t3.desc': 'Developed and maintained CRM features, implemented REST API integrations, data integrations and delivered reporting solutions with SSRS/SSIS to support business operations. Worked closely with internal stakeholders and suppliers to evolve CRM processes and align technical solutions with business requirements.',
      'timeline.t4.title': 'Web Developer',
      'timeline.t4.desc': 'Developed web solutions with PHP, Symfony, JavaScript, CSS, SQLand MySQL.',
      'skills.label': 'Expertise',
      'skills.title': 'Skills & Technologies',
      'skills.crm.title': 'CRM',
      'skills.programming.title': 'Programming',
      'skills.automation.title': 'Automation',
      'skills.ai.title': 'AI',
      'skills.analytics.title': 'Analytics',
      'skills.databases.title': 'Databases',
      'skills.marketing.title': 'Marketing Automation',
      'skills.dataflow.title': 'Data Flow',
      'skills.soft.title': 'Soft Skills',
      'skills.soft.proactivity': 'Proactivity',
      'skills.soft.problem': 'Problem Solving',
      'skills.soft.adaptability': 'Adaptability',
      'skills.soft.hyperfocus': 'Hyperfocus',
      'achievements.caetano': 'Caetano Automotive Portugal',
      'achievements.alta': 'ALTA Digital',
      'achievements.mds': 'MDS Group / PrimeIT',
      'achievements.webow': 'Webow',
      'achievements.crm': 'CRM Expertise',
      'achievements.programming': 'Programming',
      'achievements.automation': 'Automation',
      'achievements.ai': 'Artificial Intelligence',
      'achievements.analytics': 'Analytics',
      'achievements.databases': 'Databases',
      'achievements.marketing-auto': 'Marketing Automation',
      'achievements.data-flow': 'Data Flow',
      'achievements.soft-proactivity': 'Proactivity',
      'achievements.soft-problem': 'Problem Solving',
      'achievements.soft-adaptability': 'Adaptability',
      'achievements.soft-hyperfocus': 'Hyperfocus',
      'achievements.proj-crm': 'CRM Integration',
      'achievements.proj-email': 'Email Automation',
      'achievements.proj-data': 'Data Analysis',
      'achievements.proj-custom': 'CRM Customization',
      'achievements.proj-ai': 'AI Assistants',
      'achievements.proj-workflow': 'Workflow Automation',
      'projects.label': 'Portfolio',
      'projects.title': 'Featured Projects',
      'projects.p1.title': 'CRM Integration',
      'projects.p1.desc': 'Unified multiple data sources into a single CRM platform, improving data accuracy and sales team efficiency.',
      'projects.p2.title': 'Email Automation',
      'projects.p2.desc': 'Designed automated email sequences that increased engagement rates by 40% and reduced manual workload.',
      'projects.p3.title': 'Data Analysis',
      'projects.p3.desc': 'Built interactive dashboards and reporting pipelines that transformed raw data into actionable business insights.',
      'projects.p4.title': 'CRM Customization',
      'projects.p4.desc': 'Tailored CRM modules and workflows to match specific business processes, boosting user adoption.',
      'projects.p5.title': 'AI Assistants',
      'projects.p5.desc': 'Developed AI-powered assistants to automate customer support and internal knowledge retrieval.',
      'projects.p6.title': 'Workflow Automation',
      'projects.p6.desc': 'Streamlined end-to-end business processes by connecting apps and automating repetitive tasks.',
      'contact.label': 'Get in Touch',
      'contact.title': "Let's Work Together",
      'contact.name': 'Name',
      'contact.email': 'Email',
      'contact.message': 'Message',
      'contact.send': 'Send Message',
      'contact.qr': 'Scan to connect on LinkedIn',
      'sidebar.title': 'Achievements',
      'sidebar.congrats': 'All achievements unlocked!',
      'sidebar.contact': 'Contact Me',
      'footer.rights': 'All rights reserved.',
      'alert.first.title': 'First achievement unlocked!',
      'alert.first.text': 'Keep exploring to unlock more.',
      'alert.all.title': 'Congratulations!',
      'alert.all.text': 'You unlocked all achievements! The contact form is now available.',
      'form.success': 'Message sent successfully!',
      'form.error': 'Something went wrong. Please try again.',
      'form.captcha': 'Please complete the reCAPTCHA.',
    },
    pt: {
      'meta.title': 'Emanuel Laranjo | Especialista em CRM & Automação',
      'nav.logo': 'EL',
      'nav.about': 'Sobre',
      'nav.timeline': 'Percurso',
      'nav.skills': 'Competências',
      'nav.projects': 'Projetos',
      'nav.contact': 'Contacto',
      'hero.subtitle': 'Especialista em CRM e Automação de Processos',
      'hero.company': '@ Caetano Automotive Portugal',
      'hero.cta.primary': 'Explorar Perfil',
      'hero.scroll': 'Deslizar',
      'about.label': 'Sobre Mim',
      'about.title': 'A Tecnologia ao Serviço do Negócio',
      'about.years': 'Anos de Experiência',
      'about.p1': 'Profissional especializado em arquitetura de soluções CRM, automação de workflows e integração de APIs, atualmente a trabalhar no setor automóvel em Portugal.',
      'about.p2': 'Desenho e implemento soluções de CRM, automação e inteligência artificial, integrando várias plataformas e ferramentas para criar fluxos de trabalho digitais escaláveis e completos.',
      'about.p3': 'Apaixonado por integração de IA, otimização de processos e construção de experiências digitais inteligentes que alinham tecnologia com objetivos de negócio.',
      'timeline.label': 'Percurso Profissional',
      'timeline.title': 'Linha do Tempo',
      'timeline.t1.title': 'Especialista em CRM e Automação de Processos',
      'timeline.t1.desc': 'Na qualidade de membro técnico mais sénior da equipa de Desenvolvimento de Negócios, concebo soluções de CRM, automatizo processos de ponta a ponta e implemento integrações baseadas em IA para otimizar as operações de retalho e reforçar o envolvimento dos clientes. Dedico-me à customização do Zoho CRM, à automatização de fluxos de trabalho e à criação de Dashboards para apoiar a tomada de decisões estratégicas.',
      'timeline.t2.title': 'CRM & Software Developer',
      'timeline.t2.desc': 'Desenvolvi e mantive funcionalidades de CRM para vários clientes, garantindo a estabilidade, a resolução de problemas e a melhoria contínua. Trabalhei com SuiteCRM, PHP, Node.js, Docker, MySQL e APIs REST para dar resposta às integrações e aos requisitos empresariais.',
      'timeline.t3.title': 'Consultor de CRM, CRM & Integration Developer',
      'timeline.t3.desc': 'Desenvolvi e mantive funcionalidades de CRM, implementei integrações de API REST e integrações de dados, e implementei soluções de relatórios com SSRS/SSIS para apoiar as operações comerciais. Trabalhei em estreita colaboração com as partes interessadas internas e os fornecedores para aperfeiçoar os processos de CRM e alinhar as soluções técnicas com os requisitos comerciais.',
      'timeline.t4.title': 'Web Developer',
      'timeline.t4.desc': 'Desenvolvi soluções web com PHP, Symfony, JavaScript, CSS, SQL e MySQL.',
      'skills.label': 'Especialização',
      'skills.title': 'Competências e Tecnologias',
      'skills.crm.title': 'CRM',
      'skills.programming.title': 'Programação',
      'skills.automation.title': 'Automação',
      'skills.ai.title': 'IA',
      'skills.analytics.title': 'Análise de Dados',
      'skills.databases.title': 'Bases de Dados',
      'skills.marketing.title': 'Marketing Automation',
      'skills.dataflow.title': 'Data Flow',
      'skills.soft.title': 'Soft Skills',
      'skills.soft.proactivity': 'Proatividade',
      'skills.soft.problem': 'Resolução de Problemas',
      'skills.soft.adaptability': 'Adaptabilidade',
      'skills.soft.hyperfocus': 'Hiperfoco',
      'achievements.caetano': 'Caetano Automotive Portugal',
      'achievements.alta': 'ALTA Digital',
      'achievements.mds': 'MDS Group / PrimeIT',
      'achievements.webow': 'Webow',
      'achievements.crm': 'Competência em CRM',
      'achievements.programming': 'Programação',
      'achievements.automation': 'Automação',
      'achievements.ai': 'Inteligência Artificial',
      'achievements.analytics': 'Análise de Dados',
      'achievements.databases': 'Bases de Dados',
      'achievements.marketing-auto': 'Marketing Automation',
      'achievements.data-flow': 'Data Flow',
      'achievements.soft-proactivity': 'Proatividade',
      'achievements.soft-problem': 'Resolução de Problemas',
      'achievements.soft-adaptability': 'Adaptabilidade',
      'achievements.soft-hyperfocus': 'Hiperfoco',
      'achievements.proj-crm': 'Integração de CRM',
      'achievements.proj-email': 'Automação de Email',
      'achievements.proj-data': 'Análise de Dados',
      'achievements.proj-custom': 'Customização de CRM',
      'achievements.proj-ai': 'Assistentes de IA',
      'achievements.proj-workflow': 'Automação de Workflows',
      'projects.label': 'Portfólio',
      'projects.title': 'Projetos em Destaque',
      'projects.p1.title': 'Integração de CRM',
      'projects.p1.desc': 'Unificação de múltiplas fontes de dados numa única plataforma CRM, melhorando a precisão dos dados e a eficiência da equipa comercial.',
      'projects.p2.title': 'Automação de Email',
      'projects.p2.desc': 'Criação de sequências de email automatizadas que aumentaram as taxas de engagement e reduziram o trabalho manual.',
      'projects.p3.title': 'Análise de Dados',
      'projects.p3.desc': 'Construção de dashboards interativos e pipelines de relatórios que transformaram dados brutos em insights acionáveis para o negócio.',
      'projects.p4.title': 'Customização de CRM',
      'projects.p4.desc': 'Customização de módulos e fluxos de trabalho do CRM para corresponder a processos de negócio específicos, aumentando a adoção pelos utilizadores.',
      'projects.p5.title': 'Assistentes de IA',
      'projects.p5.desc': 'Desenvolvimento de assistentes baseados em IA para automatizar o suporte ao cliente e a recuperação de conhecimento interno.',
      'projects.p6.title': 'Automação de Workflows',
      'projects.p6.desc': 'Otimização de processos de negócio de ponta a ponta, conectando aplicações e automatizando tarefas repetitivas.',
      'contact.label': 'Contacto',
      'contact.title': 'Vamos Trabalhar Juntos',
      'contact.name': 'Nome',
      'contact.email': 'Email',
      'contact.message': 'Mensagem',
      'contact.send': 'Enviar Mensagem',
      'contact.qr': 'Digitaliza para te conectares no LinkedIn',
      'sidebar.title': 'Conquistas',
      'sidebar.congrats': 'Todas as conquistas desbloqueadas!',
      'sidebar.contact': 'Contactar',
      'footer.rights': 'Todos os direitos reservados.',
      'alert.first.title': 'Primeira conquista desbloqueada!',
      'alert.first.text': 'Continua a explorar para desbloqueares mais.',
      'alert.all.title': 'Parabéns!',
      'alert.all.text': 'Desbloqueaste todas as conquistas! O formulário de contacto está agora disponível.',
      'form.success': 'Mensagem enviada com sucesso!',
      'form.error': 'Algo correu mal. Por favor, tenta novamente.',
      'form.captcha': 'Por favor, completa o reCAPTCHA.',
    },
  };

  // ==========================================
  // UTILS
  // ==========================================
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================
  // PRELOADER
  // ==========================================
  function initPreloader() {
    const bar = $('#preloader-bar');
    const text = $('#preloader-text');
    const pct = $('#preloader-percent');
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
          $('#preloader').classList.add('hidden');
          setTimeout(() => { $('#preloader').style.display = 'none'; }, 700);
          animateHeroEntrance();
        }, 400);
      }
    }, 120);
  }

  function animateHeroEntrance() {
    if (prefersReducedMotion()) return;
    const tl = gsap.timeline();
    tl.from('#hero img', { scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out' })
      .from('#hero-name', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('#hero-subtitle', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from('#hero-company', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('#hero .flex a', { y: 20, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out' }, '-=0.3');

    // Text scramble on subtitle after entrance
    tl.call(() => {
      const subtitle = $('#hero-subtitle');
      if (subtitle) scrambleText(subtitle);
    }, null, '+=0.2');
  }

  // ==========================================
  // TEXT SCRAMBLE EFFECT
  // ==========================================
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
  function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);

    $('#theme-toggle').addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    state.theme = theme;
    // Update toggle icon
    const btn = $('#theme-toggle');
    if (theme === 'dark') {
      btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>';
    } else {
      btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>';
    }
  }

  // ==========================================
  // LANGUAGE
  // ==========================================
  function initLanguage() {
    const saved = localStorage.getItem('lang') || 'en';
    setLanguage(saved);

    $('#lang-toggle').addEventListener('click', () => {
      const next = state.lang === 'en' ? 'pt' : 'en';
      setLanguage(next);
    });
  }

  function setLanguage(lang) {
    state.lang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
    $('#lang-toggle').textContent = lang.toUpperCase();

    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) {
        if (el.tagName === 'TITLE') {
          document.title = i18n[lang][key];
        } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = i18n[lang][key];
        } else {
          // Preserve child elements (like trophy spans) for achievement list items
          if (el.children.length > 0 && el.querySelector('.trophy')) {
            const trophy = el.querySelector('.trophy');
            el.textContent = i18n[lang][key];
            el.prepend(trophy);
          } else {
            el.textContent = i18n[lang][key];
          }
        }
      }
    });

    // Re-render achievement list to apply translations
    renderAchievementList();
    updateProgress();
  }

  // ==========================================
  // LENIS & GSAP
  // ==========================================
  let lenisInstance = null;

  function initAnimations() {
    // Lenis smooth scroll
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate with GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    lenisInstance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenisInstance.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // ---- Hero Spotlight Mouse Tracking ----
    const hero = $('#hero');
    if (hero && !prefersReducedMotion()) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty('--mouse-x', x + '%');
        hero.style.setProperty('--mouse-y', y + '%');
      });
    }

    // Nav show/hide
    let lastScroll = 0;
    const nav = $('#top-nav');
    const sidebar = $('#achievements-sidebar');
    const mobileBtn = $('#mobile-achievements-toggle');

    function toggleSidebarOnScroll() {
      const heroBottom = $('#hero').getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        sidebar?.classList.remove('sidebar-hidden');
        sidebar?.classList.add('sidebar-visible');
        mobileBtn?.classList.remove('mobile-btn-hidden');
        mobileBtn?.classList.add('mobile-btn-visible');
      } else {
        sidebar?.classList.remove('sidebar-visible');
        sidebar?.classList.add('sidebar-hidden');
        mobileBtn?.classList.remove('mobile-btn-visible');
        mobileBtn?.classList.add('mobile-btn-hidden');
      }
    }

    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      if (current > 100) {
        nav.style.transform = current > lastScroll ? 'translateY(-100%)' : 'translateY(0)';
      } else {
        nav.style.transform = 'translateY(-100%)';
      }
      lastScroll = current;
      toggleSidebarOnScroll();
    }, { passive: true });

    if (prefersReducedMotion()) {
      // Simple fades only
      $$('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        el.style.opacity = '1';
      });
      return;
    }

    // Desktop animations
    if (!state.isMobile) {
      // Section reveals
      $$('.reveal-up').forEach(el => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });
      $$('.reveal-left').forEach(el => {
        gsap.from(el, {
          x: -80, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
        });
      });
      $$('.reveal-right').forEach(el => {
        gsap.from(el, {
          x: 80, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
        });
      });

      // Timeline line draw
      gsap.to('.timeline-line', {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '#timeline', start: 'top 60%', end: 'bottom 70%', scrub: 1 },
      });

      // Timeline items
      $$('.timeline-item').forEach((el, i) => {
        const fromX = i % 2 === 0 ? -40 : 40;
        gsap.from(el, {
          x: fromX, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });

      // Skill cards stagger
      gsap.from('.skill-card', {
        y: 50, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '#skills .grid', start: 'top 80%', toggleActions: 'play none none none' },
      });

      // Project cards stagger
      gsap.from('.project-card', {
        y: 60, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '#projects .grid', start: 'top 80%', toggleActions: 'play none none none' },
      });

      // 3D Tilt on skill cards (desktop only)
      $$('.skill-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const rx = (y - cy) / 10;
          const ry = (cx - x) / 10;
          card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    } else {
      // Mobile: simple fades
      $$('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        gsap.from(el, {
          y: 30, opacity: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        });
      });
      gsap.from('.skill-card, .project-card', {
        y: 30, opacity: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: '#skills', start: 'top 85%', toggleActions: 'play none none none' },
      });
    }
  }

  // ==========================================
  // GAMIFICATION
  // ==========================================
  function initGamification() {
    renderAchievementList();
    initProgressBars();

    // Attach unlock listeners
    $$('[data-achievement]').forEach(el => {
      const handler = () => {
        const id = el.getAttribute('data-achievement');
        unlockAchievement(id);
      };
      el.addEventListener('mouseenter', handler, { once: true });
      el.addEventListener('focus', handler, { once: true });
      // Mobile fallback: click/tap also unlocks if not yet unlocked
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-achievement');
        if (!state.unlocked.has(id)) unlockAchievement(id);
      });
    });

    // Unlock achievements with stagger when section becomes active
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = Array.from(entry.target.querySelectorAll('[data-achievement]'));
          cards.forEach((card, i) => {
            setTimeout(() => {
              unlockAchievement(card.getAttribute('data-achievement'));
            }, i * 600);
          });
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    $$('section[id]').forEach(sec => sectionObserver.observe(sec));

    // Sidebar contact button
    $('#btn-contact-sidebar')?.addEventListener('click', (e) => {
      e.preventDefault();
      revealContact();
    });
    $('#btn-contact-mobile')?.addEventListener('click', (e) => {
      e.preventDefault();
      revealContact();
      $('#mobile-achievements-drawer').classList.remove('open');
    });
  }

  function renderAchievementList() {
    const list = $('#achievement-list');
    const listMobile = $('#achievement-list-mobile');
    const t = i18n[state.lang];
    const items = achievementsData.map(a => {
      const titleKey = 'achievements.' + a.id;
      // Fallback: derive readable name if no dedicated key
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

  function initProgressBars() {
    const opts = {
      strokeWidth: 3,
      easing: 'easeInOut',
      duration: 800,
      color: '#2491b6',
      trailColor: 'rgba(128,128,128,0.2)',
      trailWidth: 3,
      svgStyle: { width: '100%', height: '6px', borderRadius: '3px' },
    };
    const container = $('#achievement-progress');
    const containerMobile = $('#achievement-progress-mobile');
    if (container && typeof ProgressBar !== 'undefined') {
      state.progressBar = new ProgressBar.Line(container, opts);
      state.progressBar.animate(0);
    }
    if (containerMobile && typeof ProgressBar !== 'undefined') {
      state.progressBarMobile = new ProgressBar.Line(containerMobile, opts);
      state.progressBarMobile.animate(0);
    }
  }

  function unlockAchievement(id) {
    if (state.unlocked.has(id)) return;
    state.unlocked.add(id);

    // Visual update on main elements
    const mainEls = $$(`[data-achievement="${id}"]`);
    mainEls.forEach(el => {
      el.classList.add('unlocked');
      // Add trophy emoji next to title if card
      const title = el.querySelector('h3');
      if (title && !title.querySelector('.trophy-main')) {
        const trophy = document.createElement('span');
        trophy.className = 'trophy-main ml-2 text-primary-400';
        trophy.textContent = '🏆';
        title.appendChild(trophy);
      }
    });

    // Visual update on sidebar lists
    $$(`#achievement-list li[data-aid="${id}"], #achievement-list-mobile li[data-aid="${id}"]`).forEach(li => {
      li.classList.add('unlocked');
    });

    updateProgress();

    // First unlock celebration
    if (!state.firstUnlockShown) {
      state.firstUnlockShown = true;
      fireConfetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      Swal.fire({
        title: i18n[state.lang]['alert.first.title'],
        text: i18n[state.lang]['alert.first.text'],
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: state.theme === 'dark' ? '#0f172a' : '#ffffff',
        color: state.theme === 'dark' ? '#f8fafc' : '#0f172a',
      });
    }

    checkAllAchievements();
  }

  function updateProgress() {
    const pct = state.unlocked.size / TOTAL_ACHIEVEMENTS;
    try {
      if (state.progressBar) state.progressBar.animate(pct);
    } catch (e) {}
    try {
      if (state.progressBarMobile) state.progressBarMobile.animate(pct);
    } catch (e) {}

    const pctText = Math.round(pct * 100) + '%';
    const textEl = $('#achievement-text');
    const textMobile = $('#achievement-text-mobile');
    const t = i18n[state.lang];
    const label = `${pctText} (${state.unlocked.size} / ${TOTAL_ACHIEVEMENTS})`;
    if (textEl) textEl.textContent = label;
    if (textMobile) textMobile.textContent = label;
  }

  function checkAllAchievements() {
    if (state.unlocked.size >= TOTAL_ACHIEVEMENTS && !state.allUnlockedShown) {
      state.allUnlockedShown = true;

      setTimeout(() => {
        fireConfetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
        Swal.fire({
          title: i18n[state.lang]['alert.all.title'],
          text: i18n[state.lang]['alert.all.text'],
          icon: 'success',
          confirmButtonText: 'OK',
          background: state.theme === 'dark' ? '#0f172a' : '#ffffff',
          color: state.theme === 'dark' ? '#f8fafc' : '#0f172a',
          confirmButtonColor: '#2491b6',
        }).then(() => {
          // Scroll page to contact section using Lenis
          if (lenisInstance) {
            lenisInstance.scrollTo('#contact', { offset: -80, duration: 1.5 });
          } else {
            // Fallback if Lenis not initialized
            const contactSection = $('#contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }

          // Scroll sidebar to Contact Me button
          const btnDesktop = $('#btn-contact-sidebar');
          if (btnDesktop) {
            btnDesktop.classList.add('animate-pulse-glow');
            const sidebar = $('#achievements-sidebar');
            if (sidebar) {
              sidebar.scrollTop = btnDesktop.offsetTop - sidebar.offsetTop;
            }
          }

          const btnMobile = $('#btn-contact-mobile');
          if (btnMobile) {
            btnMobile.classList.add('animate-pulse-glow');
            const drawer = $('#mobile-achievements-drawer');
            if (drawer) {
              drawer.classList.add('open');
              drawer.scrollTop = btnMobile.offsetTop - drawer.offsetTop;
            }
          }
        });
      }, 600);

      // Reveal contact elements
      revealContact();
    }
  }

  function revealContact() {
    $('#contact').classList.remove('hidden');
    $('#nav-contact')?.classList.remove('hidden');
    $('#mobile-nav-contact')?.classList.remove('hidden');
    $('#btn-contact-sidebar')?.classList.remove('hidden');
    $('#btn-contact-mobile')?.classList.remove('hidden');
    $('#congrats-msg')?.classList.remove('hidden');
    $('#congrats-msg-mobile')?.classList.remove('hidden');

    // Highlight nav contact link
    $('#nav-contact')?.classList.add('nav-highlight');
    $('#mobile-nav-contact')?.classList.add('nav-highlight');
  }

  function fireConfetti(opts) {
    if (typeof confetti !== 'undefined') {
      confetti({ ...opts, colors: ['#2491b6', '#2bb3e0', '#0ea5e9', '#ffffff'] });
    }
  }

  // ==========================================
  // MOBILE UI
  // ==========================================
  function initMobileUI() {
    const menuBtn = $('#mobile-menu-btn');
    const menuClose = $('#mobile-menu-close');
    const menu = $('#mobile-menu');
    const drawerToggle = $('#mobile-achievements-toggle');
    const drawer = $('#mobile-achievements-drawer');

    menuBtn?.addEventListener('click', () => {
      menu.classList.remove('hidden');
      menu.classList.add('flex');
    });
    menuClose?.addEventListener('click', () => {
      menu.classList.add('hidden');
      menu.classList.remove('flex');
    });
    $$('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
      });
    });

    drawerToggle?.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });

    // Close drawer on outside click
    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !drawerToggle.contains(e.target)) {
        drawer.classList.remove('open');
      }
    });

    window.addEventListener('resize', () => {
      state.isMobile = window.innerWidth < 1024;
    });
  }

  // ==========================================
  // CONTACT FORM (Formspree)
  // ==========================================
  function initContactForm() {
    // --- Environment detection ---
    const proto = window.location.protocol;
    const host = window.location.hostname;
    const isFile = proto === 'file:';
    const isLocalhost = host === 'localhost' || host === '127.0.0.1';
    const isLocal = isFile || isLocalhost;
    if (isLocal) {
      // Local mode: reCAPTCHA validation skipped for testing
    }

    // --- Rate limiting (max 3 per session) ---
    const RL_KEY = '_cv_form_rl';
    function getAttempts() {
      try { return parseInt(sessionStorage.getItem(RL_KEY)) || 0; } catch (e) { return 0; }
    }
    function incAttempts() {
      try { sessionStorage.setItem(RL_KEY, String(getAttempts() + 1)); } catch (e) {}
    }

    // --- Disposable email domains ---
    const TEMP_DOMAINS = new Set([
      '10minutemail.com','tempmail.com','guerrillamail.com','mailinator.com',
      'yopmail.com','throwawaymail.com','getairmail.com','burner.email',
      'temp-mail.org','mohmal.com','fakemail.net','mailnesia.com',
      'sharklasers.com','spamgourmet.com','jetable.org','mytrashmail.com',
      'mailcatch.com','getnada.com','inboxkitten.com','tempail.com',
      'disposable.com','trashmail.com','fakeinbox.com','mailforspam.com',
      'emailtemporario.com.br','temporario.email','emailfake.com'
    ]);

    // --- Timestamp (in-memory) ---
    const formLoadTs = Date.now();

    const form = $('#contactForm');
    if (!form) return;

    // --- Bot fingerprinting ---
    function isBot() {
      const w = window;
      if (navigator.webdriver) return true;
      if (w.outerWidth === 0 && w.outerHeight === 0) return true;
      if (w.outerWidth < 200 || w.outerHeight < 200) return true;
      if (!navigator.plugins || navigator.plugins.length === 0) return true;
      if (navigator.languages === undefined) return true;
      return false;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = $('#submitBtn');
      const btnOriginalText = btn.textContent;
      btn.disabled = true;

      // 1. Bot fingerprinting
      if (isBot()) {
        // Security: bot detected
        btn.disabled = false;
        return;
      }

      // 2. Honeypot check
      const honeypot = $('#formHoneypot');
      if (honeypot && honeypot.value.trim() !== '') {
        // Security: honeypot triggered
        btn.disabled = false;
        return;
      }

      // 3. Timestamp validation (2s min, 10min max)
      const elapsed = Date.now() - formLoadTs;
      if (elapsed < 2000 || elapsed > 600000) {
        Swal.fire({
          icon: 'warning',
          title: state.lang === 'pt' ? 'Tempo inválido' : 'Invalid timing',
          text: state.lang === 'pt'
            ? 'O formulário foi submetido muito rapidamente ou expirou. Tenta novamente.'
            : 'The form was submitted too quickly or has expired. Please try again.',
          confirmButtonColor: '#2491b6',
          background: state.theme === 'dark' ? '#0f172a' : '#ffffff',
          color: state.theme === 'dark' ? '#f8fafc' : '#0f172a',
        });
        btn.disabled = false;
        return;
      }

      // 4. Disposable email check
      const email = $('#formEmail')?.value.trim().toLowerCase() || '';
      const emailDomain = email.split('@')[1];
      if (emailDomain && TEMP_DOMAINS.has(emailDomain)) {
        Swal.fire({
          icon: 'warning',
          title: state.lang === 'pt' ? 'Email não permitido' : 'Email not allowed',
          text: state.lang === 'pt'
            ? 'Endereços de email temporários não são permitidos.'
            : 'Temporary email addresses are not allowed.',
          confirmButtonColor: '#2491b6',
          background: state.theme === 'dark' ? '#0f172a' : '#ffffff',
          color: state.theme === 'dark' ? '#f8fafc' : '#0f172a',
        });
        btn.disabled = false;
        return;
      }

      // 5. Rate limit check (disabled on localhost for testing)
      if (!isLocalhost && getAttempts() >= 3) {
        Swal.fire({
          icon: 'error',
          title: state.lang === 'pt' ? 'Limite atingido' : 'Limit reached',
          text: state.lang === 'pt'
            ? 'Atingiste o limite de 3 envios por sessão. Recarrega a página para tentar novamente.'
            : 'You have reached the limit of 3 submissions per session. Please refresh the page to try again.',
          confirmButtonColor: '#2491b6',
          background: state.theme === 'dark' ? '#0f172a' : '#ffffff',
          color: state.theme === 'dark' ? '#f8fafc' : '#0f172a',
        });
        btn.disabled = false;
        return;
      }

      // 6. reCAPTCHA (skipped in local mode for testing)
      if (!isLocal) {
        const recaptcha = grecaptcha.getResponse();
        if (!recaptcha) {
          Swal.fire({
            icon: 'warning',
            title: i18n[state.lang]['form.captcha'],
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            background: state.theme === 'dark' ? '#0f172a' : '#ffffff',
            color: state.theme === 'dark' ? '#f8fafc' : '#0f172a',
          });
          btn.disabled = false;
          return;
        }
      }

      // 7. Artificial delay (2 seconds) — bots don't wait
      let delay = 2;
      btn.textContent = (state.lang === 'pt' ? 'A enviar em ' : 'Sending in ') + delay + 's...';
      const delayInterval = setInterval(() => {
        delay--;
        if (delay > 0) {
          btn.textContent = (state.lang === 'pt' ? 'A enviar em ' : 'Sending in ') + delay + 's...';
        } else {
          clearInterval(delayInterval);
          btn.textContent = state.lang === 'pt' ? 'A enviar...' : 'Sending...';
          submitForm();
        }
      }, 1000);

      function submitForm() {
        incAttempts();

        // Build FormData for Formspree
        const formData = new FormData(form);

        fetch('https://formspree.io/f/xnjwpjvl', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' },
        })
          .then(async r => {
            const data = await r.json();
            // Formspree response received
            return data;
          })
          .then(data => {
            if (data.ok) {
              Swal.fire({
                icon: 'success',
                title: i18n[state.lang]['form.success'],
                confirmButtonColor: '#2491b6',
                background: state.theme === 'dark' ? '#0f172a' : '#ffffff',
                color: state.theme === 'dark' ? '#f8fafc' : '#0f172a',
              });
              form.reset();
              grecaptcha.reset();
            } else {
              Swal.fire({
                icon: 'error',
                title: i18n[state.lang]['form.error'],
                text: data.error || '',
                confirmButtonColor: '#2491b6',
                background: state.theme === 'dark' ? '#0f172a' : '#ffffff',
                color: state.theme === 'dark' ? '#f8fafc' : '#0f172a',
              });
            }
          })
          .catch(err => {
            // Formspree error occurred
            let msg = '';
            if (isFile) {
              msg = state.lang === 'pt'
                ? 'Não é possível enviar de file:// diretamente. Usa um servidor local (ex: Live Server no VS Code) ou abre via http://localhost.'
                : 'Cannot send from file:// directly. Please use a local server (e.g., Live Server in VS Code) or open via http://localhost.';
            } else if (err && err.message) {
              msg = err.message;
            } else {
              msg = state.lang === 'pt'
                ? 'Erro de rede. Verifica a ligação à internet.'
                : 'Network error. Please check your internet connection.';
            }
            Swal.fire({
              icon: 'error',
              title: i18n[state.lang]['form.error'],
              text: msg,
              confirmButtonColor: '#2491b6',
              background: state.theme === 'dark' ? '#0f172a' : '#ffffff',
              color: state.theme === 'dark' ? '#f8fafc' : '#0f172a',
            });
          })
          .finally(() => {
            btn.disabled = false;
            btn.textContent = btnOriginalText;
          });
      }
    });
  }

  // ==========================================
  // WORKFLOW NODE GRAPH (n8n-style) — FIXED
  // ==========================================
  function initWorkflowPipeline() {
    const svg = $('#workflow-graph');
    const container = $('#workflow-graph-container');
    if (!svg || !container) return;

    // CRITICAL: Always start hidden, NEVER show on draw
    container.classList.remove('visible');

    let hideTimer = null;
    let hasInteracted = false; // Flag to skip first observer trigger

    function showGraph() {
      if (hideTimer) clearTimeout(hideTimer);
      container.classList.add('visible');
    }

    function hideGraph(delay) {
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        container.classList.remove('visible');
      }, delay || 2500);
    }

    function getSections() {
      const base = [
        { id: '#about',    label: 'About' },
        { id: '#timeline', label: 'Timeline' },
        { id: '#skills',   label: 'Skills' },
        { id: '#projects', label: 'Projects' },
      ];
      const contactNav = $('#nav-contact');
      if (contactNav && !contactNav.classList.contains('hidden')) {
        base.push({ id: '#contact', label: 'Contact' });
      }
      return base;
    }

    const pillW = 140;
    const pillH = 32;
    const pillX = 20;
    const nodeRadius = 3;

    let nodeGroups = [];
    let connectors = [];

    function getSectionY(el) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return 150;
      const rect = el.getBoundingClientRect();
      const absY = rect.top + window.scrollY + rect.height * 0.25;
      const pct = absY / (docH + window.innerHeight);
      const sidebarH = window.innerHeight;
      return 100 + (pct * (sidebarH - 200));
    }

    function drawGraph() {
      svg.innerHTML = '';
      nodeGroups = [];
      connectors = [];

      const sidebarH = window.innerHeight;
      svg.setAttribute('viewBox', '0 0 180 ' + sidebarH);
      svg.setAttribute('width', '180');
      svg.setAttribute('height', sidebarH);

      // Calculate positions
      const positions = [];
      getSections().forEach(function(sec) {
        const el = $(sec.id);
        if (!el) return;
        positions.push({ id: sec.id, label: sec.label, y: getSectionY(el) });
      });

      // Enforce minimum gap
      const minGap = 70;
      for (let i = 1; i < positions.length; i++) {
        if (positions[i].y - positions[i - 1].y < minGap) {
          positions[i].y = positions[i - 1].y + minGap;
        }
      }

      // Draw connectors first (behind nodes)
      for (let i = 0; i < positions.length - 1; i++) {
        const y1 = positions[i].y + pillH / 2;
        const y2 = positions[i + 1].y - pillH / 2;
        const midY = (y1 + y2) / 2;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M ' + (pillX + pillW / 2) + ' ' + y1 + ' C ' + (pillX + pillW / 2 + 40) + ' ' + midY + ', ' + (pillX + pillW / 2 - 40) + ' ' + midY + ', ' + (pillX + pillW / 2) + ' ' + y2);
        path.setAttribute('class', 'wg-connector');
        svg.appendChild(path);
        connectors.push({ el: path, from: positions[i], to: positions[i + 1] });
      }

      // Draw node pills
      positions.forEach(function(pos) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'wg-node-group');
        g.setAttribute('data-target', pos.id);

        // Pill rect
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', pillX);
        rect.setAttribute('y', pos.y - pillH / 2);
        rect.setAttribute('width', pillW);
        rect.setAttribute('height', pillH);
        rect.setAttribute('rx', 12);
        rect.setAttribute('class', 'wg-node-rect');
        g.appendChild(rect);

        // Status dot
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', pillX + 16);
        dot.setAttribute('cy', pos.y);
        dot.setAttribute('r', nodeRadius);
        dot.setAttribute('class', 'wg-status');
        g.appendChild(dot);

        // Label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', pillX + pillW / 2 + 4);
        text.setAttribute('y', pos.y + 1);
        text.setAttribute('class', 'wg-label');
        text.textContent = pos.label;
        g.appendChild(text);

        svg.appendChild(g);
        nodeGroups.push({ el: g, y: pos.y, id: pos.id });
      });
      // DO NOT add 'visible' class here
    }

    // Initial draw after layout settles
    setTimeout(drawGraph, 800);

    // Redraw on resize
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawGraph, 300);
    });

    // Watch for Contact nav becoming visible (achievements unlocked)
    const contactNav = $('#nav-contact');
    if (contactNav) {
      const navObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (!contactNav.classList.contains('hidden')) {
              drawGraph();
              navObserver.disconnect();
            }
          }
        });
      });
      navObserver.observe(contactNav, { attributes: true });
    }

    // IntersectionObserver: highlight active node + show graph on transition
    let lastActiveSection = null;
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const node = nodeGroups.find(function(n) { return n.id === '#' + entry.target.id; });
          if (node) {
            nodeGroups.forEach(function(n) { n.el.classList.remove('active'); });
            node.el.classList.add('active');

            // Only show graph after first user interaction (scroll or click)
            if (hasInteracted && lastActiveSection && lastActiveSection !== entry.target.id) {
              showGraph();
              hideGraph();
            }
            lastActiveSection = entry.target.id;
          }
        }
      });
    }, { threshold: 0.35 });

    getSections().forEach(function(sec) {
      const el = $(sec.id);
      if (el) observer.observe(el);
    });

    // Mark as interacted on first scroll
    window.addEventListener('scroll', function onFirstScroll() {
      hasInteracted = true;
      window.removeEventListener('scroll', onFirstScroll);
    }, { passive: true, once: true });

    // Nav click: animate flow along connector
    const navLinks = $$('#top-nav a[href^="#"]');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#hero') return;

        const targetNode = nodeGroups.find(function(n) { return n.id === targetId; });
        if (!targetNode) return;

        e.preventDefault();
        hasInteracted = true;
        showGraph();

        // Find current active node as start
        const activeNode = nodeGroups.find(function(n) { return n.el.classList.contains('active'); });
        const startNode = activeNode || nodeGroups[0];

        // Find connector between start and target
        const conn = connectors.find(function(c) {
          return (c.from.id === startNode.id && c.to.id === targetNode.id) ||
                 (c.from.id === targetNode.id && c.to.id === startNode.id);
        });

        if (conn) {
          // Clone path for active animation
          const activePath = conn.el.cloneNode(true);
          activePath.setAttribute('class', 'wg-connector-active');
          svg.appendChild(activePath);

          const len = activePath.getTotalLength();
          activePath.style.strokeDasharray = len;
          activePath.style.strokeDashoffset = len;

          // Animate line drawing
          gsap.to(activePath, {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: 'power2.out',
          });

          // Animate dot along path
          const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dot.setAttribute('r', 5);
          dot.setAttribute('class', 'wg-flow-dot animating');
          svg.appendChild(dot);

          const dotDuration = 600;
          const dotStart = performance.now();

          function animateDot(time) {
            const elapsed = time - dotStart;
            const progress = Math.min(elapsed / dotDuration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            const point = activePath.getPointAtLength(len * eased);
            dot.setAttribute('cx', point.x);
            dot.setAttribute('cy', point.y);

            if (progress < 1) {
              requestAnimationFrame(animateDot);
            } else {
              // Cleanup
              dot.remove();
              activePath.remove();

              // Pulse target node
              targetNode.el.classList.add('active');
              nodeGroups.forEach(function(n) {
                if (n !== targetNode) n.el.classList.remove('active');
              });

              // Glow section
              const section = $(targetId);
              if (section) {
                section.classList.add('section-glow');
                setTimeout(function() { section.classList.remove('section-glow'); }, 1200);
              }

              // Hide graph after transition
              hideGraph();
            }
          }
          requestAnimationFrame(animateDot);
        }

        // Scroll
        if (lenisInstance) {
          lenisInstance.scrollTo(targetId, { offset: -80, duration: 1.2 });
        } else {
          var targetEl = $(targetId);
          if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ==========================================
  // INIT
  // ==========================================
  function init() {
    // Always start at the top (hero section) on page load/reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Hero scroll lock - unlocks scroll when clicking "Scroll" indicator
    document.querySelector('#hero-scroll-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.overflowY = 'auto';
      document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
    });

    initTheme();
    initLanguage();
    initPreloader();
    initAnimations();
    initWorkflowPipeline();
    initGamification();
    initMobileUI();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
