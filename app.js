/**
 * RevPulse Revenue Intelligence — Interactive Authentication & Dashboard Experience
 * Handles validation, states (focus, loading, error, success), accessible controls, and simulated charts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email-input');
  const passwordInput = document.getElementById('password-input');
  const rememberCheckbox = document.getElementById('remember-me-checkbox');
  const submitBtn = document.getElementById('submit-btn');
  const btnSpinner = document.getElementById('btn-spinner');
  const btnText = document.getElementById('btn-text');
  
  const emailFeedback = document.getElementById('email-feedback');
  const passwordFeedback = document.getElementById('password-feedback');
  const emailWrapper = emailInput.closest('.input-wrapper');
  const passwordWrapper = passwordInput.closest('.input-wrapper');
  const emailStatusIcon = document.getElementById('email-status-icon');

  const togglePasswordBtn = document.getElementById('toggle-password-btn');
  const eyeOpenIcon = togglePasswordBtn.querySelector('.eye-open-icon');
  const eyeClosedIcon = togglePasswordBtn.querySelector('.eye-closed-icon');

  const authAlert = document.getElementById('auth-alert');
  const alertMessage = document.getElementById('alert-message');
  const alertIconWrap = document.getElementById('alert-icon-wrap');
  const alertDismiss = document.getElementById('alert-dismiss');

  const demoAutofillBtn = document.getElementById('demo-autofill-btn');

  // Modals (Reset Security Credentials Flow)
  const forgotPasswordTrigger = document.getElementById('forgot-password-trigger');
  const forgotModal = document.getElementById('forgot-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modalSub = document.getElementById('modal-sub');

  const forgotStep1 = document.getElementById('forgot-step-1');
  const resetEmailInput = document.getElementById('reset-email-input');
  const resetEmailWrapper = document.getElementById('reset-email-wrapper');
  const resetEmailFeedback = document.getElementById('reset-email-feedback');
  const resetSpinner = document.getElementById('reset-spinner');
  const sendResetText = document.getElementById('send-reset-text');
  const sendResetBtn = document.getElementById('send-reset-btn');

  const forgotStep2 = document.getElementById('forgot-step-2');
  const otpCodeInput = document.getElementById('otp-code-input');
  const otpWrapper = document.getElementById('otp-wrapper');
  const otpFeedback = document.getElementById('otp-feedback');
  const newPasswordInput = document.getElementById('new-password-input');
  const newPasswordWrapper = document.getElementById('new-password-wrapper');
  const newPasswordFeedback = document.getElementById('new-password-feedback');
  const modalBackBtn = document.getElementById('modal-back-btn');
  const confirmResetBtn = document.getElementById('confirm-reset-btn');
  const confirmSpinner = document.getElementById('confirm-spinner');
  const confirmResetText = document.getElementById('confirm-reset-text');

  const forgotStepSuccess = document.getElementById('forgot-step-success');
  const modalDoneBtn = document.getElementById('modal-done-btn');





  // Validation regular expressions
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  /* --------------------------------------------------------------------------
     1. Default Dark Theme Enforced
     -------------------------------------------------------------------------- */
  document.body.className = 'theme-dark';
  localStorage.setItem('revpulse_theme', 'theme-dark');

  /* --------------------------------------------------------------------------
     2. Password Show / Hide Control
     -------------------------------------------------------------------------- */
  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    if (isPassword) {
      passwordInput.setAttribute('type', 'text');
      togglePasswordBtn.setAttribute('aria-label', 'Hide password');
      togglePasswordBtn.setAttribute('aria-pressed', 'true');
      eyeOpenIcon.classList.add('hidden');
      eyeClosedIcon.classList.remove('hidden');
    } else {
      passwordInput.setAttribute('type', 'password');
      togglePasswordBtn.setAttribute('aria-label', 'Show password as plain text');
      togglePasswordBtn.setAttribute('aria-pressed', 'false');
      eyeOpenIcon.classList.remove('hidden');
      eyeClosedIcon.classList.add('hidden');
    }
    passwordInput.focus();
  });

  /* --------------------------------------------------------------------------
     3. Field Validation Helpers
     -------------------------------------------------------------------------- */
  function validateEmail(showError = true) {
    const val = emailInput.value.trim();
    if (!val) {
      emailWrapper.classList.remove('has-success', 'has-error');
      emailStatusIcon.innerHTML = '';
      if (showError) {
        setFieldError(emailWrapper, emailFeedback, 'Corporate email address is required.');
      } else {
        clearFieldError(emailWrapper, emailFeedback);
      }
      return false;
    }
    if (!emailRegex.test(val)) {
      emailWrapper.classList.remove('has-success');
      emailStatusIcon.innerHTML = '';
      if (showError) {
        setFieldError(emailWrapper, emailFeedback, 'Please enter a valid business email format (e.g. name@gmail.com).');
        emailStatusIcon.innerHTML = getStatusIconSvg('error');
      } else {
        clearFieldError(emailWrapper, emailFeedback);
      }
      return false;
    }
    clearFieldError(emailWrapper, emailFeedback);
    emailWrapper.classList.remove('has-error');
    emailWrapper.classList.add('has-success');
    emailStatusIcon.innerHTML = getStatusIconSvg('success');
    return true;
  }

  function validatePassword(showError = true) {
    const val = passwordInput.value;
    if (!val) {
      passwordWrapper.classList.remove('has-success', 'has-error');
      if (showError) {
        setFieldError(passwordWrapper, passwordFeedback, 'Password is required to authenticate.');
      } else {
        clearFieldError(passwordWrapper, passwordFeedback);
      }
      return false;
    }
    if (val.length < 6) {
      passwordWrapper.classList.remove('has-success');
      if (showError) {
        setFieldError(passwordWrapper, passwordFeedback, 'Security policy requires at least 6 characters.');
      }
      return false;
    }
    clearFieldError(passwordWrapper, passwordFeedback);
    passwordWrapper.classList.remove('has-error');
    passwordWrapper.classList.add('has-success');
    return true;
  }

  function setFieldError(wrapper, messageEl, messageText) {
    wrapper.classList.remove('has-success');
    wrapper.classList.add('has-error');
    messageEl.textContent = messageText;
  }

  function clearFieldError(wrapper, messageEl) {
    wrapper.classList.remove('has-error');
    messageEl.textContent = '';
  }

  function getStatusIconSvg(type) {
    if (type === 'success') {
      return `<svg viewBox="0 0 20 20" fill="#10B981" width="16" height="16"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;
    }
    if (type === 'error') {
      return `<svg viewBox="0 0 20 20" fill="#EF4444" width="16" height="16"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`;
    }
    return '';
  }

  // Live input events: tick mark only appears when email is completely and validly filled
  emailInput.addEventListener('input', () => {
    const val = emailInput.value.trim();
    if (!val) {
      emailWrapper.classList.remove('has-success', 'has-error');
      emailStatusIcon.innerHTML = '';
      clearFieldError(emailWrapper, emailFeedback);
      return;
    }

    if (emailRegex.test(val)) {
      // Completely filled with valid domain (e.g. user@gmail.com): show green tick mark!
      clearFieldError(emailWrapper, emailFeedback);
      emailWrapper.classList.remove('has-error');
      emailWrapper.classList.add('has-success');
      emailStatusIcon.innerHTML = getStatusIconSvg('success');
    } else {
      // Incomplete or partially typed: immediately remove tick mark and success state
      emailWrapper.classList.remove('has-success');
      emailStatusIcon.innerHTML = '';
      if (!emailWrapper.classList.contains('has-error')) {
        clearFieldError(emailWrapper, emailFeedback);
      }
    }
  });

  emailInput.addEventListener('focus', () => {
    const val = emailInput.value.trim();
    if (!val) {
      emailWrapper.classList.remove('has-success', 'has-error');
      emailStatusIcon.innerHTML = '';
      clearFieldError(emailWrapper, emailFeedback);
    }
  });

  emailInput.addEventListener('blur', () => {
    const val = emailInput.value.trim();
    if (!val) {
      emailWrapper.classList.remove('has-success', 'has-error');
      emailStatusIcon.innerHTML = '';
      clearFieldError(emailWrapper, emailFeedback);
    } else {
      validateEmail(true);
    }
  });

  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    if (!val) {
      passwordWrapper.classList.remove('has-success', 'has-error');
      clearFieldError(passwordWrapper, passwordFeedback);
      return;
    }
    if (val.length >= 6) {
      clearFieldError(passwordWrapper, passwordFeedback);
      passwordWrapper.classList.remove('has-error');
      passwordWrapper.classList.add('has-success');
    } else {
      passwordWrapper.classList.remove('has-success');
    }
  });

  passwordInput.addEventListener('blur', () => {
    if (passwordInput.value) {
      validatePassword(true);
    } else {
      passwordWrapper.classList.remove('has-success', 'has-error');
      clearFieldError(passwordWrapper, passwordFeedback);
    }
  });

  /* --------------------------------------------------------------------------
     4. Alert Banner System
     -------------------------------------------------------------------------- */
  function showAlert(type, message) {
    authAlert.className = `auth-alert ${type}`;
    alertMessage.textContent = message;
    
    if (type === 'error') {
      alertIconWrap.innerHTML = `<svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>`;
    } else if (type === 'success') {
      alertIconWrap.innerHTML = `<svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>`;
    } else {
      alertIconWrap.innerHTML = `<svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>`;
    }
    
    authAlert.classList.remove('hidden');
  }

  alertDismiss.addEventListener('click', () => {
    authAlert.classList.add('hidden');
  });

  /* --------------------------------------------------------------------------
     5. Quick Demo Auto-fill Helper
     -------------------------------------------------------------------------- */
  demoAutofillBtn.addEventListener('click', () => {
    emailInput.value = 'alex.morgan@enterprise.io';
    passwordInput.value = 'RevPulse2026#Secure';
    rememberCheckbox.checked = true;
    validateEmail(false);
    validatePassword(false);
    showAlert('info', 'Demo credentials loaded. Click "Sign in" to test the authentication flow.');
  });

  /* --------------------------------------------------------------------------
     6. Main Authentication Flow (Explicit Integration Point)
     -------------------------------------------------------------------------- */
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(true);
    const isPasswordValid = validatePassword(true);

    if (!isEmailValid || !isPasswordValid) {
      showAlert('error', 'Please resolve highlighted form validation errors before signing in.');
      return;
    }

    // Set Loading State
    setFormLoadingState(true);

    // Simulated Authentication Request (Integration Hook Point)
    try {
      await new Promise(resolve => setTimeout(resolve, 900));

      setFormLoadingState(false);
      showAlert(
        'success',
        `Welcome back! Authenticated successfully for ${emailInput.value}.`
      );

    } catch (err) {
      setFormLoadingState(false);
      showAlert('error', 'Authentication gateway timed out. Please check network connectivity.');
    }
  });

  function setFormLoadingState(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      btnSpinner.classList.remove('hidden');
      btnText.textContent = 'Verifying credentials...';
      emailInput.disabled = true;
      passwordInput.disabled = true;
      rememberCheckbox.disabled = true;
    } else {
      submitBtn.disabled = false;
      btnSpinner.classList.add('hidden');
      btnText.textContent = 'Sign in to Platform';
      emailInput.disabled = false;
      passwordInput.disabled = false;
      rememberCheckbox.disabled = false;
    }
  }

  /* --------------------------------------------------------------------------
     7. Modal Management (Reset Security Credentials Flow)
     -------------------------------------------------------------------------- */
  function openModal(modalEl) {
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    modalEl.classList.add('hidden');
    document.body.style.overflow = '';
    resetModalFlow();
  }

  function resetModalFlow() {
    forgotStep1.classList.remove('hidden');
    forgotStep2.classList.add('hidden');
    forgotStepSuccess.classList.add('hidden');

    resetEmailWrapper.classList.remove('has-error', 'has-success');
    resetEmailFeedback.textContent = '';
    resetSpinner.classList.add('hidden');
    sendResetText.textContent = 'Send Verification Code';
    sendResetBtn.disabled = false;

    otpWrapper.classList.remove('has-error');
    otpFeedback.textContent = '';
    newPasswordWrapper.classList.remove('has-error');
    newPasswordFeedback.textContent = '';
    confirmSpinner.classList.add('hidden');
    confirmResetText.textContent = 'Update Password';
    confirmResetBtn.disabled = false;

    modalSub.textContent = 'Enter your corporate email address to receive secure OTP recovery instructions.';
  }

  // Trigger Open
  forgotPasswordTrigger.addEventListener('click', () => {
    resetModalFlow();
    resetEmailInput.value = emailInput.value || '';
    openModal(forgotModal);
    setTimeout(() => resetEmailInput.focus(), 50);
  });

  modalCloseBtn.addEventListener('click', () => closeModal(forgotModal));
  modalCancelBtn.addEventListener('click', () => closeModal(forgotModal));

  // Step 1: Submit email to request OTP
  forgotStep1.addEventListener('submit', async (e) => {
    e.preventDefault();
    const val = resetEmailInput.value.trim();
    if (!val || !emailRegex.test(val)) {
      resetEmailWrapper.classList.add('has-error');
      resetEmailFeedback.textContent = 'Please enter a valid corporate email address (e.g. name@company.com).';
      resetEmailInput.focus();
      return;
    }

    resetEmailWrapper.classList.remove('has-error');
    resetEmailWrapper.classList.add('has-success');
    resetEmailFeedback.textContent = '';

    sendResetBtn.disabled = true;
    resetSpinner.classList.remove('hidden');
    sendResetText.textContent = 'Sending code...';

    await new Promise(res => setTimeout(res, 550));

    sendResetBtn.disabled = false;
    resetSpinner.classList.add('hidden');
    sendResetText.textContent = 'Send Verification Code';

    // Transition to Step 2
    forgotStep1.classList.add('hidden');
    forgotStep2.classList.remove('hidden');
    modalSub.textContent = `A 6-digit verification code has been dispatched to ${val}.`;
    otpCodeInput.value = '492018'; // Handy pre-fill for demo testing
    setTimeout(() => newPasswordInput.focus(), 60);
  });

  // Step 2: Back button
  modalBackBtn.addEventListener('click', () => {
    forgotStep2.classList.add('hidden');
    forgotStep1.classList.remove('hidden');
    modalSub.textContent = 'Enter your corporate email address to receive secure OTP recovery instructions.';
    resetEmailInput.focus();
  });

  // Step 2: Submit code & new password
  forgotStep2.addEventListener('submit', async (e) => {
    e.preventDefault();
    const otp = otpCodeInput.value.trim();
    const newPass = newPasswordInput.value;

    let hasErr = false;
    if (!otp || otp.length < 4) {
      otpWrapper.classList.add('has-error');
      otpFeedback.textContent = 'Please enter the 6-digit verification code.';
      hasErr = true;
    } else {
      otpWrapper.classList.remove('has-error');
      otpFeedback.textContent = '';
    }

    if (!newPass || newPass.length < 6) {
      newPasswordWrapper.classList.add('has-error');
      newPasswordFeedback.textContent = 'New password must contain at least 6 characters.';
      hasErr = true;
    } else {
      newPasswordWrapper.classList.remove('has-error');
      newPasswordFeedback.textContent = '';
    }

    if (hasErr) return;

    confirmResetBtn.disabled = true;
    confirmSpinner.classList.remove('hidden');
    confirmResetText.textContent = 'Updating...';

    await new Promise(res => setTimeout(res, 600));

    confirmResetBtn.disabled = false;
    confirmSpinner.classList.add('hidden');
    confirmResetText.textContent = 'Update Password';

    // Transition to Step 3 (Success)
    forgotStep2.classList.add('hidden');
    forgotStepSuccess.classList.remove('hidden');
    modalSub.textContent = 'Your security credentials have been updated successfully.';

    // Populate main login form with new credentials for seamless experience
    if (resetEmailInput.value.trim()) {
      emailInput.value = resetEmailInput.value.trim();
    }
    passwordInput.value = newPass;
    validateEmail(false);
    validatePassword(false);
  });

  // Step 3: Done / Return to Sign In
  modalDoneBtn.addEventListener('click', () => {
    closeModal(forgotModal);
    showAlert('success', 'Security credentials updated! Click "Sign in to Platform" to proceed.');
  });

  // Close modals on backdrop click or ESC key
  window.addEventListener('click', (e) => {
    if (e.target === forgotModal) closeModal(forgotModal);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !forgotModal.classList.contains('hidden')) {
      closeModal(forgotModal);
    }
  });

  /* --------------------------------------------------------------------------
     8. Cinematic Bitcoin Opening Transition & Vault Zoom-Through
     -------------------------------------------------------------------------- */
  const introOverlay = document.getElementById('bitcoin-intro-overlay');
  const introCoin = document.getElementById('btc-intro-coin');
  const coreFlash = document.getElementById('btc-core-flash');
  const replayBtn = document.getElementById('replay-intro-btn');

  let introAnimFrame = null;
  let isTransitioning = false;
  let introAutoTimer = null;
  let idleAngle = 0;

  // Subtle 3D levitation & front-facing perspective: keeps the Bitcoin layout crystal clear
  function runIntroIdle() {
    if (isTransitioning || !introCoin) return;
    idleAngle += 0.026;
    const rotY = Math.sin(idleAngle * 0.7) * 10; // Gentle +/- 10 deg swivel preserves all vector details
    const tiltX = Math.cos(idleAngle * 0.5) * 6;
    const floatY = Math.sin(idleAngle * 0.9) * 5;

    introCoin.style.transform = `translate3d(0, ${floatY.toFixed(2)}px, 0) rotateY(${rotY.toFixed(2)}deg) rotateX(${tiltX.toFixed(2)}deg)`;
    introAnimFrame = requestAnimationFrame(runIntroIdle);
  }

  // Zoom straight into the middle of the Bitcoin coin and open to email & password interface
  function zoomIntoMiddleAndOpenPlatform() {
    if (isTransitioning || !introOverlay) return;
    isTransitioning = true;

    if (introAutoTimer) {
      clearTimeout(introAutoTimer);
      introAutoTimer = null;
    }

    if (introAnimFrame) {
      cancelAnimationFrame(introAnimFrame);
      introAnimFrame = null;
    }

    // 1. Move camera straight into the middle of the Bitcoin coin layout
    if (introCoin) {
      introCoin.classList.add('zooming-in');
    }

    // 2. Camera penetrates the center core aperture: ignite golden light flare
    setTimeout(() => {
      if (coreFlash) {
        coreFlash.classList.add('explode');
      }
    }, 400);

    // 3. Dissolve overlay and reveal email and password interface
    setTimeout(() => {
      if (introOverlay) {
        introOverlay.classList.add('fade-out');
      }
      document.body.classList.remove('site-intro-pending');
      document.body.classList.add('site-intro-revealed');
    }, 650);

    // 4. Complete transition, hide intro overlay, and auto-focus email input
    setTimeout(() => {
      if (introOverlay) {
        introOverlay.style.display = 'none';
      }
      isTransitioning = false;

      // Focus email input for immediate typing
      if (emailInput) {
        emailInput.focus();
      }
    }, 1200);
  }

  // Start or Replay the intro sequence
  function playBitcoinIntro() {
    isTransitioning = false;
    idleAngle = 0;

    if (introAutoTimer) {
      clearTimeout(introAutoTimer);
    }
    if (introAnimFrame) {
      cancelAnimationFrame(introAnimFrame);
    }

    document.body.classList.remove('site-intro-revealed');
    document.body.classList.add('site-intro-pending');

    if (introOverlay) {
      introOverlay.style.display = 'flex';
      introOverlay.classList.remove('fade-out');
    }

    if (introCoin) {
      introCoin.classList.remove('zooming-in');
      introCoin.style.transform = 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)';
    }

    if (coreFlash) {
      coreFlash.classList.remove('explode');
    }

    // Start 3D subtle levitation loop
    runIntroIdle();

    // Automatically zoom into middle and open after 1.2 seconds of clear coin display
    introAutoTimer = setTimeout(() => {
      zoomIntoMiddleAndOpenPlatform();
    }, 1200);
  }

  // Interactive Cues & Event Listeners
  if (introCoin) {
    introCoin.addEventListener('click', (e) => {
      e.stopPropagation();
      zoomIntoMiddleAndOpenPlatform();
    });
  }

  if (introOverlay) {
    introOverlay.addEventListener('click', () => {
      zoomIntoMiddleAndOpenPlatform();
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      playBitcoinIntro();
    });
  }

  // Keyboard shortcut: Press any key during intro to enter immediately
  window.addEventListener('keydown', (e) => {
    if (document.body.classList.contains('site-intro-pending')) {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        zoomIntoMiddleAndOpenPlatform();
      }
    }
  });

  /* --------------------------------------------------------------------------
     Mouse-Parallax 3D Tilt + Position + Flip — Both Side Bitcoin Coins
     Factory pattern: one shared mouse state, two independent controllers.
     -------------------------------------------------------------------------- */
  (function initBothCoinControllers() {

    // ── Shared mouse state (normalized -1 to +1) ──────────────────────────────
    let sharedNX = 0, sharedNY = 0;

    document.addEventListener('mousemove', (e) => {
      sharedNX = (e.clientX / window.innerWidth  - 0.5) * 2;
      sharedNY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        sharedNX = (e.touches[0].clientX / window.innerWidth  - 0.5) * 2;
        sharedNY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => { sharedNX = 0; sharedNY = 0; });

    // ── Coin controller factory ───────────────────────────────────────────────
    function makeCoinController(tiltId) {
      const tiltEl = document.getElementById(tiltId);
      if (!tiltEl) return;

      // Query children relative to tiltEl so left/right coins don't clash
      const floatEl = tiltEl.querySelector('.side-coin-wrap');
      const sheenEl = tiltEl.querySelector('.side-coin-sheen');
      const coinBox = tiltEl.closest('.side-btc-coin');   // for flash burst

      if (!floatEl) return;

      // Lerp state
      let curRotX = 0, curRotY = 0, curTX = 0, curTY = 0, curGX = 35, curGY = 25;
      let isFlipping = false;

      const MAX_TILT = 28, MAX_MOVE = 36;
      const lerp = (a, b, t) => a + (b - a) * t;

      // ── RAF tick ──────────────────────────────────────────────────────────
      function tick() {
        if (!isFlipping) {
          const ease = 0.08;
          const tgtTX = sharedNX * MAX_MOVE,  tgtTY = sharedNY * MAX_MOVE;
          const tgtRotY = sharedNX * MAX_TILT, tgtRotX = -sharedNY * MAX_TILT;
          const tgtGX = 50 - sharedNX * 32,   tgtGY = 42 - sharedNY * 28;

          curRotX = lerp(curRotX, tgtRotX, ease);
          curRotY = lerp(curRotY, tgtRotY, ease);
          curTX   = lerp(curTX,   tgtTX,   ease);
          curTY   = lerp(curTY,   tgtTY,   ease);
          curGX   = lerp(curGX,   tgtGX,   ease);
          curGY   = lerp(curGY,   tgtGY,   ease);

          tiltEl.style.transform = `
            translateX(${curTX.toFixed(2)}px)
            translateY(${curTY.toFixed(2)}px)
            rotateX(${curRotX.toFixed(2)}deg)
            rotateY(${curRotY.toFixed(2)}deg)
          `;

          if (sheenEl) {
            sheenEl.style.background = `radial-gradient(circle at ${curGX.toFixed(1)}% ${curGY.toFixed(1)}%, rgba(255,255,255,0.42) 0%, transparent 60%)`;
          }

          const sdX = (curRotY / MAX_TILT) * 24;
          const sdY = (-curRotX / MAX_TILT) * 24 + 32;
          const glow = Math.abs(curRotX / MAX_TILT + curRotY / MAX_TILT) * 0.25 + 0.65;
          floatEl.style.filter = `
            drop-shadow(${sdX * 0.16}px ${sdY * 0.16}px 0px #78350F)
            drop-shadow(${sdX * 0.32}px ${sdY * 0.32}px 0px #451A03)
            drop-shadow(${sdX.toFixed(1)}px ${sdY.toFixed(1)}px 65px rgba(0,0,0,0.95))
            drop-shadow(0 0 ${(glow * 75).toFixed(0)}px rgba(245,158,11,${glow.toFixed(2)}))
          `;
        }
        requestAnimationFrame(tick);
      }

      // ── Flip ──────────────────────────────────────────────────────────────
      function triggerFlip() {
        if (isFlipping) return;
        isFlipping = true;
        tiltEl.style.transition = 'none';
        floatEl.classList.add('coin-flipping');

        // Gold burst
        const flash = document.createElement('div');
        flash.className = 'flip-flash-burst';
        if (coinBox) coinBox.appendChild(flash);
        flash.addEventListener('animationend', () => flash.remove(), { once: true });

        floatEl.addEventListener('animationend', () => {
          floatEl.classList.remove('coin-flipping');
          isFlipping = false;
        }, { once: true });
      }

      // ── Double-click (desktop) ────────────────────────────────────────────
      tiltEl.addEventListener('dblclick', (e) => {
        e.preventDefault();
        triggerFlip();
      });

      // ── Double-tap (mobile) ────────────────────────────────────────────────
      let lastTap = 0;
      tiltEl.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTap < 350) { e.preventDefault(); triggerFlip(); lastTap = 0; }
        else lastTap = now;
      });

      // Kick off RAF
      tick();
    }

    // ── Initialise right coin only ─────────────────────────────────────────
    makeCoinController('side-coin-tilt-right');  // right coin

  })();

  // Launch initial Bitcoin opening sequence on page load
  playBitcoinIntro();
});
