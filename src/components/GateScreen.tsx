import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGuestName } from '../hooks/useGuestName';
import {
  BalineseCorner,
  BalineseTopCrown,
  BalineseGateEmblem,
  FloatingPetals,
  BalineseDivider,
} from './Ornaments';
import heroImg from '../assets/gallery/resepsi-08.jpeg';
import './GateScreen.scss';

interface GateScreenProps {
  isOpen: boolean;
  onOpen: () => void;
}

const GateScreen: React.FC<GateScreenProps> = ({ isOpen, onOpen }) => {
  const guestName = useGuestName();
  const [isOpening, setIsOpening] = useState(false);

  const handleClickOpen = () => {
    setIsOpening(true);
    // Allow 600ms for opening door animation before unmounting & auto-scrolling
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className={`gate-wrapper ${isOpening ? 'gate-wrapper--opening' : ''}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Floating Gold Petals on Cover */}
          <FloatingPetals />

          {/* 4 Balinese Gold Corner Accents on Cover */}
          <BalineseCorner position="top-left" />
          <BalineseCorner position="top-right" />
          <BalineseCorner position="bottom-left" />
          <BalineseCorner position="bottom-right" />

          {/* Spectacular Balinese Split Gate Curtain Doors (Reveals when opening) */}
          <motion.div
            className="gate-door gate-door--left"
            initial={{ x: '-100%' }}
            animate={isOpening ? { x: '0%' } : { x: '-100%' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="gate-door__inner" />
          </motion.div>

          <motion.div
            className="gate-door gate-door--right"
            initial={{ x: '100%' }}
            animate={isOpening ? { x: '0%' } : { x: '100%' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="gate-door__inner" />
          </motion.div>

          {/* Main Cover Content */}
          <motion.div
            className="gate-container"
            animate={isOpening ? { scale: 1.08, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Top Balinese Gate Emblem */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <BalineseGateEmblem className="gate-emblem" />
              <p className="gate-pawiwahan font-utility text-gold-dark">
                Pawiwahan
              </p>
            </motion.div>

            {/* Featured HD Photo Card with Balinese Top Crown & Double Gold Frame */}
            <motion.div
              className="gate-photo-card"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <BalineseTopCrown />
              <div className="gate-photo-frame">
                <img
                  src={heroImg}
                  alt="Pawiwahan Dhici & Praba"
                  className="gate-photo"
                />
                <div className="gate-photo-overlay-glow" />
              </div>
            </motion.div>

            {/* Guest Invitation Content Below Photo */}
            <motion.div
              className="gate-info"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Balinese Gold Star Accent */}
              <div className="gate-info__accent-star">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#D4AF37" />
                  <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Aesthetic Invitation Message requested by user */}
              <p className="gate-info__invitation-text font-display">
                Kami dengan hormat mengundang Anda untuk dapat hadir dalam acara pernikahan kami.
              </p>

              <BalineseDivider className="gate-info__divider-balinese" />

              {/* Clean Guest Name (No Box Card!) */}
              <span className="gate-info__kpd font-utility">
                • KEPADA YTH. •
              </span>
              <h1
                className={`gate-info__name ${
                  guestName.length > 28
                    ? 'gate-info__name--very-long'
                    : guestName.length > 16
                    ? 'gate-info__name--long'
                    : ''
                }`}
              >
                {guestName}
              </h1>

              <p className="gate-info__apology font-body">
                Mohon maaf apabila ada kesalahan penulisan nama/gelar
              </p>

              {/* Glowing Button */}
              <motion.button
                className="gate-info__btn font-body"
                onClick={handleClickOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 6px 20px rgba(184, 147, 85, 0.35)',
                    '0 10px 30px rgba(212, 175, 55, 0.65)',
                    '0 6px 20px rgba(184, 147, 85, 0.35)',
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8L12 2L21 8V20C21 20.5 20.7 21 20.4 21.4C20 21.8 19.5 22 19 22H5C4.5 22 4 21.8 3.6 21.4C3.2 21 3 20.5 3 20V8Z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
                Buka Undangan
              </motion.button>
            </motion.div>

            {/* Corner Line-Art Illustration */}
            <div className="gate-illustration" aria-hidden="true">
              <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Butterfly Line Art */}
                <g opacity="0.55" transform="translate(110, 10) scale(0.55)">
                  <path d="M40 50 Q20 20 0 30 Q-10 60 20 70 Q-10 90 10 110 Q40 100 40 50 Z" stroke="#6E645A" strokeWidth="1.4" fill="none" />
                  <path d="M40 50 Q60 20 80 30 Q90 60 60 70 Q90 90 70 110 Q40 100 40 50 Z" stroke="#6E645A" strokeWidth="1.4" fill="none" />
                  <line x1="40" y1="40" x2="40" y2="120" stroke="#6E645A" strokeWidth="1.8" />
                  <path d="M40 40 Q30 20 20 15 M40 40 Q50 20 60 15" stroke="#6E645A" strokeWidth="1.2" fill="none" />
                </g>
                {/* Floral Line Art */}
                <g opacity="0.25" transform="translate(20, 40)">
                  <path d="M120 160 C90 130 60 120 30 140 C10 160 30 190 70 180 C30 200 40 230 80 220" stroke="#6E645A" strokeWidth="1.2" fill="none" />
                  <circle cx="140" cy="140" r="45" stroke="#6E645A" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M140 95 Q160 120 140 140 Q120 120 140 95 Z" stroke="#6E645A" strokeWidth="1" fill="none" />
                  <path d="M140 185 Q160 160 140 140 Q120 160 140 185 Z" stroke="#6E645A" strokeWidth="1" fill="none" />
                  <path d="M95 140 Q120 160 140 140 Q120 120 95 140 Z" stroke="#6E645A" strokeWidth="1" fill="none" />
                  <path d="M185 140 Q160 160 140 140 Q160 120 185 140 Z" stroke="#6E645A" strokeWidth="1" fill="none" />
                </g>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GateScreen;
