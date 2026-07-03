/* ============================================================
  rasayanav — Contact Form Handler (contact.js)
   Full EmailJS Integration + Advanced Validation
   ============================================================

   SETUP INSTRUCTIONS:
   ───────────────────
   1. Create a FREE account at https://www.emailjs.com
   2. Click "Email Services" → "Add New Service" → choose Gmail / Outlook
   3. Click "Email Templates" → "Create New Template"
      Use these template variables:
        Subject:  New Enquiry from {{from_name}} — rasayanav Website
        Body:
          Name:     {{from_name}}
          Company:  {{company}}
          Email:    {{from_email}}
          Phone:    {{phone}}
          Service:  {{service}}
          Budget:   {{budget}}
          Message:  {{message}}
   4. Go to "Account" → copy your Public Key
   5. Replace the 3 values below with your real credentials

   ============================================================ */

// ─── REPLACE THESE THREE VALUES ───────────────────────────────
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'xK92bP_aMnZ3rTu1v'
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
// ──────────────────────────────────────────────────────────────

// Flag: set to true once you add real credentials
const EMAILJS_CONFIGURED = (
  EMAILJS_PUBLIC_KEY  !== 'YOUR_PUBLIC_KEY' &&
  EMAILJS_SERVICE_ID  !== 'YOUR_SERVICE_ID' &&
  EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID'
);

/* ============================================================
   INITIALISE EmailJS (only if configured)
   ============================================================ */
if (EMAILJS_CONFIGURED && typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

/* ============================================================
   FORM VALIDATION RULES
   ============================================================ */
const validators = {
  name(val) {
    if (!val.trim()) return 'Please enter your full name.';
    if (val.trim().length < 2) return 'Name must be at least 2 characters.';
    if (!/^[a-zA-Z\u0600-\u06FF\s'-]+$/.test(val.trim())) return 'Please enter a valid name.';
    return null;
  },
  email(val) {
    if (!val.trim()) return 'Please enter your email address.';
    const re = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!re.test(val.trim())) return 'Please enter a valid email address.';
    return null;
  },
  phone(val) {
    if (!val.trim()) return 'Please enter your phone number.';
    const clean = val.replace(/[\s\-()]/g, '');
    if (!/^\+?[0-9]{7,15}$/.test(clean)) return 'Please enter a valid phone number.';
    return null;
  },
  service(val) {
    if (!val) return 'Please select a service.';
    return null;
  },
  message(val) {
    if (!val.trim()) return 'Please describe your project or enquiry.';
    if (val.trim().length < 20) return 'Please provide at least 20 characters of detail.';
    return null;
  },
  consent(checked) {
    if (!checked) return 'Please accept the privacy policy to continue.';
    return null;
  }
};

/* ============================================================
   HELPER — show / clear field error
   ============================================================ */
function setFieldState(fieldId, errorMsg) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  const group = field.closest('.form-group');
  const errorEl = document.getElementById(`${fieldId}-error`);

  if (!group) return;
  group.classList.remove('error', 'success');

  if (errorMsg) {
    group.classList.add('error');
    if (errorEl) errorEl.textContent = errorMsg;
  } else {
    group.classList.add('success');
    if (errorEl) errorEl.textContent = '';
  }
}

function clearFieldState(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  const group = field.closest('.form-group');
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (group) group.classList.remove('error', 'success');
  if (errorEl) errorEl.textContent = '';
}

/* ============================================================
   VALIDATE ENTIRE FORM — returns { valid, data }
   ============================================================ */
function validateForm() {
  let valid = true;
  const data = {};

  // Name
  const name = document.getElementById('name')?.value || '';
  const nameErr = validators.name(name);
  setFieldState('name', nameErr);
  if (nameErr) valid = false;
  else data.from_name = name.trim();

  // Email
  const email = document.getElementById('email')?.value || '';
  const emailErr = validators.email(email);
  setFieldState('email', emailErr);
  if (emailErr) valid = false;
  else data.from_email = email.trim();

  // Phone
  const phone = document.getElementById('phone')?.value || '';
  const phoneErr = validators.phone(phone);
  setFieldState('phone', phoneErr);
  if (phoneErr) valid = false;
  else data.phone = phone.trim();

  // Service
  const service = document.getElementById('service')?.value || '';
  const serviceErr = validators.service(service);
  setFieldState('service', serviceErr);
  if (serviceErr) valid = false;
  else data.service = service;

  // Message
  const message = document.getElementById('message')?.value || '';
  const messageErr = validators.message(message);
  setFieldState('message', messageErr);
  if (messageErr) valid = false;
  else data.message = message.trim();

  // Optional fields
  data.company = document.getElementById('company')?.value?.trim() || 'Not provided';
  data.budget  = document.getElementById('budget')?.value  || 'Not specified';

  // Consent
  const consent = document.getElementById('consent')?.checked || false;
  const consentErr = validators.consent(consent);
  const consentGroup = document.getElementById('consent')?.closest('.form-group');
  const consentError = document.getElementById('consent-error');
  if (consentGroup) consentGroup.classList.toggle('error', !!consentErr);
  if (consentError) consentError.textContent = consentErr || '';
  if (consentErr) valid = false;

  return { valid, data };
}

/* ============================================================
   SHOW FORM STATUS MESSAGE
   ============================================================ */
function showFormMessage(type, html) {
  const el = document.getElementById('form-message');
  if (!el) return;
  el.className = `form-message ${type}`;
  el.innerHTML = html;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  if (type === 'success') {
    setTimeout(() => { el.className = 'form-message'; el.innerHTML = ''; }, 8000);
  }
}

/* ============================================================
   BUTTON LOADING STATE
   ============================================================ */
function setSubmitLoading(loading) {
  const btn  = document.getElementById('submit-btn');
  const text = document.getElementById('btn-text');
  const icon = btn?.querySelector('i');
  if (!btn || !text) return;

  btn.disabled = loading;
  if (loading) {
    if (icon) icon.className = 'fas fa-spinner fa-spin';
    text.textContent = 'Sending…';
  } else {
    if (icon) icon.className = 'fas fa-paper-plane';
    text.textContent = 'Send Message';
  }
}

/* ============================================================
   RESET FORM
   ============================================================ */
function resetForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.reset();
  ['name','email','phone','service','message','consent'].forEach(id => clearFieldState(id));
}

