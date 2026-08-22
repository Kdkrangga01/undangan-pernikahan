import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, type RsvpEntry } from '../lib/supabase';
import { BalineseCorner, BalineseDivider } from './Ornaments';
import './RsvpForm.scss';

const STORAGE_KEY = 'undangan_labs_rsvp_wishes';

/** Format relative time in Bahasa Indonesia */
const formatRelativeTime = (dateStr: string): string => {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);

  if (diffSec < 60) return 'Baru saja';
  if (diffMin < 60) return `${diffMin} menit lalu`;
  if (diffHour < 24) return `${diffHour} jam lalu`;
  if (diffDay < 7) return `${diffDay} hari lalu`;
  if (diffWeek < 5) return `${diffWeek} minggu lalu`;
  if (diffMonth < 12) return `${diffMonth} bulan lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

const RsvpForm: React.FC = () => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir'>('hadir');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [wishes, setWishes] = useState<RsvpEntry[]>([]);

  const fetchWishes = useCallback(async () => {
    // 1. Fetch from Supabase if configured
    if (supabase) {
      try {
        const { data, error: fetchErr } = await supabase
          .from('rsvp')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (!fetchErr && data) {
          setWishes(data as RsvpEntry[]);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          return;
        }
      } catch (err) {
        console.warn('Supabase fetch error, using local storage fallback:', err);
      }
    }

    // 2. Fallback to local storage only if Supabase is not available or error
    const saved = localStorage.getItem(STORAGE_KEY);
    const localData: RsvpEntry[] = saved ? JSON.parse(saved) : [];
    setWishes(localData);
  }, []);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  // Subscribe to Supabase realtime for live updates (INSERT and DELETE)
  useEffect(() => {
    if (!supabase) return;

    const channel = supabase
      .channel('rsvp-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'rsvp' },
        (payload) => {
          const newEntry = payload.new as RsvpEntry;
          setWishes((prev) => {
            // Avoid duplicate if we already added it locally
            if (prev.some((w) => String(w.id) === String(newEntry.id))) return prev;
            const updated = [newEntry, ...prev];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'rsvp' },
        (payload) => {
          setWishes((prev) => {
            const updated = prev.filter((w) => String(w.id) !== String(payload.old?.id));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
          });
        }
      )
      .subscribe();

    return () => {
      if (supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

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

        {/* ── Wishes Feed — Daftar Ucapan Tamu ── */}
        {wishes.length > 0 && (
          <motion.div
            className="wishes-feed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="wishes-feed__header text-center">
              {/* Crown ornament */}
              <div className="wishes-feed__crown">
                <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 8 C33 18 40 22 50 25 C40 28 33 32 30 42 C27 32 20 28 10 25 C20 22 27 18 30 8 Z" fill="#D4AF37" opacity="0.85" />
                  <circle cx="30" cy="25" r="3.5" fill="#FFFFFF" />
                </svg>
              </div>
              <h3 className="wishes-feed__title font-display text-charcoal">
                Ucapan Tamu{' '}
                <span className="wishes-feed__count">({wishes.length})</span>
              </h3>
              <BalineseDivider />
            </div>

            <div className="wishes-feed__scroll">
              <AnimatePresence initial={false}>
                {wishes.map((wish, index) => (
                  <motion.div
                    key={wish.id}
                    className="wish-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: index < 5 ? index * 0.08 : 0 }}
                  >
                    <div className="wish-card__header">
                      <div className="wish-card__author">
                        <h4 className="wish-card__name">{wish.name}</h4>
                        <span className="wish-card__time">
                          {formatRelativeTime(wish.created_at)}
                        </span>
                      </div>
                      <span
                        className={`rsvp-badge ${
                          wish.attendance === 'hadir'
                            ? 'rsvp-badge--hadir'
                            : 'rsvp-badge--tidak'
                        }`}
                      >
                        {wish.attendance === 'hadir' ? '✓ Hadir' : '✕ Tidak Hadir'}
                      </span>
                    </div>

                    {wish.message && (
                      <p className="wish-card__message">{wish.message}</p>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RsvpForm;
