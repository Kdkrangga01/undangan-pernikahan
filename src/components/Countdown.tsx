import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import './Countdown.scss';

interface CountdownProps {
  targetISO: string;
}

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const display = String(value).padStart(2, '0');

  return (
    <div className="countdown-unit">
      <div className="countdown-unit__box">
        <span className="countdown-unit__value font-display">{display}</span>
      </div>
      <span className="countdown-unit__label font-utility">{label}</span>
    </div>
  );
};

const Countdown: React.FC<CountdownProps> = ({ targetISO }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetISO);

  if (isExpired) {
    return (
      <div className="countdown countdown--expired">
        <p className="countdown__expired-text font-display text-gold-dark">
          Acara Telah Berlangsung
        </p>
      </div>
    );
  }

  return (
    <div className="countdown">
      <p className="countdown__title font-utility text-gold-dark">Menghitung Hari</p>
      <div className="countdown__grid">
        <CountdownUnit value={days} label="Hari" />
        <CountdownUnit value={hours} label="Jam" />
        <CountdownUnit value={minutes} label="Menit" />
        <CountdownUnit value={seconds} label="Detik" />
      </div>
    </div>
  );
};

export default Countdown;