/* ============================================================
   SEND VIA EMAILJS
   ============================================================ */
async function sendWithEmailJS(data) {
  if (!EMAILJS_CONFIGURED) {
    throw new Error('EmailJS not configured');
  }
  if (typeof emailjs === 'undefined') {
    throw new Error('EmailJS SDK not loaded. Add <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script> to the <head>.');
  }
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
}

/* ============================================================
   SIMULATE SEND (demo mode — remove when going live)
   ============================================================ */
async function simulateSend(data) {
  // Remove this function and its call once EmailJS is configured
  await new Promise(r => setTimeout(r, 1800));
  console.log('[DEMO] Form data that would be sent via EmailJS:', data);
}

/* ============================================================
   MAIN SUBMIT HANDLER
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Real-time validation on blur
  ['name', 'email', 'phone'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('blur', () => {
      const err = validators[id]?.(el.value);
      setFieldState(id, err);
    });
    el?.addEventListener('input', () => {
      if (el.closest('.form-group')?.classList.contains('error')) {
        const err = validators[id]?.(el.value);
        setFieldState(id, err);
      }
    });
  });

  document.getElementById('service')?.addEventListener('change', e => {
    const err = validators.service(e.target.value);
    setFieldState('service', err);
  });

  document.getElementById('message')?.addEventListener('input', e => {
    const group = e.target.closest('.form-group');
    if (group?.classList.contains('error')) {
      const err = validators.message(e.target.value);
      setFieldState('message', err);
    }
    // Character counter hint
    const remaining = e.target.value.length;
    // Optional: add a char counter UI here
  });

  // SUBMIT
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const { valid, data } = validateForm();
    if (!valid) {
      // Scroll to first error
      const firstError = form.querySelector('.form-group.error');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitLoading(true);

    try {
      if (EMAILJS_CONFIGURED) {
        await sendWithEmailJS(data);
      } else {
        // Demo mode — replace with real send when configured
        await simulateSend(data);
      }

      // SUCCESS
      resetForm();
      showFormMessage('success',
        `<i class="fas fa-check-circle" style="font-size:1.1rem;"></i>
         <span>
           <strong>Message sent successfully!</strong><br>
           Thank you, ${escapeHtml(data.from_name)}. A member of our team will contact you at
           <strong>${escapeHtml(data.from_email)}</strong> within one business day.
         </span>`
      );

      // Google Analytics event (if GA is installed)
      if (typeof gtag === 'function') {
        gtag('event', 'form_submit', { event_category: 'contact', event_label: data.service });
      }

    } catch (err) {
      console.error('Form submission error:', err);

      const isDemoMode = !EMAILJS_CONFIGURED;
      showFormMessage('error',
        isDemoMode
          ? `<i class="fas fa-info-circle"></i>
             <span><strong>Demo mode active.</strong> To enable real email sending, add your EmailJS credentials to <code>js/contact.js</code> and uncomment the EmailJS SDK script in <code>contact.html</code>.</span>`
          : `<i class="fas fa-exclamation-circle"></i>
             <span><strong>Something went wrong.</strong> Please try again, or reach us directly at
             <a href="mailto:info@labc.com.sa" style="color:inherit;text-decoration:underline;">info@labc.com.sa</a></span>`
      );
    } finally {
      setSubmitLoading(false);
    }
  });
});

/* ============================================================
   UTILITY — HTML escape to prevent XSS in success message
   ============================================================ */
function escapeHtml(str) {
  const map = { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' };
  return String(str).replace(/[&<>"']/g, m => map[m]);
}
