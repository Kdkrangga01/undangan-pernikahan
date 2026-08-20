import { useMemo } from 'react';

/**
 * Parse guest name from URL query parameter `?to=` or `?guest=`.
 * Falls back to a polite generic greeting if not provided.
 */
export function useGuestName(): string {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('to') || params.get('guest');
    if (raw && raw.trim()) {
      return decodeURIComponent(raw.trim());
    }
    return 'Bapak/Ibu/Saudara/i';
  }, []);
}
