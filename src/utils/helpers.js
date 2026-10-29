// Markdown parsing utility
export function parseMarkdown(text) {
  if (!text || typeof text !== 'string') return text;

  let html = text;

  // Escape HTML to prevent XSS
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  // Convert markdown to HTML
  // Bold: **text** or __text__
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

  // Italic: *text* or _text_
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');

  // Code: `text`
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');

  // Links: [text](url)
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Paragraph breaks
  html = html.replace(/\n\n+/g, '</p><p>');

  // Line breaks
  html = html.replace(/\n/g, '<br>');

  // Wrap in paragraphs if we have paragraph breaks
  if (html.includes('</p><p>')) {
    html = '<p>' + html + '</p>';
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>\s*<\/p>/g, '');
  }

  // Lists: - item or * item
  html = html.replace(/^[\s]*[-*]\s+(.+)/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Numbered lists: 1. item
  html = html.replace(/^[\s]*\d+\.\s+(.+)/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  return html;
}

// Format time
export function formatTime(timestamp) {
  return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ---------------------------------------------------------------------------
// NeuraScaleX tracking + booking attribution
// window.nsxTrack is provided by /nsx-attribution.js and only sends once consent is given.
// ---------------------------------------------------------------------------
const BOOKING_HOST = 'go.berkshirepainclinic.co.uk';

export function nsxTrack(name, params) {
  if (typeof window !== 'undefined' && window.nsxTrack) window.nsxTrack(name, params);
}

// Coarse topic label only. The visitor's actual text is never sent to analytics.
export function getQuestionIntent(text) {
  const t = (text || '').toLowerCase();
  if (/insur|\bcost|\bfees?\b|price|self-?pay|how much|bupa|axa|aviva|vitality/.test(t)) return 'insurance';
  if (/fibro/.test(t)) return 'fibromyalgia';
  if (/nerve|sciatic|crps|neuropath|regional pain|burning|shooting|pins and needles/.test(t)) return 'nerve-pain';
  if (/covid|post-?viral|viral|\bme\/cfs|fatigue/.test(t)) return 'post-viral';
  if (/painkill|medicat|opioid|tablet|gabapentin|pregabalin|codeine|morphine|tramadol/.test(t)) return 'painkillers';
  if (/back|neck|spine|spinal|\bmri\b|scan|disc\b/.test(t)) return 'back-neck-pain';
  if (/book|appointment|discovery call|consultation|see dr|see deepak/.test(t)) return 'booking';
  return 'general';
}

export function isBookingUrl(url) {
  try {
    return new URL(url, window.location.href).hostname.indexOf(BOOKING_HOST) !== -1;
  } catch (e) {
    return false;
  }
}

// Booking links the chat generates must carry utm_content=chat_<topic> so chat bookings
// can be told apart from page-button bookings. `force` is for the configured Book Now CTA.
export function decorateBookingUrl(url, topic, force = false) {
  if (!url) return url;
  try {
    const u = new URL(url, window.location.href);
    if (!force && u.hostname.indexOf(BOOKING_HOST) === -1) return url;
    u.searchParams.set('utm_content', `chat_${topic || 'general'}`);
    return u.toString();
  } catch (e) {
    return url;
  }
}

// Same decoration for links inside rendered markdown (hrefs are HTML-escaped there).
export function decorateBookingLinksInHtml(html, topic) {
  if (typeof html !== 'string') return html;
  return html.replace(/href="([^"]+)"/g, (match, href) => {
    const raw = href.replace(/&amp;/g, '&');
    const decorated = decorateBookingUrl(raw, topic);
    return decorated === raw ? match : `href="${decorated.replace(/&/g, '&amp;')}"`;
  });
}

export function trackLeadCaptured() {
  nsxTrack('lead_captured', { route: 'book_discovery_call' });
}

// Truncate text
export function truncateText(text, maxLength = 14) {
  if (!text) return '';
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

// Get responsive max length for header text
export function getHeaderMaxLength() {
  return window.innerWidth >= 821 ? 25 : 14;
}
