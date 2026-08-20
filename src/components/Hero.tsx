import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { invitation } from '../data/invitation';
import Countdown from './Countdown';
import { BalineseArchHeader, BalineseCorner, BalineseMandalaBG } from './Ornaments';
import heroImg from '../assets/gallery/resepsi-04.jpeg';
import './Hero.scss';

const Hero: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>('resepsi-1');

  const selectedEvent = invitation.events.find((ev) => ev.id === selectedEventId) || invitation.events[0];

  return (
    <section className="section section--light hero" id="hero">
      <BalineseCorner position="top-left" />
      <BalineseCorner position="top-right" />
      <BalineseMandalaBG opacity={0.06} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero__card card-aesthetic text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <BalineseArchHeader />
            <p className="hero__tag font-utility text-gold-dark">
              Pawiwahan
            </p>

            <h1 className="hero__names">
              <span className="hero__name font-script text-charcoal">{invitation.groom.nickname}</span>
              <span className="hero__ampersand font-display text-gold">&amp;</span>
              <span className="hero__name font-script text-charcoal">{invitation.bride.nickname}</span>
            </h1>
          </motion.div>

          <motion.div
            className="hero__img-frame"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            <img
              src={heroImg}
              alt="Dhici & Praba"
              className="hero__img"
            />
            <div className="hero__img-glow" />
          </motion.div>

          <motion.div
            className="hero__meta"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            {/* Event Tabs Switcher for Resepsi 1 & Resepsi 2 Countdown */}
            <div className="hero__event-tabs">
              {invitation.events.map((ev) => (
                <button
                  key={ev.id}
                  className={`hero__tab-btn font-utility ${selectedEventId === ev.id ? 'hero__tab-btn--active' : ''}`}
                  onClick={() => setSelectedEventId(ev.id)}
                >
                  {ev.title} ({ev.date.split(' ')[0]} Agt)
                </button>
              ))}
            </div>

            <div className="hero__date-badge-wrapper">
              <span className="hero__date-badge font-display text-charcoal">
                {selectedEvent.dayName}, {selectedEvent.date}
              </span>
            </div>

            <Countdown targetISO={selectedEvent.dateISO} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
