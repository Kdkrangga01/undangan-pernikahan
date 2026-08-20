import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, type RsvpEntry } from '../lib/supabase';
import { BalineseCorner, BalineseDivider } from './Ornaments';
import './RsvpForm.scss';

const STORAGE_KEY = 'undangan_labs_rsvp_wishes';

const RsvpForm: React.FC = () => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir'>('hadir');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [, setWishes] = useState<RsvpEntry[]>([]);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    // 1. Load initial local storage fallback
    const saved = localStorage.getItem(STORAGE_KEY);
    const localData: RsvpEntry[] = saved ? JSON.parse(saved) : [];

    // 2. Fetch from Supabase if configured
    if (supabase) {
      try {
        const { data, error: fetchErr } = await supabase
          .from('rsvp')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (!fetchErr && data && data.length > 0) {
          setWishes(data as RsvpEntry[]);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          return;
        }
      } catch (err) {
        console.warn('Supabase fetch error, using local storage fallback:', err);
      }
    }

    setWishes(localData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Mohon masukkan nama Anda');
      return;
    }

    setLoading(true);
    setError('');

    const newEntry: RsvpEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      attendance,
      message: message.trim() || null,
      created_at: new Date().toISOString(),
    };

    // 1. Save to Supabase if configured
    if (supabase) {
      try {
        const { error: insertError } = await supabase
          .from('rsvp')
          .insert([{ name: name.trim(), attendance, message: message.trim() || null }]);

        if (insertError) {
          console.warn('Supabase insert error, saved locally:', insertError);
        }
      } catch (err) {
        console.warn('Supabase submit error, saved locally:', err);
      }
    }

    // 2. Always save to LocalStorage for zero-bug instant feedback
    setWishes((prev) => {
      const updated = [newEntry, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    setSubmitted(true);
    setLoading(false);
    setName('');
    setMessage('');

    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <section className="section section--light rsvp-section" id="rsvp">
      <BalineseCorner position="top-left" />
      <BalineseCorner position="top-right" />

      <div className="container">
        <div className="text-center mb-4">
          <p className="rsvp-section__tag font-utility text-gold-dark">
            Konfirmasi Kehadiran
          </p>
          <h2 className="rsvp-section__title font-display text-charcoal">
            RSVP &amp; Ucapan Tamu
          </h2>
          <BalineseDivider />
        </div>

        <motion.div
          className="card-aesthetic rsvp-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          {submitted ? (
            <div className="rsvp-success text-center">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#C5A880" strokeWidth="2" style={{ marginBottom: 12 }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
              <h4 className="font-display text-charcoal">Terima Kasih!</h4>
              <p className="font-body text-muted-brown">
                Konfirmasi dan ucapan Anda telah berhasil terkirim.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rsvp-form">
              <div className="rsvp-form__field">
                <label className="rsvp-form__label font-utility text-muted-brown" htmlFor="rsvp-name">
                  Nama Anda
                </label>
                <input
                  type="text"
                  id="rsvp-name"
                  className="rsvp-form__input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap Anda..."
                />
              </div>

              <div className="rsvp-form__field">
                <label className="rsvp-form__label font-utility text-muted-brown">
                  Konfirmasi Kehadiran
                </label>
                <div className="rsvp-form__radios">
                  {([
                    ['hadir', 'Hadir'],
                    ['tidak_hadir', 'Tidak Hadir'],
                  ] as const).map(([value, label]) => (
                    <label key={value} className={`rsvp-radio ${attendance === value ? 'rsvp-radio--active' : ''}`}>
                      <input
                        type="radio"
                        name="attendance"
                        value={value}
                        checked={attendance === value}
                        onChange={() => setAttendance(value)}
                        className="rsvp-radio__input"
                      />
                      <span className="rsvp-radio__label font-body">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rsvp-form__field">
                <label className="rsvp-form__label font-utility text-muted-brown" htmlFor="rsvp-message">
                  Ucapan &amp; Doa Restu
                </label>
                <textarea
                  id="rsvp-message"
                  className="rsvp-form__textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan & doa restu untuk kedua mempelai..."
                  rows={4}
                />
              </div>

              {error && <p className="rsvp-form__error font-body">{error}</p>}

              <button
                type="submit"
                className="btn-balinese btn-balinese--gold rsvp-form__submit"
                disabled={loading}
              >
                {loading ? 'Mengirim...' : 'Kirim Konfirmasi & Ucapan'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RsvpForm;
