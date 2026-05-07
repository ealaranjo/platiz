/* ============================================
   Shared I18N
   ============================================ */

window.ELState = window.ELState || {
  lang: 'en',
  theme: 'dark',
  unlocked: new Set(),
  firstUnlockShown: false,
  allUnlockedShown: false,
  progressBar: null,
  progressBarMobile: null,
  isMobile: window.innerWidth < 1024,
};

window.ELi18n = {
  en: {
    'meta.title': 'Emanuel Laranjo | CRM & Automation Specialist',
    'nav.logo': 'EL',
    'nav.hero': 'Start',
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
    'contact.locked.title': 'Contact Locked',
    'contact.locked.desc': 'Unlock all 22 achievements to access the contact form.',
    'firstVisit.guide': 'Explore the sections to collect achievements and unlock the Contact form.',
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
    'nav.hero': 'Início',
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
    'contact.locked.title': 'Contacto Bloqueado',
    'contact.locked.desc': 'Desbloqueia as 22 conquistas para aceder ao formulário de contacto.',
    'firstVisit.guide': 'Explora as secções para colecionares conquistas e desbloqueares o formulário de Contacto.',
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

function ELsetLanguage(lang) {
  ELState.lang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);
  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.textContent = lang.toUpperCase();
  const toggleMobile = document.getElementById('lang-toggle-mobile');
  if (toggleMobile) toggleMobile.textContent = lang.toUpperCase();

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (ELi18n[lang] && ELi18n[lang][key]) {
      if (el.tagName === 'TITLE') {
        document.title = ELi18n[lang][key];
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = ELi18n[lang][key];
      } else {
        if (el.children.length > 0 && el.querySelector('.trophy')) {
          const trophy = el.querySelector('.trophy');
          el.textContent = ELi18n[lang][key];
          el.prepend(trophy);
        } else {
          el.textContent = ELi18n[lang][key];
        }
      }
    }
  });

  if (typeof ELrenderAchievementList === 'function') ELrenderAchievementList();
  if (typeof ELupdateProgress === 'function') ELupdateProgress();
}

function ELinitLanguage() {
  const saved = localStorage.getItem('lang') || 'en';
  ELsetLanguage(saved);
  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = ELState.lang === 'en' ? 'pt' : 'en';
      ELsetLanguage(next);
    });
  }
  const toggleMobile = document.getElementById('lang-toggle-mobile');
  if (toggleMobile) {
    toggleMobile.addEventListener('click', () => {
      const next = ELState.lang === 'en' ? 'pt' : 'en';
      ELsetLanguage(next);
    });
  }
}
