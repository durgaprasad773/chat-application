/* NeuraScaleX attribution + events  |  askdeepak.neurascalex.com
 * ---------------------------------------------------------------------------
 * WHAT THIS DOES
 *  1. Captures how the visitor arrived (utm_*, gclid/fbclid, or referrer).
 *  2. Stores first-touch for 90 days and last-touch for the session.
 *  3. Appends the ORIGINAL source to every outbound booking link as ask_*
 *     parameters, WITHOUT disturbing the existing utm_source=askdeepak that
 *     BigBoost / GoHighLevel already reads. Both attributions survive.
 *  4. Issues a session id (nsx_sid) carried into the booking URL, so a GA4
 *     session can later be joined to a booking record.
 *  5. Sends GA4 events for the things that matter: CTA clicks, which condition
 *     sections get read, ask-widget opens, scroll depth, outbound clicks.
 *  6. Honours Consent Mode v2 - nothing is stored until the visitor accepts.
 *
 * EXPOSED FOR THE ASK WIDGET
 *   window.nsxTrack('question_asked',  { question_intent: 'insurance' });
 *   window.nsxTrack('lead_captured',   { route: 'book_discovery_call' });
 * --------------------------------------------------------------------------- */
(function () {
  'use strict';

  var FIRST_KEY = 'nsx_first_touch';
  var LAST_KEY  = 'nsx_last_touch';
  var SID_KEY   = 'nsx_sid';
  var CONSENT   = 'nsx_consent';
  var MAX_AGE   = 90 * 24 * 60 * 60 * 1000;       // 90 days
  var BOOKING   = 'go.berkshirepainclinic.co.uk';

  function store(type) { try { return window[type]; } catch (e) { return null; } }
  function readJSON(s, k) { try { return s && JSON.parse(s.getItem(k) || 'null'); } catch (e) { return null; } }
  function writeJSON(s, k, v) { try { s && s.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var LS = store('localStorage');
  var SS = store('sessionStorage');

  /* ------------------------------------------------ 1. where did they come from */
  function captureTouch() {
    var q = new URLSearchParams(location.search);
    var t = {}, any = false;
    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term',
     'gclid','fbclid','msclkid','ttclid'].forEach(function (k) {
      var v = q.get(k);
      if (v) { t[k] = v.slice(0, 120); any = true; }
    });

    if (!any && document.referrer) {
      try {
        var host = new URL(document.referrer).hostname.replace(/^www\./, '');
        if (host && host !== location.hostname) {
          t.utm_source = host;
          t.utm_medium = /youtube|youtu\.be/.test(host) ? 'youtube-organic'
                       : /google|bing|duckduckgo|ecosia/.test(host) ? 'organic'
                       : /chatgpt|perplexity|claude|copilot|gemini/.test(host) ? 'ai-referral'
                       : 'referral';
          any = true;
        }
      } catch (e) {}
    }
    if (!any) { t.utm_source = 'direct'; t.utm_medium = 'none'; }
    t.ts = Date.now();
    t.landing = location.pathname + location.hash;
    return t;
  }

  var last = captureTouch();
  writeJSON(SS, LAST_KEY, last);

  var first = readJSON(LS, FIRST_KEY);
  if (!first || !first.ts || (Date.now() - first.ts) > MAX_AGE) {
    first = last;
    writeJSON(LS, FIRST_KEY, first);
  }

  /* ------------------------------------------------------- 2. session identifier */
  var sid = null;
  try { sid = SS && SS.getItem(SID_KEY); } catch (e) {}
  if (!sid) {
    sid = 'ad-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    try { SS && SS.setItem(SID_KEY, sid); } catch (e) {}
  }

  /* ---------------------------------------------------------------- 3. consent */
  function consentState() { try { return LS && LS.getItem(CONSENT); } catch (e) { return null; } }

  function grant() {
    if (typeof gtag !== 'function') return;
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',          // no advertising cookies on a clinical page
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    loadClarity();
  }

  function loadClarity() {
    if (!window.NSX_CLARITY_ID || window.clarity) return;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', window.NSX_CLARITY_ID);
    // Clarity only drops its cookie once consent is signalled. We reach here
    // solely after the visitor accepted, so signal it immediately.
    try {
      window.clarity('consent');
      window.clarity('set', 'first_touch_source', first.utm_source || 'direct');
      window.clarity('set', 'nsx_sid', sid);
    } catch (e) {}
  }

  function banner(show) {
    var el = document.getElementById('nsx-consent');
    if (el) el.classList[show ? 'add' : 'remove']('show');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var state = consentState();
    if (state === 'granted') { grant(); }
    else if (state !== 'denied') { banner(true); }

    var a = document.getElementById('nsx-accept');
    var r = document.getElementById('nsx-reject');
    a && a.addEventListener('click', function () {
      try { LS && LS.setItem(CONSENT, 'granted'); } catch (e) {}
      grant(); banner(false); track('consent_granted', {});
    });
    r && r.addEventListener('click', function () {
      try { LS && LS.setItem(CONSENT, 'denied'); } catch (e) {}
      banner(false);
    });
  });

  /* ------------------------------------------------------------- 4. GA4 events */
  function track(name, params) {
    params = params || {};
    params.nsx_sid           = sid;
    params.first_touch_source = first.utm_source || '';
    params.first_touch_medium = first.utm_medium || '';
    params.last_touch_source  = last.utm_source  || '';
    params.last_touch_medium  = last.utm_medium  || '';
    params.last_touch_content = last.utm_content || '';
    if (typeof gtag === 'function') gtag('event', name, params);
    if (window.clarity) { try { window.clarity('set', name, String(params.cta_label || params.section || '1')); } catch (e) {} }
  }
  window.nsxTrack = track;

  /* User-scoped attribution. Register these in GA4 as USER-scoped custom
     dimensions so they can be used as a breakdown on any report. */
  if (typeof gtag === 'function') {
    gtag('set', 'user_properties', {
      first_touch_source: first.utm_source || '',
      first_touch_medium: first.utm_medium || '',
      first_touch_campaign: first.utm_campaign || '',
      last_touch_source: last.utm_source || '',
      last_touch_medium: last.utm_medium || ''
    });
  }

  /* One event per session carrying the full arrival picture. */
  track('nsx_attribution', {
    landing_section: location.hash || '(none)',
    landing_path: location.pathname
  });

  /* -------------------------------- 5. carry the real source into the booking URL */
  function decorate(url) {
    try {
      var u = new URL(url, location.href);
      if (u.hostname.indexOf(BOOKING) === -1) return url;
      // Keep utm_source=askdeepak intact for BigBoost. Add the upstream chain.
      u.searchParams.set('ask_src', first.utm_source || '');
      u.searchParams.set('ask_med', first.utm_medium || '');
      if (first.utm_campaign) u.searchParams.set('ask_cmp', first.utm_campaign);
      if (first.utm_content)  u.searchParams.set('ask_cnt', first.utm_content);
      if (last.gclid)  u.searchParams.set('gclid', last.gclid);
      if (last.fbclid) u.searchParams.set('fbclid', last.fbclid);
      u.searchParams.set('ask_sid', sid);
      return u.toString();
    } catch (e) { return url; }
  }

  function label(el) {
    var t = (el.textContent || '').trim().replace(/\s+/g, ' ');
    return t.slice(0, 60) || 'unlabelled';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('a[href]');
    Array.prototype.forEach.call(links, function (el) {
      var href = el.getAttribute('href') || '';

      if (href.indexOf(BOOKING) !== -1) {
        el.setAttribute('href', decorate(href));
        el.addEventListener('click', function () {
          var u = new URL(el.href);
          track('cta_click', {
            cta_label: label(el),
            cta_location: u.searchParams.get('utm_content') || 'unknown',
            cta_type: /apply/.test(href) ? 'discovery_call'
                    : /membership/.test(href) ? 'membership'
                    : /guide/.test(href) ? 'guide' : 'other',
            destination: u.hostname + u.pathname
          });
        });
        return;
      }

      if (href.charAt(0) === '#') {
        el.addEventListener('click', function () {
          if (href === '#ask') track('ask_widget_open', { cta_label: label(el) });
          else track('anchor_click', { section: href.slice(1), cta_label: label(el) });
        });
        return;
      }

      if (/^https?:/.test(href) && href.indexOf(location.hostname) === -1) {
        el.addEventListener('click', function () {
          try { track('outbound_click', { destination: new URL(el.href).hostname, cta_label: label(el) }); } catch (e) {}
        });
      }
    });

    /* ---------------- which condition sections actually get read --------------- */
    if ('IntersectionObserver' in window) {
      var seen = {};
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var id = e.target.id;
          if (!id || seen[id]) return;
          seen[id] = 1;
          track('section_view', { section: id });
        });
      }, { threshold: 0.4 });
      Array.prototype.forEach.call(document.querySelectorAll('section[id]'), function (s) { io.observe(s); });
    }

    /* ------------------------------------------- scroll depth, once per threshold */
    var hits = {};
    window.addEventListener('scroll', function () {
      var doc = document.documentElement;
      var h = doc.scrollHeight - doc.clientHeight;
      if (h <= 0) return;
      var pct = Math.round((doc.scrollTop / h) * 100);
      [25, 50, 75, 90].forEach(function (mark) {
        if (pct >= mark && !hits[mark]) { hits[mark] = 1; track('scroll_depth', { percent: mark }); }
      });
    }, { passive: true });
  });
})();
