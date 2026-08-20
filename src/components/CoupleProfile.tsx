import React from 'react';
import { motion } from 'framer-motion';
import { invitation } from '../data/invitation';
import { BalineseCorner, BalineseDivider } from './Ornaments';
import groomImg from '../assets/gallery/groom-dhici.jpg';
import brideImg from '../assets/gallery/bride-praba.jpg';
import './CoupleProfile.scss';

const CoupleProfile: React.FC = () => {
  const { groom, bride } = invitation;

  return (
    <section className="section section--light couple-section" id="couple">
      <BalineseCorner position="top-left" />
      <BalineseCorner position="top-right" />

      <div className="container">
        <div className="text-center mb-5">
          <p className="couple-section__tag font-utility text-gold-dark">
            Mempelai
          </p>
          <h2 className="couple-section__title font-display text-charcoal">
            Mempelai Pria &amp; Wanita
          </h2>
          <BalineseDivider />
        </div>

        <div className="row g-4 justify-content-center align-items-stretch">
          {/* Groom Card */}
          <div className="col-12 col-lg-5 col-md-6">
            <motion.div
              className="card-aesthetic couple-card text-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="couple-card__img-wrapper">
                <img
                  src={groomImg}
                  alt={groom.fullName}
                  className="couple-card__img"
                />
              </div>

              <h3 className="couple-card__name font-display text-charcoal">
                {groom.fullName}
              </h3>

              <div className="couple-card__line" />

              <p className="couple-card__order text-muted-brown font-body">
                {groom.childOrder} dari Pasangan:
              </p>

              <p className="couple-card__parents font-display text-charcoal">
                {groom.parentFather}
                <br />
                <span className="text-gold">&amp;</span>
                <br />
                {groom.parentMother}
              </p>

              <p className="couple-card__address text-muted-brown font-body">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A48646" strokeWidth="2" className="couple-card__address-icon">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{groom.address}</span>
              </p>
            </motion.div>
          </div>

          {/* Bride Card */}
          <div className="col-12 col-lg-5 col-md-6">
            <motion.div
              className="card-aesthetic couple-card text-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="couple-card__img-wrapper">
                <img
                  src={brideImg}
                  alt={bride.fullName}
                  className="couple-card__img"
                />
              </div>

              <h3 className="couple-card__name font-display text-charcoal">
                {bride.fullName}
              </h3>

              <div className="couple-card__line" />

              <p className="couple-card__order text-muted-brown font-body">
                {bride.childOrder} dari Pasangan:
              </p>

              <p className="couple-card__parents font-display text-charcoal">
                {bride.parentFather}
                <br />
                <span className="text-gold">&amp;</span>
                <br />
                {bride.parentMother}
              </p>

              <p className="couple-card__address text-muted-brown font-body">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A48646" strokeWidth="2" className="couple-card__address-icon">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{bride.address}</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleProfile;
