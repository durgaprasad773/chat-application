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
