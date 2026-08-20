import React from 'react';
import { motion } from 'framer-motion';
import { invitation, type Acara } from '../data/invitation';
import Countdown from './Countdown';
import { BalineseArchHeader, BalineseCorner, BalineseDivider, BalineseMandalaBG } from './Ornaments';
import './EventDetails.scss';

const EventDetails: React.FC = () => {
  const { events } = invitation;

  // Google Calendar URL generator
  const getGoogleCalendarUrl = (ev: Acara) => {
    const title = encodeURIComponent(`${ev.title} Pawiwahan ${invitation.groom.nickname} & ${invitation.bride.nickname}`);
    const details = encodeURIComponent(`${ev.title} Pawiwahan ${invitation.groom.fullName} & ${invitation.bride.fullName}`);
    const location = encodeURIComponent(ev.address);
    const cleanISO = ev.dateISO.replace(/[-:]/g, '').split('+')[0];
    const dates = `${cleanISO}/${cleanISO}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  return (
    <section className="section section--secondary event-section" id="event">
      <BalineseCorner position="top-left" />
      <BalineseCorner position="top-right" />
      <BalineseCorner position="bottom-left" />
      <BalineseCorner position="bottom-right" />
      <BalineseMandalaBG opacity={0.05} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="text-center mb-4">
          <p className="event-section__tag font-utility text-gold-dark">
            Waktu &amp; Tempat
          </p>
          <h2 className="event-section__title font-display text-charcoal">
            Rangkaian Acara Pawiwahan
          </h2>
          <BalineseDivider />
        </div>

        {/* 2 Reception Cards Grid */}
        <div className="row g-4 justify-content-center align-items-stretch">
          {events.map((ev, index) => {
            const dateParts = ev.date.split(' '); // ["24", "Agustus", "2026"]
            const dayNum = dateParts[0] || '24';
            const monthName = dateParts[1] || 'Agustus';
            const yearNum = dateParts[2] || '2026';

            return (
              <div className="col-12 col-lg-6 col-md-6" key={ev.id}>
                <motion.div
                  className="card-aesthetic event-card"
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
                >
                  <BalineseArchHeader />

                  {/* Event Badge */}
                  <div className="event-card__badge-header text-center">
                    <span className="event-card__badge font-utility">{ev.title}</span>
                  </div>

                  <div className="event-card__date-hero">
                    <span className="event-card__day font-utility text-gold-dark">{ev.dayName}</span>
                    <div className="event-card__date-flex">
                      <span className="event-card__number font-display text-charcoal">{dayNum}</span>
                      <div className="event-card__month-year font-display text-charcoal">
                        <span>{monthName}</span>
                        <span className="text-gold-dark">{yearNum}</span>
                      </div>
                    </div>
                  </div>

                  <div className="event-card__line" />

                  <div className="event-card__details">
                    <div className="event-card__detail-item">
                      <div className="event-card__icon-box">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5A880" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12,6 12,12 16,14"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="event-card__detail-title font-display text-charcoal">Waktu Acara</h4>
                        <p className="event-card__detail-desc font-body text-muted-brown">{ev.time}</p>
                      </div>
                    </div>

                    <div className="event-card__detail-item">
                      <div className="event-card__icon-box">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5A880" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="event-card__detail-title font-display text-charcoal">{ev.venue}</h4>
                        <p className="event-card__detail-desc font-body text-muted-brown">{ev.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dedicated Countdown per Event */}
                  <div className="event-card__countdown-wrapper">
                    <Countdown targetISO={ev.dateISO} />
                  </div>

                  <div className="event-card__actions">
                    <a
                      href={ev.locationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-balinese btn-balinese--gold"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      Buka Google Maps
                    </a>

                    <a
                      href={getGoogleCalendarUrl(ev)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-balinese btn-balinese--outline-gold"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      Simpan ke Kalender
                    </a>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
