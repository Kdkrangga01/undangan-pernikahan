import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MusicToggle.scss';

interface MusicToggleProps {
  isGateOpen?: boolean;
}

const MusicToggle: React.FC<MusicToggleProps> = ({ isGateOpen = true }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userWantsPlayRef = useRef<boolean>(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Stop any rogue background audio elements on window load or mount
  const stopAllRogueAudio = () => {
    const allAudios = document.querySelectorAll('audio');
    allAudios.forEach((a) => {
      if (a !== audioRef.current) {
        a.pause();
        a.currentTime = 0;
      }
    });
  };

  // Auto-play when gate is opened
  useEffect(() => {
    stopAllRogueAudio();
    const audio = audioRef.current;
    if (!audio) return;

    if (isGateOpen && userWantsPlayRef.current) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy fallback
      });
    }
  }, [isGateOpen]);

  // 100% Robust Instant Play / Stop Toggle Function
  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    stopAllRogueAudio();
    const audio = audioRef.current;
    if (!audio) return;

    // Check if audio is currently playing
    if (!audio.paused || isPlaying) {
      // User clicked STOP: Instantly pause audio & set user preference to false
      userWantsPlayRef.current = false;
      audio.pause();
      setIsPlaying(false);
    } else {
      // User clicked PLAY: Resume audio playback
      userWantsPlayRef.current = true;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('Audio play error:', err);
      });
    }
  };

  return (
    <>
      {/* React Single HTML5 Audio Element in DOM (Eliminates duplicate instances!) */}
      <audio
        ref={audioRef}
        id="main-wedding-audio"
        src="/audio/wedding-song.m4a"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          // Fallback if m4a is not supported by legacy browser
          if (audioRef.current && audioRef.current.src.endsWith('.m4a')) {
            audioRef.current.src = '/audio/bgm.mp3';
            audioRef.current.load();
          }
        }}
      />

      <AnimatePresence>
        <motion.button
          className={`music-toggle-btn ${isPlaying ? 'music-toggle-btn--playing' : 'music-toggle-btn--paused'}`}
          onClick={togglePlay}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          title={isPlaying ? 'Hentikan Musik (Stop Audio)' : 'Putar Musik (Play Audio)'}
        >
          {/* Outer Balinese Gold Ornament Frame */}
          <div className="music-toggle-btn__frame">
            {/* Animated Vinyl Disc */}
            <div className={`music-toggle-btn__disc ${isPlaying ? 'is-spinning' : ''}`}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" fill="#181513" stroke="#D4AF37" strokeWidth="1.5" />
                <circle cx="24" cy="24" r="16" stroke="#C5A880" strokeWidth="0.8" strokeDasharray="3 2" />
                <circle cx="24" cy="24" r="10" stroke="#D4AF37" strokeWidth="0.6" />
                <circle cx="24" cy="24" r="5" fill="#D4AF37" />
              </svg>
            </div>

            {/* Center Play / Pause / Equalizer Icon */}
            <div className="music-toggle-btn__icon">
              {isPlaying ? (
                /* Animated Equalizer Sound Waves Icon */
                <div className="music-toggle-btn__equalizer">
                  <span className="eq-bar eq-bar--1" />
                  <span className="eq-bar eq-bar--2" />
                  <span className="eq-bar eq-bar--3" />
                </div>
              ) : (
                /* Aesthetic Gold Play Triangle Icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="7,4 20,12 7,20" fill="#FFFFFF" />
                </svg>
              )}
            </div>
          </div>

          {/* Pulse Glow Effect when Playing */}
          {isPlaying && <div className="music-toggle-btn__glow" />}
        </motion.button>
      </AnimatePresence>
    </>
  );
};

export default MusicToggle;
