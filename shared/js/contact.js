/* ============================================
   Shared Contact Form (Formspree)
   ============================================ */

function ELinitContactForm() {
  const proto = window.location.protocol;
  const host = window.location.hostname;
  const isFile = proto === 'file:';
  const isLocalhost = host === 'localhost' || host === '127.0.0.1';
  const isLocal = isFile || isLocalhost;
  if (isLocal) {
    // Local mode: reCAPTCHA validation skipped for testing
  }

  const RL_KEY = '_cv_form_rl';
  function getAttempts() {
    try { return parseInt(sessionStorage.getItem(RL_KEY)) || 0; } catch (e) { return 0; }
  }
  function incAttempts() {
    try { sessionStorage.setItem(RL_KEY, String(getAttempts() + 1)); } catch (e) {}
  }

  const TEMP_DOMAINS = new Set([
    '10minutemail.com','tempmail.com','guerrillamail.com','mailinator.com',
    'yopmail.com','throwawaymail.com','getairmail.com','burner.email',
    'temp-mail.org','mohmal.com','fakemail.net','mailnesia.com',
    'sharklasers.com','spamgourmet.com','jetable.org','mytrashmail.com',
    'mailcatch.com','getnada.com','inboxkitten.com','tempail.com',
    'disposable.com','trashmail.com','fakeinbox.com','mailforspam.com',
    'emailtemporario.com.br','temporario.email','emailfake.com'
  ]);

  const formLoadTs = Date.now();
  const form = document.getElementById('contactForm');
  if (!form) return;

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
    const btn = document.getElementById('submitBtn');
    const btnOriginalText = btn.textContent;
    btn.disabled = true;

    if (isBot()) {
      btn.disabled = false;
      return;
    }

    const honeypot = document.getElementById('formHoneypot');
    if (honeypot && honeypot.value.trim() !== '') {
      btn.disabled = false;
      return;
    }

    const elapsed = Date.now() - formLoadTs;
    if (elapsed < 2000 || elapsed > 600000) {
      Swal.fire({
        icon: 'warning',
        title: ELState.lang === 'pt' ? 'Tempo inválido' : 'Invalid timing',
        text: ELState.lang === 'pt'
          ? 'O formulário foi submetido muito rapidamente ou expirou. Tenta novamente.'
          : 'The form was submitted too quickly or has expired. Please try again.',
        confirmButtonColor: '#2491b6',
        background: ELState.theme === 'dark' ? '#0f172a' : '#ffffff',
        color: ELState.theme === 'dark' ? '#f8fafc' : '#0f172a',
      });
      btn.disabled = false;
      return;
    }

    const email = document.getElementById('formEmail')?.value.trim().toLowerCase() || '';
    const emailDomain = email.split('@')[1];
    if (emailDomain && TEMP_DOMAINS.has(emailDomain)) {
      Swal.fire({
        icon: 'warning',
        title: ELState.lang === 'pt' ? 'Email não permitido' : 'Email not allowed',
        text: ELState.lang === 'pt'
          ? 'Endereços de email temporários não são permitidos.'
          : 'Temporary email addresses are not allowed.',
        confirmButtonColor: '#2491b6',
        background: ELState.theme === 'dark' ? '#0f172a' : '#ffffff',
        color: ELState.theme === 'dark' ? '#f8fafc' : '#0f172a',
      });
      btn.disabled = false;
      return;
    }

    if (!isLocalhost && getAttempts() >= 3) {
      Swal.fire({
        icon: 'error',
        title: ELState.lang === 'pt' ? 'Limite atingido' : 'Limit reached',
        text: ELState.lang === 'pt'
          ? 'Atingiste o limite de 3 envios por sessão. Recarrega a página para tentar novamente.'
          : 'You have reached the limit of 3 submissions per session. Please refresh the page to try again.',
        confirmButtonColor: '#2491b6',
        background: ELState.theme === 'dark' ? '#0f172a' : '#ffffff',
        color: ELState.theme === 'dark' ? '#f8fafc' : '#0f172a',
      });
      btn.disabled = false;
      return;
    }

    if (!isLocal) {
      const recaptcha = grecaptcha.getResponse();
      if (!recaptcha) {
        Swal.fire({
          icon: 'warning',
          title: ELi18n[ELState.lang]['form.captcha'],
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          background: ELState.theme === 'dark' ? '#0f172a' : '#ffffff',
          color: ELState.theme === 'dark' ? '#f8fafc' : '#0f172a',
        });
        btn.disabled = false;
        return;
      }
    }

    let delay = 2;
    btn.textContent = (ELState.lang === 'pt' ? 'A enviar em ' : 'Sending in ') + delay + 's...';
    const delayInterval = setInterval(() => {
      delay--;
      if (delay > 0) {
        btn.textContent = (ELState.lang === 'pt' ? 'A enviar em ' : 'Sending in ') + delay + 's...';
      } else {
        clearInterval(delayInterval);
        btn.textContent = ELState.lang === 'pt' ? 'A enviar...' : 'Sending...';
        submitForm();
      }
    }, 1000);

    function submitForm() {
      incAttempts();
      const formData = new FormData(form);

      fetch('https://formspree.io/f/xnjwpjvl', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      })
        .then(async r => {
          const data = await r.json();
          return data;
        })
        .then(data => {
          if (data.ok) {
            Swal.fire({
              icon: 'success',
              title: ELi18n[ELState.lang]['form.success'],
              confirmButtonColor: '#2491b6',
              background: ELState.theme === 'dark' ? '#0f172a' : '#ffffff',
              color: ELState.theme === 'dark' ? '#f8fafc' : '#0f172a',
            });
            form.reset();
            grecaptcha.reset();
          } else {
            Swal.fire({
              icon: 'error',
              title: ELi18n[ELState.lang]['form.error'],
              text: data.error || '',
              confirmButtonColor: '#2491b6',
              background: ELState.theme === 'dark' ? '#0f172a' : '#ffffff',
              color: ELState.theme === 'dark' ? '#f8fafc' : '#0f172a',
            });
          }
        })
        .catch(err => {
          let msg = '';
          if (isFile) {
            msg = ELState.lang === 'pt'
              ? 'Não é possível enviar de file:// diretamente. Usa um servidor local (ex: Live Server no VS Code) ou abre via http://localhost.'
              : 'Cannot send from file:// directly. Please use a local server (e.g., Live Server in VS Code) or open via http://localhost.';
          } else if (err && err.message) {
            msg = err.message;
          } else {
            msg = ELState.lang === 'pt'
              ? 'Erro de rede. Verifica a ligação à internet.'
              : 'Network error. Please check your internet connection.';
          }
          Swal.fire({
            icon: 'error',
            title: ELi18n[ELState.lang]['form.error'],
            text: msg,
            confirmButtonColor: '#2491b6',
            background: ELState.theme === 'dark' ? '#0f172a' : '#ffffff',
            color: ELState.theme === 'dark' ? '#f8fafc' : '#0f172a',
          });
        })
        .finally(() => {
          btn.disabled = false;
          btn.textContent = btnOriginalText;
        });
    }
  });
}
