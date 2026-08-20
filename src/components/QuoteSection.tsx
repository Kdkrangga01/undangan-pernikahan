import React from 'react';
import { motion } from 'framer-motion';
import { invitation } from '../data/invitation';
import { BalineseDivider, BalineseCorner, BalineseMandalaBG } from './Ornaments';
import './QuoteSection.scss';

const QuoteSection: React.FC = () => {
  return (
    <section className="section section--secondary quote-section" id="quote">
      <BalineseCorner position="top-left" />
      <BalineseCorner position="top-right" />
      <BalineseMandalaBG opacity={0.08} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="quote-section__card card-aesthetic text-center"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <p className="quote-section__greeting font-script text-gold-dark">
            Om Swastyastu
          </p>

          <p className="quote-section__intro font-body text-muted-brown">
            Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa / Tuhan Yang Maha Esa, kami bermaksud menyelenggarakan Pawiwahan (Pernikahan) putra-putri kami.
          </p>

          <BalineseDivider />

          <p className="quote-section__sanskrit font-display text-gold-dark">
            "{invitation.quoteSanskrit}"
          </p>

          <blockquote className="quote-section__translation font-body text-charcoal">
            "{invitation.quoteTranslation}"
          </blockquote>

          <span className="quote-section__source font-utility text-muted-brown">
            — {invitation.quoteSource} —
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSection;
