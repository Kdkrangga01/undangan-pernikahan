import React from 'react';

/**
 * Animated Floating Balinese Frangipani / Kamboja & Gold Petals Effect
 */
export const FloatingPetals: React.FC = () => {
  const petals = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${(i * 7.5) % 96}%`,
    duration: 7 + (i % 5) * 2,
    delay: (i % 4) * 1.2,
    size: 14 + (i % 3) * 6,
  }));

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: '-40px',
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0.5,
            animation: `petalFall ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg viewBox="0 0 40 40" fill="none">
            <path
              d="M20 0 C25 10 35 15 40 20 C35 25 25 30 20 40 C15 30 5 25 0 20 C5 15 15 10 20 0 Z"
              fill="#D4AF37"
              opacity="0.8"
            />
            <circle cx="20" cy="20" r="4" fill="#FFFFFF" />
          </svg>
        </div>
      ))}
    </div>
  );
};

/**
 * Balinese Top Crown Ornament for Photo Header
 */
export const BalineseTopCrown: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className} style={{ textAlign: 'center', marginBottom: '0.8rem' }}>
    <svg width="180" height="48" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 42 Q90 0 170 42" stroke="#D4AF37" strokeWidth="2" fill="none" />
      <path d="M25 43 Q90 10 155 43" stroke="#C5A880" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.8" />
      {/* Crown emblem */}
      <path d="M90 2 L83 18 L90 12 L97 18 Z" fill="#D4AF37" />
      <circle cx="90" cy="22" r="5" fill="#D4AF37" />
      <circle cx="90" cy="22" r="9" stroke="#C5A880" strokeWidth="0.8" fill="none" />
      <circle cx="45" cy="34" r="3" fill="#C5A880" />
      <circle cx="135" cy="34" r="3" fill="#C5A880" />
    </svg>
  </div>
);

/**
 * Balinese Ornament Divider — Gold lotus/padma center with gold line art extensions
 */
