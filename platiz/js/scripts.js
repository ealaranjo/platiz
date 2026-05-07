// ============================================================
// Emanuel Laranjo - CV Website
// Main JavaScript - Achievement system, navigation, contact form
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

  const startBtn             = document.getElementById("startButton");
  const loadingGame          = document.getElementById("loadingGame");
  const welcomeScreen        = document.getElementById("welcomeScreen");
  const navMain              = document.querySelector(".nav-main");
  const allSections          = Array.from(document.querySelectorAll(".section-main"));
  const contactSection       = document.getElementById("contact");
  const btnContact           = document.getElementById("btnContact");
  const congratsMsg          = document.getElementById("congratsMessage");
  const progressBarContainer  = document.getElementById("achievementProgressBarContainer");
  const progressText          = document.getElementById("achievementProgressText");
  const navLinks              = document.querySelectorAll(".nav-link");
  const allAchievementItems   = document.querySelectorAll("#achievements ul li");
  const skillCards            = document.querySelectorAll(".skill-card");
  const softSkillItems        = document.querySelectorAll(".soft-skill");
  const projectCards          = document.querySelectorAll(".project-card");

  const contactForm           = document.getElementById("contactForm");
  const disposableDomains = ['tempmail.com','10minutemail.com','guerrillamail.com','mailinator.com','yopmail.com','throwawaymail.com','fakeemail.com','burnermail.io','temp-mail.org','sharklasers.com'];
  const formLoadTs = Date.now();
  const sidebar               = document.getElementById("achievements");
  const sidebarHeading        = sidebar.querySelector("h3");

  // ---- Welcome screen click handler (registered early, before any potentially-failing code) ----
  startBtn.addEventListener("click", (clickEvent) => {
    loadingGame.classList.add("active");
    clickEvent.target.style.display = "none";

    setTimeout(() => {
      // Minimize welcome screen to a top bar after showing loading animation
      welcomeScreen.style.transition = "all 1s ease";
      welcomeScreen.style.height = "80px";
      welcomeScreen.style.borderRadius = "0 0 15px 15px";
      welcomeScreen.style.position = "fixed";
      welcomeScreen.style.top = "0";
      welcomeScreen.style.left = "0";
      welcomeScreen.style.display = "flex";
      welcomeScreen.style.flexDirection = "row";
      welcomeScreen.style.alignItems = "center";
      welcomeScreen.style.justifyContent = "space-between";
      welcomeScreen.style.padding = "0 1.5rem";
      welcomeScreen.style.zIndex = "1100";

      // Shrink the profile image
      const welcomeImg = welcomeScreen.querySelector("img");
      welcomeImg.style.width = "40px";
      welcomeImg.style.height = "40px";

      // Shrink the h1 title
      const welcomeH1 = welcomeScreen.querySelector("h1");
      welcomeH1.style.fontSize = "1.2rem";

      // Hide the subtitle paragraph
      const welcomeP = welcomeScreen.querySelector("p");
      welcomeP.style.display = "none";

      // Hide loading game
      loadingGame.style.display = "none";
      loadingGame.classList.remove("active");

      // Show the first main section
      allSections[currentSectionIndex].style.opacity = 1;
      allSections[currentSectionIndex].style.transform = "translateY(0)";
      allSections[currentSectionIndex].style.pointerEvents = "auto";

      // Add CSS classes for mini state
      welcomeScreen.classList.add("welcome-minimized");
      navMain.classList.add("down-80");

      window.scrollTo({ top: 0, behavior: "instant" });
    }, 2000);
  });

  // ---- JS pinning for sidebar heading (sticky replacement) ----
  sidebar.addEventListener("scroll", () => {
    sidebarHeading.style.transform = "translateY(" + sidebar.scrollTop + "px)";
  });

  // ---- State ----
  let currentSectionIndex = 0;
  let firstAchievementShown = false;
  let currentLang = document.documentElement.lang;

  // ---- Language-dependent strings ----
  const langTexts = {
    en: {
      firstAchievementTitle:  "First achievement unlocked!",
      congratulationsTitle:   "Congratulations!",
      closeButton:             "Close",
      allAchievementsText:     (count) => "All " + count + " achievements unlocked!"
    },
    pt: {
      firstAchievementTitle:  "Primeira conquista desbloqueada!",
      congratulationsTitle:   "Parabéns!",
      closeButton:             "Fechar",
      allAchievementsText:     (count) => "Todas as " + count + " conquistas desbloqueadas!"
    }
  };

  const contactAlerts = {
    en: {
      recaptchaNotVerifiedTitle: "reCAPTCHA not verified",
      recaptchaNotVerifiedText:  "Please check the box to confirm you're not a robot.",
      messageSentTitle:          "Message sent!",
      messageSentText:           "Thank you for contacting me. I will get back to you soon.",
      errorSendTitle:            "Error sending",
      errorSendText:             "An error occurred. Please try again.",
      closeButton:               "Close"
    },
    pt: {
      recaptchaNotVerifiedTitle: "reCAPTCHA não verificado",
      recaptchaNotVerifiedText:  "Por favor, marque o checkbox para confirmar que não é um robô.",
      messageSentTitle:          "Mensagem enviada!",
      messageSentText:           "Obrigado pelo contato. Responder-lhe-ei em breve.",
      errorSendTitle:            "Erro ao enviar",
      errorSendText:             "Ocorreu um erro. Por favor tente novamente.",
      closeButton:               "Fechar"
    }
  };

  // ---- Initial setup ----
  // Hide contact-related elements until all achievements are unlocked
  contactSection.style.display = "none";
  btnContact.style.display = "none";
  congratsMsg.style.display = "none";

  // Prevent body scroll until user clicks "Yes"
  document.body.style.overflow = "hidden";
  document.body.style.minHeight = "100vh";
  document.body.style.overflowY = "hidden";

  // ---- IntersectionObserver: animate sections on scroll ----
  const sectionElements = document.querySelectorAll(".section-main");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate__animated", "animate__fadeInUp");
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  sectionElements.forEach((el) => sectionObserver.observe(el));


  // ---- Footer auto-scroll (keeps footer visible) ----
  window.addEventListener("scroll", () => {
    const footer = document.querySelector(".footer-main");
    if (!footer) return;
    const footerTop = footer.getBoundingClientRect().top + window.scrollY;
    const footerHeight = footer.offsetHeight;
    const scrollLimit = footerTop + footerHeight - window.innerHeight;
    if (window.scrollY > scrollLimit) {
      window.scrollTo(0, scrollLimit);
    }
  });

  // ---- Section switching via arrow clicks ----
  function switchSection(newIdx) {
    // Bounds check
    if (newIdx < 0 || newIdx >= allSections.length) return;

    // Hide current section
    allSections[currentSectionIndex].style.opacity = 0;
    allSections[currentSectionIndex].style.transform = "translateY(30px)";
    allSections[currentSectionIndex].style.pointerEvents = "none";

    // Show new section
    allSections[newIdx].style.opacity = 1;
    allSections[newIdx].style.transform = "translateY(0)";
    allSections[newIdx].style.pointerEvents = "auto";

    currentSectionIndex = newIdx;
  }

  // ---- Progress Bar (achievement tracking) ----
  let progressBar;
  if (typeof ProgressBar !== 'undefined') {
  progressBar = new ProgressBar.Line(progressBarContainer, {
    strokeWidth: 10,
    easing: "easeInOut",
    duration: 600,
    trailColor: "#e6e8eb",
    trailWidth: 10,
    svgStyle: {
      width: "100%",
      height: "20px",
      borderRadius: "20px"
    },
    step: (state, bar) => {
      const progress = bar.value();
      // Color transition from green to red based on progress
      const startRGB = [231, 76, 60];   // red-ish
      const endRGB   = [40, 167, 69];    // green-ish
      function lerp(start, end, t) {
        return Math.round(start + (end - start) * t);
      }
      const r = lerp(startRGB[0], endRGB[0], progress);
      const g = lerp(startRGB[1], endRGB[1], progress);
      const b = lerp(startRGB[2], endRGB[2], progress);
      bar.path.setAttribute("stroke", "rgb(" + r + "," + g + "," + b + ")");
    }
  });
  } else {
    progressBar = { animate: function() {} };
  }

  // ---- Update navigation active link based on scroll position ----
  function updateNavActive() {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    let activeId = null;
    const isContactVisible = window.getComputedStyle(contactSection).display !== "none";

    for (let section of allSections) {
      if (scrollPos >= section.offsetTop) {
        if (section.id === "contact" && !isContactVisible) continue;
        activeId = section.id;
      }
    }

    if (!activeId) activeId = allSections[0].id;

    // Handle contact link visibility
    const contactNavLink = navMain.querySelector('a[href="#contact"]');
    if (isContactVisible) {
      contactNavLink.hidden = false;
    } else {
      contactNavLink.hidden = true;
      if (activeId === "contact") {
        activeId = allSections[allSections.length - 2].id;
      }
    }

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + activeId);
    });
  }

  // ---- Scroll tip click handler ----
  document.querySelector(".scroll-tip").addEventListener("click", () => {
    window.scrollBy({
      top: window.innerHeight / 1.25,
      behavior: "smooth"
    });
    // Restore normal scrolling
    document.body.style.overflow = "auto";
    document.body.style.overflowY = "auto";
    document.body.style.minHeight = "100vh";
  });

  window.addEventListener("scroll", updateNavActive);

  // ---- Achievement system ----
  function unlockAchievement(achievementId) {
    if (!achievementId) return;

    const sidebarItem = document.getElementById(achievementId);
    if (!sidebarItem || sidebarItem.classList.contains("unlocked")) return;

    // Mark as unlocked in sidebar
    sidebarItem.classList.add("unlocked");

    // Mark the corresponding element in the main content
    const mainElement = document.querySelector('[data-achievement="' + achievementId + '"]');
    if (mainElement) mainElement.classList.add("unlocked");

    // Add trophy icon
    const titleEl = mainElement ? mainElement.querySelector("h3, h2, h1") : null;
    if (titleEl) {
      if (!titleEl.querySelector(".achievement-icon-text")) {
        const trophy = document.createElement("span");
        trophy.textContent = "\u{1F3C6}";
        trophy.className = "achievement-icon-text";
        trophy.style.marginLeft = "8px";
        trophy.style.fontSize = "1.2rem";
        trophy.setAttribute("aria-label", "Conquista desbloqueada");
        titleEl.appendChild(trophy);
      }
    } else if (mainElement) {
      if (!mainElement.querySelector(".achievement-icon-text")) {
        const trophy = document.createElement("span");
        trophy.textContent = "\u{1F3C6}";
        trophy.className = "achievement-icon-text";
        trophy.style.marginLeft = "8px";
        trophy.style.fontSize = "1.2rem";
        trophy.setAttribute("aria-label", "Conquista desbloqueada");
        mainElement.appendChild(trophy);
      }
    }

    // Show notification
    const unlockedCount = document.querySelectorAll("#achievements ul li.unlocked").length;
    const totalCount = allAchievementItems.length;

    if (!firstAchievementShown) {
      // First achievement: show individual notification
      Swal.fire({
        title: langTexts[currentLang].firstAchievementTitle,
        text: "" + sidebarItem.textContent.trim(),
        icon: "success",
        confirmButtonText: langTexts[currentLang].closeButton,
        confirmButtonColor: "#1a6881",
        background: "rgba(255,255,255,0.9)",
        backdrop: "rgba(0,0,0,0.2)"
      });
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } });
      firstAchievementShown = true;
    } else if (unlockedCount === totalCount) {
      // All achievements: congratulations!
      Swal.fire({
        title: langTexts[currentLang].congratulationsTitle,
        text: langTexts[currentLang].allAchievementsText(totalCount),
        icon: "success",
        confirmButtonText: langTexts[currentLang].closeButton,
        confirmButtonColor: "#1a6881",
        background: "rgba(255,255,255,0.9)",
        backdrop: "rgba(0,0,0,0.2)"
      }).then(() => {
        // After user closes the modal, scroll to the Contact Me button
        setTimeout(() => {
          btnContact.scrollIntoView({ behavior: "smooth", block: "center" });
          btnContact.classList.add("btn-highlight");
          const sidebar = document.getElementById("achievements");
          sidebar.classList.add("sidebar-highlight");
          setTimeout(() => {
            btnContact.classList.remove("btn-highlight");
            sidebar.classList.remove("sidebar-highlight");
          }, 3000);
        }, 300);
      });
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } });
    }

    updateProgressBar();
    checkAllAchievements();
  }

  // ---- Update progress bar with percentage ----
  function updateProgressBar() {
    const unlockedCount = document.querySelectorAll("#achievements ul li.unlocked").length;
    const totalCount = allAchievementItems.length;
    const ratio = unlockedCount / totalCount;
    const percent = Math.round(ratio * 100);

    if (progressBar) progressBar.animate(ratio);

    if (currentLang === "pt") {
      progressText.textContent = percent + "% (" + unlockedCount + " de " + totalCount + " conquistas)";
    } else {
      progressText.textContent = percent + "% (" + unlockedCount + " out of " + totalCount + " achievements)";
    }
  }

  // ---- Check if all achievements are unlocked ----
  function checkAllAchievements() {
    const totalCount = allAchievementItems.length;
    const unlockedCount = document.querySelectorAll("#achievements ul li.unlocked").length;
    const allDone = unlockedCount === totalCount;

    congratsMsg.style.display = allDone ? "block" : "none";
    btnContact.style.display = allDone ? "inline-block" : "none";

    if (!allDone) {
      contactSection.style.display = "none";
    }
  }

  // ---- Attach achievement triggers ----
  [...skillCards, ...softSkillItems, ...projectCards].forEach((card) => {
    card.addEventListener("mouseenter", () => unlockAchievement(card.dataset.achievement));
    card.addEventListener("focus", () => unlockAchievement(card.dataset.achievement));
  });

  // ---- Contact button click: reveal contact section ----
  btnContact.addEventListener("click", (contactEvt) => {
    contactEvt.preventDefault();
    if (btnContact.style.display !== "none") {
      contactSection.style.display = "block";
      contactSection.focus({ preventScroll: true });
      contactSection.scrollIntoView({ behavior: "smooth" });
      document.querySelector(".page-wrapper").style.minHeight = "100vh";
      updateNavActive();
    }
  });

  // ---- Contact form submission ----
  contactForm.addEventListener("submit", async (formEvt) => {
    formEvt.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;

    // Security checks
    const honeypot = contactForm.querySelector('[name="_gotcha"]');
    if (honeypot && honeypot.value.trim() !== '') { btn.disabled = false; return; }
    const elapsed = Date.now() - formLoadTs;
    if (elapsed < 2000 || elapsed > 600000) { btn.disabled = false; return; }
    const email = contactForm.email.value.trim().toLowerCase();
    const domain = email.split('@')[1];
    if (domain && disposableDomains.includes(domain)) { btn.disabled = false; return; }
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
      Swal.fire({ title: contactAlerts[currentLang].recaptchaNotVerifiedTitle, text: contactAlerts[currentLang].recaptchaNotVerifiedText, icon: "warning", confirmButtonText: contactAlerts[currentLang].closeButton, confirmButtonColor: "#1a6881" });
      btn.disabled = false;
      return;
    }

    const formData = new FormData(contactForm);
    try {
      const res = await fetch(contactForm.action, { method: 'POST', body: formData, headers: { Accept: 'application/json' } });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({ title: contactAlerts[currentLang].messageSentTitle, text: contactAlerts[currentLang].messageSentText, icon: "success", confirmButtonText: contactAlerts[currentLang].closeButton, confirmButtonColor: "#1a6881" });
        contactForm.reset();
        grecaptcha.reset();
      } else {
        Swal.fire({ title: contactAlerts[currentLang].errorSendTitle, text: data.error || contactAlerts[currentLang].errorSendText, icon: "error", confirmButtonText: contactAlerts[currentLang].closeButton, confirmButtonColor: "#1a6881" });
      }
    } catch (err) {
      Swal.fire({ title: contactAlerts[currentLang].errorSendTitle, text: contactAlerts[currentLang].errorSendText, icon: "error", confirmButtonText: contactAlerts[currentLang].closeButton, confirmButtonColor: "#1a6881" });
    }
    btn.disabled = false;
  });

  // ---- Initial run ----
  updateProgressBar();
  checkAllAchievements();
  updateNavActive();

});
