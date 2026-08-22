import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import GateScreen from './components/GateScreen';
import Hero from './components/Hero';
import QuoteSection from './components/QuoteSection';
import CoupleProfile from './components/CoupleProfile';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import RsvpForm from './components/RsvpForm';
import Footer from './components/Footer';
import MusicToggle from './components/MusicToggle';
import OwnerPanel from './components/OwnerPanel';
import { FloatingPetals } from './components/Ornaments';

const App: React.FC = () => {
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    if (!gateOpen) {
      document.body.classList.add('gate-locked');
    } else {
      document.body.classList.remove('gate-locked');
    }
    return () => {
      document.body.classList.remove('gate-locked');
    };
  }, [gateOpen]);

  const handleGateOpen = () => {
    setGateOpen(true);
    setTimeout(() => {
      const hero = document.getElementById('hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1100);
  };

  return (
    <>
      {/* Cover / Gate Screen */}
      <GateScreen isOpen={gateOpen} onOpen={handleGateOpen} />

      {/* Floating Animated Petals / Ornaments */}
      {gateOpen && <FloatingPetals />}

      {/* Main Single Page Content */}
      <main>
        <Hero />
        <QuoteSection />
        <CoupleProfile />
        <EventDetails />
        <Gallery />
        <RsvpForm />
        <Footer />
      </main>

      {/* Floating Controls */}
      <AnimatePresence>
        {gateOpen && (
          <div className="floating-controls">
            <MusicToggle />
          </div>
        )}
      </AnimatePresence>

      {/* Owner Access & Guest Name Generator */}
      <OwnerPanel gateOpen={gateOpen} />
    </>
  );
};

export default App;