export const BalineseDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`balinese-divider ${className}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.2rem',
      margin: '2.5rem 0',
    }}
  >
    <span
      style={{
        flex: 1,
        maxWidth: '160px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #D4AF37 70%, transparent)',
      }}
    />
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="52" height="52" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="24" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.7" />
        <path d="M30 4 C24 16 24 24 30 30 C36 24 36 16 30 4 Z" fill="#D4AF37" opacity="0.5" />
        <path d="M30 56 C24 44 24 36 30 30 C36 36 36 44 30 56 Z" fill="#D4AF37" opacity="0.5" />
        <path d="M4 30 C16 24 24 24 30 30 C24 36 16 36 4 30 Z" fill="#D4AF37" opacity="0.5" />
        <path d="M56 30 C44 24 36 24 30 30 C36 36 44 36 56 30 Z" fill="#D4AF37" opacity="0.5" />
        <circle cx="30" cy="30" r="5" fill="#D4AF37" />
        <circle cx="30" cy="30" r="10" stroke="#C5A880" strokeWidth="1" fill="none" />
      </svg>
    </div>
    <span
      style={{
        flex: 1,
        maxWidth: '160px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #D4AF37 70%, transparent)',
      }}
    />
  </div>
);

/**
 * Balinese Floral Corner Ornament (Frangipani / Kamboja & Leaves motif)
 */
export const BalineseCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = '' }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right': return 'scaleX(-1)';
      case 'bottom-left': return 'scaleY(-1)';
      case 'bottom-right': return 'scale(-1)';
      default: return 'none';
    }
  };

  const getPositionStyles = (): React.CSSProperties => {
    const isTop = position.startsWith('top');
    const isLeft = position.endsWith('left');
    return {
      position: 'absolute',
      top: isTop ? 0 : 'auto',
      bottom: !isTop ? 0 : 'auto',
      left: isLeft ? 0 : 'auto',
      right: !isLeft ? 0 : 'auto',
      transform: getTransform(),
      pointerEvents: 'none',
      opacity: 0.75,
      zIndex: 1,
      width: '120px',
      height: '120px',
    };
  };

  return (
    <svg
      className={className}
      style={getPositionStyles()}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0 C40 0 80 15 95 45 C110 65 115 95 115 120" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M0 20 C25 20 60 30 75 60 C85 80 90 100 90 120" stroke="#C5A880" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.8" />
      {/* Flower petals */}
      <circle cx="32" cy="32" r="10" fill="#D4AF37" opacity="0.25" />
      <path d="M32 15 Q36 25 32 32 Q28 25 32 15 Z" fill="#D4AF37" opacity="0.8" />
      <path d="M32 49 Q36 39 32 32 Q28 39 32 49 Z" fill="#D4AF37" opacity="0.8" />
      <path d="M15 32 Q25 36 32 32 Q25 28 15 32 Z" fill="#D4AF37" opacity="0.8" />
      <path d="M49 32 Q39 36 32 32 Q39 28 49 32 Z" fill="#D4AF37" opacity="0.8" />
      <circle cx="32" cy="32" r="4" fill="#FFFFFF" />
    </svg>
  );
};

/**
 * Balinese Arch Top Frame SVG with Penjor & Lotus Ornaments
 */
export const BalineseArchHeader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className} style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
    <svg width="160" height="42" viewBox="0 0 160 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 38 Q80 0 150 38" stroke="#D4AF37" strokeWidth="1.8" fill="none" />
      <path d="M22 39 Q80 8 138 39" stroke="#C5A880" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.8" />
      <circle cx="80" cy="14" r="5" fill="#D4AF37" />
      <path d="M75 14 L80 3 L85 14 Z" fill="#D4AF37" />
      <circle cx="30" cy="30" r="2.5" fill="#C5A880" />
      <circle cx="130" cy="30" r="2.5" fill="#C5A880" />
    </svg>
  </div>
);

/**
 * Large Spinning Balinese Mandala Watermark Background Component
 */
export const BalineseMandalaBG: React.FC<{ opacity?: number }> = ({ opacity = 0.08 }) => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '650px',
      height: '650px',
      pointerEvents: 'none',
      opacity,
      zIndex: 0,
      animation: 'spinSlow 90s linear infinite',
    }}
  >
    <svg viewBox="0 0 300 300" fill="none" width="100%" height="100%">
      <circle cx="150" cy="150" r="140" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="150" cy="150" r="110" stroke="#C5A880" strokeWidth="0.8" />
      <circle cx="150" cy="150" r="80" stroke="#D4AF37" strokeWidth="1" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x2 = 150 + 140 * Math.cos(angle);
        const y2 = 150 + 140 * Math.sin(angle);
        return <line key={i} x1="150" y1="150" x2={x2} y2={y2} stroke="#C5A880" strokeWidth="0.8" opacity="0.6" />;
      })}
      <circle cx="150" cy="150" r="15" fill="#D4AF37" opacity="0.3" />
    </svg>
  </div>
);

/**
 * Balinese Candi Bentar Gate Emblem SVG
 */
export const BalineseGateEmblem: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <svg className={className} style={style} viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Gate Column */}
    <path d="M20 230 L20 60 L45 40 L65 40 L65 20 L80 10 L90 25 L90 230 Z" fill="none" stroke="#D4AF37" strokeWidth="1.8" />
    <path d="M30 230 L30 70 L50 55 L60 55 L60 30 L75 20 L80 30 L80 230 Z" fill="#D4AF37" opacity="0.2" />
    {/* Right Gate Column */}
    <path d="M180 230 L180 60 L155 40 L135 40 L135 20 L120 10 L110 25 L110 230 Z" fill="none" stroke="#D4AF37" strokeWidth="1.8" />
    <path d="M170 230 L170 70 L150 55 L140 55 L140 30 L125 20 L120 30 L120 230 Z" fill="#D4AF37" opacity="0.2" />
    {/* Balinese Carving details */}
    <circle cx="55" cy="110" r="8" fill="#D4AF37" opacity="0.6" />
    <circle cx="145" cy="110" r="8" fill="#D4AF37" opacity="0.6" />
    <path d="M35 160 H75 M35 180 H75" stroke="#D4AF37" strokeWidth="1" />
    <path d="M125 160 H165 M125 180 H165" stroke="#D4AF37" strokeWidth="1" />
  </svg>
);

/**
 * Balinese Penjor (Decorated Bamboo) Line Art Accent
 */
export const BalinesePenjorLineArt: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <svg className={className} style={style} viewBox="0 0 100 240" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Curved Penjor Bamboo Pole */}
    <path d="M20 230 C25 140 30 70 65 30 C75 18 85 22 80 40 C75 55 55 60 45 45" stroke="#D4AF37" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M22 230 C27 142 32 72 67 32" stroke="#C5A880" strokeWidth="0.8" strokeDasharray="3 2" fill="none" opacity="0.7" />
    {/* Penjor Janur Tassels / Sampian */}
    <path d="M78 38 Q90 50 82 70 M78 38 Q68 55 75 75 M78 38 Q85 60 92 80" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
    <circle cx="80" cy="38" r="4" fill="#D4AF37" />
    {/* Hanging Lamak / Banner */}
    <path d="M42 90 L58 90 L55 180 L45 180 Z" fill="#D4AF37" opacity="0.15" stroke="#D4AF37" strokeWidth="1" />
    <path d="M45 105 H55 M45 125 H55 M45 145 H55 M45 165 H55" stroke="#C5A880" strokeWidth="0.8" />
  </svg>
);

/**
 * Balinese Frangipani / Bunga Kamboja / Bunga Jepun SVG Emblem
 */
export const BalineseFrangipaniFlower: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <svg className={className} style={style} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="1.2" />
    {/* 5 Petals */}
    <path d="M20 6 C23 12 23 16 20 20 C17 16 17 12 20 6 Z" fill="#D4AF37" opacity="0.85" />
    <path d="M33 16 C30 21 27 23 20 20 C23 17 27 15 33 16 Z" fill="#D4AF37" opacity="0.85" />
    <path d="M28 32 C23 31 21 27 20 20 C23 23 27 27 28 32 Z" fill="#D4AF37" opacity="0.85" />
    <path d="M12 32 C13 27 17 23 20 20 C19 27 17 31 12 32 Z" fill="#D4AF37" opacity="0.85" />
    <path d="M7 16 C13 15 17 17 20 20 C13 23 10 21 7 16 Z" fill="#D4AF37" opacity="0.85" />
    {/* Golden Center */}
    <circle cx="20" cy="20" r="4.5" fill="#D4AF37" />
    <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
  </svg>
);
