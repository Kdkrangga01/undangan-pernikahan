import React from 'react';
import { motion } from 'framer-motion';
import { invitation } from '../data/invitation';
import { BalineseCorner, BalineseDivider } from './Ornaments';
import footerPhoto from '../assets/gallery/resepsi-08.jpeg';
import './Footer.scss';

// High Definition Seamless Undangan Labs Vector Logo (Zero file dependencies, Zero white box, Zero cutoff!)
const UndanganLabsLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`undangan-labs-logo ${className}`}>
    <svg viewBox="0 0 460 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="undangan-labs-logo__svg">
      {/* Pillar 1 */}
      <path
        d="M15 15 C15 5 28 5 28 15 L28 68 C28 78 15 78 15 68 Z"
        fill="#FFFFFF"
      />
      {/* Pillar 2 */}
      <path
        d="M36 15 C36 5 49 5 49 15 L49 68 C49 78 36 78 36 68 Z"
        fill="#FFFFFF"
      />
      {/* Teardrop Dot . */}
      <path
        d="M58 58 C58 52 66 52 66 58 C66 66 58 72 58 76 L66 76 C72 76 72 64 66 58 Z"
        fill="#FFFFFF"
      />
      {/* Text: Undangan Labs */}
      <text
        x="90"
        y="60"
        fill="#FFFFFF"
        fontFamily="'Cormorant Garamond', 'Cinzel', 'Times New Roman', serif"
        fontSize="48"
        fontWeight="600"
        letterSpacing="0.01em"
      >
        Undangan Labs
      </text>
    </svg>
  </div>
);

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section" id="footer">
      {/* 1. Full-Bleed HD Photo Banner matching awsbali.com reference */}
      <div className="footer-hero">
        <img
          src={footerPhoto}
          alt="Dhici & Praba Pawiwahan"
          className="footer-hero__img"
        />
        <div className="footer-hero__overlay" />

        <div className="footer-hero__content text-center">
          {/* White Frangipani Line Art Emblem */}
          <div className="footer-hero__emblem">
            <svg width="64" height="64" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 5 C34 18 42 22 55 25 C42 28 34 32 30 45 C26 32 18 28 5 25 C18 22 26 18 30 5 Z" fill="#FFFFFF" opacity="0.95" />
              <path d="M30 12 C33 21 38 24 47 26 C38 28 33 31 30 40 C27 31 22 28 13 26 C22 24 27 21 30 12 Z" stroke="#D4AF37" strokeWidth="1.2" />
              <circle cx="30" cy="25" r="4" fill="#D4AF37" />
            </svg>
          </div>

          <h2 className="footer-hero__names font-script text-white">
            Dhici <span className="text-gold">&amp;</span> Praba
          </h2>
        </div>

        {/* Bottom Dark Curved Wave Transition */}
        <div className="footer-hero__wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60 Q720 120 1440 60 L1440 120 L0 120 Z" fill="#181513" />
          </svg>
        </div>
      </div>

      {/* 2. Closing Message & Vendor Logo Section */}
      <div className="footer-body">
        <BalineseCorner position="top-left" />
        <BalineseCorner position="top-right" />

        <div className="container text-center" style={{ position: 'relative', zIndex: 5 }}>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="footer-body__content"
          >
            <p className="footer-body__tag font-utility text-gold">
              Matur Suksma
            </p>

            <BalineseDivider />

            <p className="footer-body__message font-body text-white">
              {invitation.closingMessage}
            </p>

            <p className="footer-body__family font-display text-gold-light">
              Keluarga Besar {invitation.groom.nickname} &amp; {invitation.bride.nickname}
            </p>

            <button
              className="btn-balinese btn-balinese--gold footer-body__back-top"
              onClick={scrollToTop}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
              Kembali ke Atas
            </button>
          </motion.div>

          {/* Vendor Branding Section with 100% Complete Vector Undangan Labs Logo */}
          <motion.div
            className="footer-vendor"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Gold Balinese Crown Ornament Header matching Widiantari reference */}
            <div className="footer-vendor__ornament">
              <svg width="160" height="44" viewBox="0 0 140 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M70 2 L62 14 L70 10 L78 14 Z" fill="#D4AF37" />
                <path d="M10 26 C40 26 50 12 70 12 C90 12 100 26 130 26" stroke="#D4AF37" strokeWidth="1.6" fill="none" />
                <path d="M22 29 C45 29 53 18 70 18 C87 18 95 29 118 29" stroke="#C5A880" strokeWidth="0.8" strokeDasharray="3 2" fill="none" />
                <circle cx="70" cy="24" r="4" fill="#D4AF37" />
              </svg>
            </div>

            {/* Seamless HD Vector Logo */}
            <UndanganLabsLogo />

            <p className="footer-vendor__tagline font-utility text-gold-light">
              Digital Wedding Invitation
            </p>

            {/* Aesthetic Instagram Business Link */}
            <a
              href="https://www.instagram.com/undangan.labs?igsh=b3NneTF0azZkcWg="
              target="_blank"
              rel="noopener noreferrer"
              className="footer-vendor__ig-link font-utility"
              title="Kunjungi Instagram @undangan.labs"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span>@undangan.labs</span>
            </a>
          </motion.div>

          <div className="footer-body__copyright">
            <p className="font-body opacity-60 text-white">
              &copy; 2026 {invitation.groom.nickname} &amp; {invitation.bride.nickname} Pawiwahan • Created with ❤️ by Undangan Labs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
