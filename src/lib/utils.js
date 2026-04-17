export const API_BASE = 'https://api.datakeep.civicdays.in';

export function getLogoUrl(org) {
  if (!org || !org.logo) return null;
  if (org.logo.startsWith('http')) return org.logo;
  return `${API_BASE}${org.logo}`;
}

export function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

export function parseDateValue(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(value) {
  const date = parseDateValue(value);
  if (!date) return 'Unknown';
  return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

export function truncateText(text = '', maxLen = 120) {
  const plain = stripHtml(String(text));
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen).trim()}...`;
}
