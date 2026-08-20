import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { allGalleryItems, type GalleryPhotoItem } from '../data/invitation';
import {
  BalineseCorner,
  BalineseDivider,
  BalineseMandalaBG,
  BalineseTopCrown,
  BalinesePenjorLineArt,
  BalineseFrangipaniFlower,
} from './Ornaments';
import payasHeroImg from '../assets/gallery/payas-agung-03.jpg';
import './Gallery.scss';

type CategoryFilter = 'all' | 'payas-agung' | 'resepsi';

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  if (allGalleryItems.length === 0) return null;

  const filteredItems: GalleryPhotoItem[] =
    activeCategory === 'all'
      ? allGalleryItems
      : allGalleryItems.filter((item) => item.category === activeCategory);

  const slides = filteredItems.map((item) => ({
    src: item.src,
  }));

  return (
    <section className="section section--secondary gallery-section" id="gallery">
      <BalineseCorner position="top-left" />
      <BalineseCorner position="top-right" />
      <BalineseCorner position="bottom-left" />
      <BalineseCorner position="bottom-right" />
      <BalineseMandalaBG opacity={0.06} />

      {/* Decorative Side Penjors */}
      <div className="gallery-side-penjor gallery-side-penjor--left" aria-hidden="true">
        <BalinesePenjorLineArt />
      </div>
      <div className="gallery-side-penjor gallery-side-penjor--right" aria-hidden="true">
        <BalinesePenjorLineArt />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Aesthetic Balinese Header Container */}
        <motion.div
          className="gallery-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Gold Balinese Crown Header Ornament */}
          <BalineseTopCrown className="gallery-header__crown" />

          {/* Subtitle / Category Tag */}
          <p className="gallery-section__tag font-utility">
            <span className="gallery-section__tag-dot">•</span> DOKUMENTASI PAWIWAHAN <span className="gallery-section__tag-dot">•</span>
          </p>

          {/* Main Aesthetic Title */}
          <h2 className="gallery-section__title font-display">
            Momen Kebahagiaan
          </h2>

          {/* Center Balinese Lotus Divider */}
          <BalineseDivider className="gallery-header__divider" />

          {/* Category Switcher Filter Tabs (Clean sans numbers!) */}
          <div className="gallery-tabs">
            <button
              className={`gallery-tab-btn font-utility ${activeCategory === 'all' ? 'gallery-tab-btn--active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              Semua Foto
            </button>
            <button
              className={`gallery-tab-btn font-utility ${activeCategory === 'payas-agung' ? 'gallery-tab-btn--active' : ''}`}
              onClick={() => setActiveCategory('payas-agung')}
            >
              <BalineseFrangipaniFlower style={{ width: 16, height: 16 }} />
              Busana Adat Bali
            </button>
            <button
              className={`gallery-tab-btn font-utility ${activeCategory === 'resepsi' ? 'gallery-tab-btn--active' : ''}`}
              onClick={() => setActiveCategory('resepsi')}
            >
              Resepsi
            </button>
          </div>
        </motion.div>

        {/* Featured Showcase Banner when 'all' or 'payas-agung' is active */}
        {(activeCategory === 'all' || activeCategory === 'payas-agung') && (
          <motion.div
            className="gallery-featured"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
          >
            <div className="gallery-featured__card card-aesthetic">
              <div className="row align-items-center g-4">
                <div className="col-12 col-lg-5 col-md-6 text-center text-md-start">
                  <div className="gallery-featured__badge font-utility">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
                      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                    </svg>
                    <span>BUSANA ADAT BALI</span>
                  </div>

                  <h3 className="gallery-featured__title font-display text-charcoal">
                    Keanggunan Busana Adat Pawiwahan
                  </h3>

                  <p className="gallery-featured__desc font-body text-muted-brown">
                    Busana Adat Bali melambangkan keagungan, kehormatan, serta kesucian suci pernikahan adat Bali yang dipadukan dengan pesona Candi Bentar &amp; Pura Bali.
                  </p>

                  <button
                    className="btn-balinese btn-balinese--gold gallery-featured__btn font-utility"
                    onClick={() => {
                      const idx = filteredItems.findIndex((item) => item.src === payasHeroImg);
                      setLightboxIndex(idx >= 0 ? idx : 0);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    Lihat Foto HD Full
                  </button>
                </div>

                <div className="col-12 col-lg-7 col-md-6">
                  <div
                    className="gallery-featured__img-frame"
                    onClick={() => {
                      const idx = filteredItems.findIndex((item) => item.src === payasHeroImg);
                      setLightboxIndex(idx >= 0 ? idx : 0);
                    }}
                  >
                    <img
                      src={payasHeroImg}
                      alt="Pawiwahan Adat Bali di Candi Bentar"
                      className="gallery-featured__img"
                    />
                    <div className="gallery-featured__overlay">
                      <span className="font-utility text-gold-light">Ketuk Untuk Memperbesar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Dynamic Responsive Photo Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="row g-3 g-md-4 gallery-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            {filteredItems.map((item, index) => (
              <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                <motion.div
                  className="gallery-item"
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 4) * 0.06,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  onClick={() => setLightboxIndex(index)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="gallery-item__img"
                    loading="lazy"
                  />
                  <div className="gallery-item__overlay">
                    <div className="gallery-item__icon-circle">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/>
                        <line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </div>
                  </div>

                </motion.div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(24, 21, 19, 0.95)' },
        }}
      />
    </section>
  );
};

export default Gallery;
