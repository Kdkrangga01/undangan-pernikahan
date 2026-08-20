import { useState, useEffect, useCallback } from 'react';

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

/**
 * Countdown timer to a target date.
 * Returns days/hours/minutes/seconds remaining.
 */
export function useCountdown(targetISO: string): CountdownValues {
  const calcRemaining = useCallback((): CountdownValues => {
    const target = new Date(targetISO).getTime();
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: false,
    };
  }, [targetISO]);

  const [countdown, setCountdown] = useState<CountdownValues>(calcRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calcRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [calcRemaining]);

  return countdown;
}
