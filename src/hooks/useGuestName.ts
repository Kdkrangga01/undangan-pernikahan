import { useState, useEffect } from 'react';

/**
 * Convert a URL slug (e.g. "dhici-praba" or "budi-santoso") into
 * a nicely formatted display name (e.g. "Dhici & Praba" or "Budi Santoso").
 */
function slugToName(slug: string): string {
  const words = slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

  if (words.length === 0) return '';

  // Heuristic: 2-word slug -> treat as "Name & Name" (couple / pair style)
  if (words.length === 2) {
    return `${words[0]} & ${words[1]}`;
  }

  return words.join(' ');
}

/**
 * Get guest name from current window URL
 */
export function getGuestNameFromUrl(): string {
  if (typeof window === 'undefined') return 'Bapak/Ibu/Saudara/i';

  // 1. Try query param first (?to= or ?guest=)
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('to') || params.get('guest');
  if (raw && raw.trim()) {
    return decodeURIComponent(raw.trim());
  }

  // 2. Try path segment (e.g. /dhici-praba) if no query param
  const pathSegment = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (pathSegment && pathSegment.length > 0 && !pathSegment.includes('.')) {
    const nameFromPath = slugToName(pathSegment);
    if (nameFromPath) return nameFromPath;
  }

  // 3. Generic fallback
  return 'Bapak/Ibu/Saudara/i';
}

/**
 * Programmatically update the guest name in URL & notify all active components
 */
export function setGuestNameInUrl(name: string): void {
  if (typeof window === 'undefined') return;
  const trimmed = name.trim();
  const url = new URL(window.location.href);

  if (!trimmed || trimmed.toLowerCase() === 'bapak/ibu/saudara/i') {
    url.searchParams.delete('to');
    url.searchParams.delete('guest');
  } else {
    url.searchParams.set('to', trimmed);
  }

  window.history.pushState({}, '', url.pathname + (url.search ? url.search : ''));
  window.dispatchEvent(
    new CustomEvent('guest-name-changed', {
      detail: trimmed || 'Bapak/Ibu/Saudara/i',
    })
  );
}

/**
 * Reactive hook that listens to URL changes and custom event updates
 */
export function useGuestName(): string {
  const [guestName, setGuestName] = useState<string>(() => getGuestNameFromUrl());

  useEffect(() => {
    const handleUpdate = () => {
      setGuestName(getGuestNameFromUrl());
    };

    window.addEventListener('popstate', handleUpdate);
    window.addEventListener('guest-name-changed', handleUpdate);

    return () => {
      window.removeEventListener('popstate', handleUpdate);
      window.removeEventListener('guest-name-changed', handleUpdate);
    };
  }, []);

  return guestName;
}