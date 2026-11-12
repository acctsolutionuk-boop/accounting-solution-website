/* Accounting Solution - cookie choice and consent-gated Google Analytics.
   GA4 only loads after "Accept". Choice is stored in this browser (localStorage). */
(function () {
  var KEY = 'as_cookie_choice';
  var ID = window.asGA;
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadGA() {
    if (!ID || window.asGALoaded) return;
    window.asGALoaded = true;
    window['ga-disable-' + ID] = false;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', ID);
  }

  function clearGA() {
    if (ID) window['ga-disable-' + ID] = true;
    var host = location.hostname, parts = host.split('.'), domains = [host, '.' + host];
    if (parts.length >= 2) domains.push('.' + parts.slice(-2).join('.'));
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (n.indexOf('_ga') === 0) {
        domains.forEach(function (d) {
          document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + d;
        });
        document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      }
    });
  }

  function css() {
    if (document.getElementById('as-cc-css')) return;
    var st = document.createElement('style');
    st.id = 'as-cc-css';
    st.textContent =
      '#as-cc{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#212121;color:#F5F0E8;' +
      'border-top:2px solid #C9973A;padding:16px 5vw;display:flex;gap:14px 24px;align-items:center;' +
      'justify-content:space-between;flex-wrap:wrap;font-family:"IBM Plex Mono",monospace;' +
      'font-size:13px;line-height:1.6;box-shadow:0 -6px 24px rgba(0,0,0,.25)}' +
      '#as-cc p{margin:0;max-width:760px}' +
      '#as-cc a{color:#C9973A;text-decoration:underline}' +
      '#as-cc .as-cc-b{display:flex;gap:12px;flex-shrink:0}' +
      '#as-cc button{font:inherit;font-weight:600;cursor:pointer;border-radius:4px;padding:10px 22px;' +
      'border:1.5px solid #C9973A;min-width:104px}' +
      '#as-cc .as-ok{background:#C9973A;color:#212121}' +
      '#as-cc .as-no{background:transparent;color:#F5F0E8}' +
      '#as-cc button:focus-visible{outline:2px solid #fff;outline-offset:2px}' +
      '@media(max-width:600px){#as-cc .as-cc-b{width:100%}#as-cc button{flex:1}}';
    document.head.appendChild(st);
  }

  function hide() {
    var b = document.getElementById('as-cc');
    if (b) b.parentNode.removeChild(b);
  }

  function show() {
    if (document.getElementById('as-cc')) return;
    css();
    var b = document.createElement('div');
    b.id = 'as-cc';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Cookie choice');
    b.innerHTML =
      '<p>We use Google Analytics cookies to see which pages are useful. They stay off unless you accept. ' +
      'See our <a href="/privacy/#cookies">privacy policy</a>.</p>' +
      '<div class="as-cc-b"><button type="button" class="as-no">Reject</button>' +
      '<button type="button" class="as-ok">Accept</button></div>';
    b.querySelector('.as-ok').addEventListener('click', function () { set('granted'); hide(); loadGA(); });
    b.querySelector('.as-no').addEventListener('click', function () { set('denied'); hide(); clearGA(); });
    document.body.appendChild(b);
  }

  function footerLink() {
    var t = document.querySelector('footer a[href="/terms/"]');
    if (!t || document.getElementById('as-cc-open')) return;
    var a = document.createElement('a');
    a.id = 'as-cc-open';
    a.href = '#cookie-settings';
    a.textContent = 'Cookie settings';
    a.addEventListener('click', function (e) { e.preventDefault(); show(); });
    t.parentNode.insertBefore(a, t.nextSibling);
  }

  /* Enquiry tracking. Sends events only after the visitor has accepted analytics cookies. */
  function ev(name, params) {
    if (get() !== 'granted' || typeof window.gtag !== 'function') return;
    params = params || {};
    params.transport_type = 'beacon';
    window.gtag('event', name, params);
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    var p = { link_url: h.split('?')[0], page_path: location.pathname };
    if (h.indexOf('tel:') === 0) ev('phone_click', p);
    else if (h.indexOf('mailto:') === 0) ev('email_click', p);
    else if (h.indexOf('wa.me') > -1 || h.indexOf('whatsapp.com') > -1) ev('whatsapp_click', p);
    else if (h.indexOf('calendar.google.com') > -1 && h.indexOf('appointments') > -1) ev('booking_click', p);
  }, true);
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || f.tagName !== 'FORM') return;
    var n = f.getAttribute('name') || f.id || 'form';
    var p = { form_name: n, page_path: location.pathname };
    if (n === 'contact' || n === 'tax-investigation-contact') ev('generate_lead', p);
    else if (n === 'newsletter') ev('newsletter_signup', p);
    else if (n === 'home-allowance-calculator') ev('calculator_use', p);
  }, true);

  function init() {
    var c = get();
    if (c === 'granted') loadGA();
    else if (c !== 'denied') show();
    footerLink();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
