import { dayKey, FALLBACK_STORE_SETTINGS, Role } from './data/posData';
import { supabase } from './lib/supabase';

(function initElFarmPosWidget() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if ((window as unknown as { __ELFARM_POS_WIDGET_READY__?: boolean }).__ELFARM_POS_WIDGET_READY__) {
    return;
  }
  (window as unknown as { __ELFARM_POS_WIDGET_READY__?: boolean }).__ELFARM_POS_WIDGET_READY__ = true;

  const params = new URLSearchParams(window.location.search);
  const autoOpenLogin = params.get('posLogin') === '1';
  const initialRole: Role = params.get('role') === 'admin' ? 'admin' : 'cashier';

  // If redirected here to open the floating POS login box, skip the splash intro immediately
  if (autoOpenLogin) {
    try {
      sessionStorage.setItem('elfarm_intro_played', '1');
    } catch {
      // ignore storage errors
    }
    document.documentElement.classList.remove('elfarm-intro-lock', 'elfarm-intro-pending');
  }

  const STYLE_ID = 'elfarm-pos-widget-styles';
  function ensureWidgetStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      header .framer-1g6xkw5,
      header [data-framer-name="Header Button"] {
        display: inline-flex !important;
        align-items: center !important;
        gap: 10px !important;
        width: auto !important;
        overflow: visible !important;
      }
      header .framer-1g6xkw5 > * {
        margin: 0 !important;
      }
      #elfarm-pos-header-btn {
        pointer-events: auto !important;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        height: 42px;
        min-height: 42px;
        max-height: 42px;
        padding: 0 15px;
        border-radius: 2px;
        border: 1px solid rgba(239, 201, 164, 0.55);
        background: rgba(11, 19, 21, 0.78);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        color: #efc9a4;
        font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        white-space: nowrap;
        box-sizing: border-box;
        cursor: pointer;
        transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
      }
      #elfarm-pos-header-btn:hover {
        background: rgba(239, 201, 164, 0.16);
        border-color: #efc9a4;
        color: #ffffff;
      }
      #elfarm-pos-header-btn:active {
        transform: scale(0.97);
      }
      #elfarm-pos-header-btn svg {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
      }
      @media (max-width: 1024px) {
        #elfarm-pos-header-btn,
        #elfarm-pos-mobile-btn {
          display: none !important;
        }
      }

      /* Floating Login Box Overlay (Exact Match to Screenshot 2) */
      #elfarm-pos-login-modal {
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: rgba(5, 8, 13, 0.72);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        font-family: 'Inter', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      #elfarm-pos-login-modal.is-open {
        display: flex;
      }
      .elfarm-pos-card {
        position: relative;
        width: 100%;
        max-width: 440px;
        border-radius: 32px;
        padding: 30px 28px 26px;
        background: linear-gradient(180deg, rgba(24, 28, 37, 0.96) 0%, rgba(15, 18, 25, 0.98) 100%);
        border: 1px solid rgba(255, 255, 255, 0.11);
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.12),
          0 32px 70px -20px rgba(0, 0, 0, 0.88);
        color: #ffffff;
        animation: elfarmPosCardPop 0.2s cubic-bezier(0.22, 1, 0.36, 1);
      }
      @keyframes elfarmPosCardPop {
        from { opacity: 0; transform: translateY(10px) scale(0.97); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      @media (max-width: 480px) {
        .elfarm-pos-card {
          padding: 24px 20px 22px;
          border-radius: 26px;
        }
      }
      .elfarm-pos-close {
        position: absolute;
        top: 18px;
        right: 18px;
        width: 34px;
        height: 34px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.6);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .elfarm-pos-close:hover {
        background: rgba(255, 255, 255, 0.14);
        color: #ffffff;
      }
      .elfarm-pos-head {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 22px;
        padding-right: 28px;
      }
      .elfarm-pos-logo {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        overflow: hidden;
        flex-shrink: 0;
        background: #000000;
        border: 1px solid rgba(251, 191, 36, 0.45);
        box-shadow:
          inset 0 1px 0 rgba(255, 215, 128, 0.35),
          0 12px 28px -8px rgba(245, 158, 11, 0.5);
      }
      .elfarm-pos-logo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .elfarm-pos-badge {
        display: inline-flex;
        align-items: center;
        padding: 3px 10px;
        border-radius: 999px;
        border: 1px solid rgba(52, 211, 153, 0.32);
        background: rgba(16, 185, 129, 0.15);
        color: #6ee7b7;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      .elfarm-pos-title {
        margin: 4px 0 2px;
        font-size: 24px;
        line-height: 1.15;
        font-weight: 800;
        letter-spacing: -0.02em;
        color: #ffffff;
      }
      .elfarm-pos-sub {
        margin: 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.55);
      }
      .elfarm-pos-field {
        margin-bottom: 16px;
      }
      .elfarm-pos-label {
        display: block;
        margin-bottom: 7px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.58);
      }
      .elfarm-pos-input-wrap {
        position: relative;
      }
      .elfarm-pos-icon-left {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(255, 255, 255, 0.42);
        pointer-events: none;
        display: flex;
      }
      .elfarm-pos-input {
        width: 100%;
        height: 54px;
        padding: 0 46px 0 44px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.34);
        color: #ffffff;
        font-size: 15px;
        font-weight: 600;
        outline: none;
        box-sizing: border-box;
        transition: border-color 0.18s ease, box-shadow 0.18s ease;
      }
      .elfarm-pos-input::placeholder {
        color: rgba(255, 255, 255, 0.32);
        font-weight: 500;
      }
      .elfarm-pos-input:focus {
        border-color: rgba(251, 146, 60, 0.72);
        box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.15);
      }
      .elfarm-pos-eye {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 38px;
        height: 38px;
        border-radius: 12px;
        border: 0;
        background: transparent;
        color: rgba(255, 255, 255, 0.48);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .elfarm-pos-eye:hover {
        background: rgba(255, 255, 255, 0.09);
        color: #ffffff;
      }
      .elfarm-pos-roles {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .elfarm-pos-role-btn {
        display: flex;
        align-items: center;
        gap: 11px;
        height: 64px;
        padding: 0 14px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.04);
        color: rgba(255, 255, 255, 0.68);
        text-align: left;
        cursor: pointer;
        transition: all 0.16s ease;
      }
      .elfarm-pos-role-btn:hover {
        background: rgba(255, 255, 255, 0.08);
      }
      .elfarm-pos-role-btn.is-cashier {
        border-color: rgba(251, 146, 60, 0.65);
        background: linear-gradient(180deg, rgba(249, 115, 22, 0.25) 0%, rgba(234, 88, 12, 0.15) 100%);
        color: #ffffff;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 10px 24px -10px rgba(255, 106, 43, 0.65);
      }
      .elfarm-pos-role-btn.is-admin {
        border-color: rgba(52, 211, 153, 0.65);
        background: linear-gradient(180deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.15) 100%);
        color: #ffffff;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 10px 24px -10px rgba(23, 194, 122, 0.65);
      }
      .elfarm-pos-radio {
        width: 22px;
        height: 22px;
        border-radius: 999px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .elfarm-pos-role-btn.is-cashier .elfarm-pos-radio {
        border-color: #fb923c;
        background: #f97316;
      }
      .elfarm-pos-role-btn.is-admin .elfarm-pos-radio {
        border-color: #34d399;
        background: #10b981;
      }
      .elfarm-pos-radio-dot {
        width: 9px;
        height: 9px;
        border-radius: 999px;
        background: #ffffff;
        opacity: 0;
      }
      .elfarm-pos-role-btn.is-cashier .elfarm-pos-radio-dot,
      .elfarm-pos-role-btn.is-admin .elfarm-pos-radio-dot {
        opacity: 1;
      }
      .elfarm-pos-role-name {
        display: block;
        font-size: 14px;
        font-weight: 800;
        line-height: 1.2;
      }
      .elfarm-pos-role-desc {
        display: block;
        margin-top: 2px;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.52);
      }
      .elfarm-pos-error {
        display: none;
        align-items: flex-start;
        gap: 8px;
        margin-top: 14px;
        padding: 11px 14px;
        border-radius: 16px;
        border: 1px solid rgba(248, 113, 113, 0.38);
        background: rgba(239, 68, 68, 0.16);
        color: #fecaca;
        font-size: 12px;
        font-weight: 600;
        line-height: 1.4;
      }
      .elfarm-pos-error.is-visible {
        display: flex;
      }
      .elfarm-pos-submit {
        margin-top: 16px;
        width: 100%;
        height: 60px;
        border-radius: 16px;
        border: 0;
        background: linear-gradient(180deg, #5cf0a8 0%, #17c27a 100%);
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.45),
          0 14px 30px -12px rgba(23, 194, 122, 0.8);
        color: #04130b;
        font-size: 17px;
        font-weight: 800;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        cursor: pointer;
        transition: filter 0.15s ease, transform 0.12s ease;
      }
      .elfarm-pos-submit:hover {
        filter: brightness(1.06);
      }
      .elfarm-pos-submit:active {
        transform: scale(0.985);
      }
      .elfarm-pos-submit:disabled {
        opacity: 0.55;
        cursor: wait;
      }
      .elfarm-pos-foot {
        margin-top: 18px;
        padding-top: 14px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        text-align: center;
        font-size: 12px;
        line-height: 1.45;
        color: rgba(255, 255, 255, 0.5);
      }
    `;
    document.head.appendChild(style);
  }

  let selectedRole: Role = initialRole;
  let showPassword = false;
  let isSubmitting = false;

  const STAFF_ICON_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="10" r="2.5"/><path d="M8.5 16a4.5 4.5 0 0 1 7 0"/></svg>';

  async function lockPublicSitePosSession() {
    try {
      Object.keys(window.localStorage).forEach((k) => {
        if (k.startsWith('sb-') && k.endsWith('-auth-token')) {
          window.localStorage.removeItem(k);
        }
      });
      Object.keys(window.sessionStorage).forEach((k) => {
        if (k.startsWith('sb-') && k.endsWith('-auth-token')) {
          window.sessionStorage.removeItem(k);
        }
      });
      await supabase.auth.signOut({ scope: 'local' });
    } catch {
      // ignore storage errors
    }
  }

  function openLoginModal(preferredRole?: Role) {
    ensureModalDom();
    void lockPublicSitePosSession();
    if (preferredRole) {
      selectedRole = preferredRole;
      syncRoleUi();
    }
    const idInput = document.getElementById('elfarm-pos-identifier') as HTMLInputElement | null;
    const pwInput = document.getElementById('elfarm-pos-password') as HTMLInputElement | null;
    if (idInput) idInput.value = '';
    if (pwInput) {
      pwInput.value = '';
      pwInput.type = 'password';
    }
    showPassword = false;
    showError('');
    const modal = document.getElementById('elfarm-pos-login-modal');
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      idInput?.focus();
    }, 60);
  }

  function closeLoginModal() {
    const modal = document.getElementById('elfarm-pos-login-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (window.location.search.includes('posLogin=')) {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, '', cleanUrl);
    }
  }

  function syncRoleUi() {
    const cashierBtn = document.getElementById('elfarm-pos-role-cashier');
    const adminBtn = document.getElementById('elfarm-pos-role-admin');
    const submitLabel = document.getElementById('elfarm-pos-submit-label');
    const footNote = document.getElementById('elfarm-pos-foot-note');

    if (cashierBtn) {
      cashierBtn.classList.toggle('is-cashier', selectedRole === 'cashier');
    }
    if (adminBtn) {
      adminBtn.classList.toggle('is-admin', selectedRole === 'admin');
    }
    if (submitLabel && !isSubmitting) {
      submitLabel.textContent =
        selectedRole === 'cashier' ? 'Sign In & Clock In Shift' : 'Sign In as Admin';
    }
    if (footNote) {
      footNote.textContent =
        selectedRole === 'cashier'
          ? 'Cashier login automatically records your Time-In shift in attendance logs.'
          : 'Admin manages Sales Calendar, Menu Stock, Employees & BARMM-05 Payroll.';
    }
  }

  function showError(msg: string) {
    const errBox = document.getElementById('elfarm-pos-error');
    const errText = document.getElementById('elfarm-pos-error-text');
    if (!errBox || !errText) return;
    if (!msg) {
      errBox.classList.remove('is-visible');
      errText.textContent = '';
    } else {
      errText.textContent = msg;
      errBox.classList.add('is-visible');
    }
  }

  async function handleFormSubmit(e: Event) {
    e.preventDefault();
    if (isSubmitting) return;

    const idInput = document.getElementById('elfarm-pos-identifier') as HTMLInputElement | null;
    const pwInput = document.getElementById('elfarm-pos-password') as HTMLInputElement | null;
    const submitBtn = document.getElementById('elfarm-pos-submit') as HTMLButtonElement | null;
    const submitLabel = document.getElementById('elfarm-pos-submit-label');

    const cleaned = (idInput?.value || '').trim();
    const password = pwInput?.value || '';

    if (!cleaned || !password) {
      showError('Please enter both username/email and password.');
      return;
    }

    isSubmitting = true;
    showError('');
    if (submitBtn) submitBtn.disabled = true;
    if (submitLabel) submitLabel.textContent = 'Signing In...';

    try {
      let emailToSignIn = cleaned.includes('@') ? cleaned.toLowerCase() : '';
      const { data: resolved } = await supabase.rpc('resolve_login_profile', {
        p_identifier: cleaned,
      });

      if (resolved) {
        if (!resolved.is_active) {
          throw new Error('This staff account is deactivated. Please contact your Administrator.');
        }
        if (resolved.role !== selectedRole) {
          const correctLabel = resolved.role === 'admin' ? 'Admin' : 'Cashier';
          selectedRole = resolved.role === 'admin' ? 'admin' : 'cashier';
          syncRoleUi();
          throw new Error(
            `Account "${resolved.username}" is registered as ${correctLabel}. Switched role to ${correctLabel} — click Sign In again.`
          );
        }
        emailToSignIn = resolved.email;
      } else if (!cleaned.includes('@')) {
        throw new Error('Account not found. Check your username or enter your registered email.');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailToSignIn,
        password,
      });

      if (error || !data.user) {
        throw new Error(error?.message || 'Invalid credentials.');
      }

      const { data: prof, error: profErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profErr || !prof) {
        await supabase.auth.signOut();
        throw new Error('Staff profile record not found in Supabase.');
      }
      if (!prof.is_active) {
        await supabase.auth.signOut();
        throw new Error('This staff account has been deactivated.');
      }

      if (prof.role === 'cashier') {
        const today = dayKey(Date.now());
        const { data: existingOpen } = await supabase
          .from('attendance_logs')
          .select('id')
          .eq('cashier_id', prof.id)
          .eq('shift_date', today)
          .is('logout_time', null)
          .limit(1)
          .maybeSingle();

        if (!existingOpen) {
          await supabase.from('attendance_logs').insert({
            cashier_id: prof.id,
            shift_date: today,
            login_time: new Date().toISOString(),
          });
        }
      }

      const destination = prof.role === 'admin' ? '/pos/admin' : '/pos/cashier';
      window.location.assign(destination);
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Unable to sign in.');
      isSubmitting = false;
      if (submitBtn) submitBtn.disabled = false;
      syncRoleUi();
    }
  }

  function ensureModalDom() {
    ensureWidgetStyles();
    if (document.getElementById('elfarm-pos-login-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'elfarm-pos-login-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'EL Farm Cafe Staff & Admin Sign-In');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
      <div class="elfarm-pos-card">
        <button type="button" class="elfarm-pos-close" id="elfarm-pos-close-btn" aria-label="Close login modal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <div class="elfarm-pos-head">
          <div class="elfarm-pos-logo">
            <img src="/assets/images/el-farm-logo.jpg" alt="EL Farm Cafe" />
          </div>
          <div>
            <span class="elfarm-pos-badge">CLOUD SUPABASE POS</span>
            <h2 class="elfarm-pos-title" id="elfarm-pos-store-name">${FALLBACK_STORE_SETTINGS.store_name}</h2>
            <p class="elfarm-pos-sub"><span id="elfarm-pos-store-addr">${FALLBACK_STORE_SETTINGS.address}</span> · Staff Sign-In</p>
          </div>
        </div>

        <form id="elfarm-pos-login-form" autocomplete="off">
          <div class="elfarm-pos-field">
            <label class="elfarm-pos-label" for="elfarm-pos-identifier">USERNAME OR EMAIL</label>
            <div class="elfarm-pos-input-wrap">
              <span class="elfarm-pos-icon-left">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z"/></svg>
              </span>
              <input
                id="elfarm-pos-identifier"
                class="elfarm-pos-input"
                type="text"
                autocomplete="username"
                placeholder="Enter username or email"
                required
              />
            </div>
          </div>

          <div class="elfarm-pos-field">
            <label class="elfarm-pos-label" for="elfarm-pos-password">PASSWORD</label>
            <div class="elfarm-pos-input-wrap">
              <span class="elfarm-pos-icon-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
              </span>
              <input
                id="elfarm-pos-password"
                class="elfarm-pos-input"
                type="password"
                autocomplete="current-password"
                placeholder="Enter password"
                required
              />
              <button type="button" class="elfarm-pos-eye" id="elfarm-pos-eye-btn" aria-label="Show password">
                <svg id="elfarm-pos-eye-svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
              </button>
            </div>
          </div>

          <div class="elfarm-pos-field" style="margin-bottom: 0;">
            <span class="elfarm-pos-label">ROLE</span>
            <div class="elfarm-pos-roles">
              <button type="button" class="elfarm-pos-role-btn" id="elfarm-pos-role-cashier">
                <span class="elfarm-pos-radio"><span class="elfarm-pos-radio-dot"></span></span>
                <span>
                  <span class="elfarm-pos-role-name">Cashier</span>
                  <span class="elfarm-pos-role-desc">Time-In &amp; POS</span>
                </span>
              </button>
              <button type="button" class="elfarm-pos-role-btn" id="elfarm-pos-role-admin">
                <span class="elfarm-pos-radio"><span class="elfarm-pos-radio-dot"></span></span>
                <span>
                  <span class="elfarm-pos-role-name">Admin</span>
                  <span class="elfarm-pos-role-desc">Sales &amp; Payroll</span>
                </span>
              </button>
            </div>
          </div>

          <div class="elfarm-pos-error" id="elfarm-pos-error">
            <span>⚠</span>
            <span id="elfarm-pos-error-text"></span>
          </div>

          <button type="submit" class="elfarm-pos-submit" id="elfarm-pos-submit">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            <span id="elfarm-pos-submit-label">Sign In &amp; Clock In Shift</span>
          </button>
        </form>

        <div class="elfarm-pos-foot" id="elfarm-pos-foot-note">
          Cashier login automatically records your Time-In shift in attendance logs.
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('pointerdown', (e) => {
      if (e.target === modal) closeLoginModal();
    });

    document.getElementById('elfarm-pos-close-btn')?.addEventListener('click', closeLoginModal);

    document.getElementById('elfarm-pos-role-cashier')?.addEventListener('click', () => {
      selectedRole = 'cashier';
      showError('');
      syncRoleUi();
    });

    document.getElementById('elfarm-pos-role-admin')?.addEventListener('click', () => {
      selectedRole = 'admin';
      showError('');
      syncRoleUi();
    });

    document.getElementById('elfarm-pos-eye-btn')?.addEventListener('click', () => {
      showPassword = !showPassword;
      const pw = document.getElementById('elfarm-pos-password') as HTMLInputElement | null;
      if (pw) pw.type = showPassword ? 'text' : 'password';
    });

    document.getElementById('elfarm-pos-identifier')?.addEventListener('input', () => showError(''));
    document.getElementById('elfarm-pos-password')?.addEventListener('input', () => showError(''));
    document.getElementById('elfarm-pos-login-form')?.addEventListener('submit', (e) => {
      void handleFormSubmit(e);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeLoginModal();
      }
    });

    syncRoleUi();

    // Sync live store name/address from Supabase store_settings quietly
    void supabase
      .from('store_settings')
      .select('store_name, address')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        const nameEl = document.getElementById('elfarm-pos-store-name');
        const addrEl = document.getElementById('elfarm-pos-store-addr');
        if (nameEl && data.store_name) nameEl.textContent = data.store_name;
        if (addrEl && data.address) addrEl.textContent = data.address;
      });
  }

  function mountHeaderButtons() {
    ensureWidgetStyles();

    // 1. Desktop Top-Right Header Button (directly beside VIEW MENU; reuse SSR button if already present)
    const headerBtnSlot = document.querySelector(
      'header [data-framer-name="Header Button"], header .framer-1g6xkw5'
    );
    const existingHeaderBtn = document.getElementById('elfarm-pos-header-btn') as HTMLButtonElement | null;
    if (existingHeaderBtn) {
      if (existingHeaderBtn.dataset.elfarmBound !== '1') {
        existingHeaderBtn.dataset.elfarmBound = '1';
        existingHeaderBtn.removeAttribute('onclick');
        existingHeaderBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openLoginModal();
        });
      }
    } else if (headerBtnSlot) {
      const btn = document.createElement('button');
      btn.id = 'elfarm-pos-header-btn';
      btn.type = 'button';
      btn.dataset.elfarmBound = '1';
      btn.setAttribute('aria-label', 'Administrator & Staff POS Login');
      btn.title = 'EL Farm Cafe — Staff & Admin POS Login';
      btn.innerHTML = `${STAFF_ICON_SVG}<span>POS Login</span>`;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLoginModal();
      });
      headerBtnSlot.appendChild(btn);
    }

    // 2. Mobile/Tablet Sidebar Drawer Link (Clean top header shows only logo & hamburger)
    const staleMobBtn = document.getElementById('elfarm-pos-mobile-btn');
    if (staleMobBtn) staleMobBtn.remove();

    const drawerNav = document.querySelector('#elfarm-mobile-nav-drawer .elfarm-mnav-links');
    if (drawerNav && !drawerNav.querySelector('#elfarm-mnav-pos-link')) {
      const linkBtn = document.createElement('button');
      linkBtn.id = 'elfarm-mnav-pos-link';
      linkBtn.type = 'button';
      linkBtn.className = 'elfarm-mnav-link';
      linkBtn.style.cssText =
        '--mnav-idx:6;width:100%;background:transparent;border:0;text-align:left;justify-content:flex-start;cursor:pointer;color:rgba(245,245,245,0.94);font-family:inherit;font-size:inherit;font-weight:inherit;letter-spacing:inherit;';
      linkBtn.textContent = 'POS Login';
      linkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const drawer = document.getElementById('elfarm-mobile-nav-drawer');
        const backdrop = document.getElementById('elfarm-mobile-nav-backdrop');
        const burger = document.getElementById('elfarm-mobile-burger-btn');
        drawer?.classList.remove('is-open');
        backdrop?.classList.remove('is-open');
        burger?.classList.remove('is-open');
        openLoginModal();
      });
      drawerNav.appendChild(linkBtn);
    }
  }

  function boot() {
    void lockPublicSitePosSession();
    ensureModalDom();
    mountHeaderButtons();

    if (autoOpenLogin) {
      const introOverlay = document.getElementById('elfarm-intro-overlay');
      if (introOverlay) introOverlay.remove();
      openLoginModal(initialRole);
    }

    let timer: ReturnType<typeof setTimeout> | null = null;
    const obs = new MutationObserver(() => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(mountHeaderButtons, 80);
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  (window as unknown as { openElFarmPosLogin?: (role?: Role) => void }).openElFarmPosLogin =
    openLoginModal;
})();
